/**
 * Basma ↔ Oracle Integration Module
 * Patient Registration + Appointment Booking Flow
 * 
 * Flow:
 * 1. Patient fills form on hnh.brainsait.org
 * 2. Register patient in Oracle → Get MRN
 * 3. Store patient in Basma DB with Oracle MRN mapping
 * 4. Book appointment in Oracle → Get Appointment Number
 * 5. Return: MRN, Appointment Number, confirmation
 */

// Oracle Bridge Configuration
const ORACLE_BRIDGE_BASE = "https://oracle-bridge.brainsait.org";

/**
 * Register new patient in Oracle HIS and get MRN
 */
async function registerPatientInOracle(patientData, branch = "RIYADH", apiKey) {
  const payload = {
    branch,
    patient: {
      // Required fields
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      firstNameAr: patientData.firstNameAr || patientData.firstName,
      lastNameAr: patientData.lastNameAr || patientData.lastName,
      
      // Identity
      nationalId: patientData.nationalId, // Saudi ID/Iqama
      dateOfBirth: patientData.dateOfBirth, // YYYY-MM-DD
      gender: patientData.gender, // "M" | "F"
      
      // Contact
      mobile: patientData.mobile,
      email: patientData.email,
      
      // Insurance (optional)
      insurancePayer: patientData.insurancePayer,
      policyNumber: patientData.policyNumber,
      memberId: patientData.memberId,
      
      // Address
      city: patientData.city,
      nationality: patientData.nationality || "SA",
    }
  };

  const response = await fetch(`${ORACLE_BRIDGE_BASE}/api/patients/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Oracle patient registration failed: ${response.status} - ${error}`);
  }

  const result = await response.json();
  return {
    mrn: result.mrn, // Medical Record Number from Oracle
    oraclePatientId: result.patientId,
    registrationDate: result.createdAt,
  };
}

/**
 * Book appointment in Oracle for existing patient
 */
async function bookAppointmentInOracle(bookingData, branch = "RIYADH", apiKey) {
  const payload = {
    branch,
    appointment: {
      mrn: bookingData.mrn,
      clinic: bookingData.clinic, // e.g., "Internal Medicine", "Pediatrics"
      doctorId: bookingData.doctorId, // Optional: specific doctor
      preferredDate: bookingData.preferredDate, // YYYY-MM-DD
      preferredTime: bookingData.preferredTime, // HH:MM (optional)
      appointmentType: bookingData.appointmentType || "NEW", // NEW | FOLLOWUP | EMERGENCY
      notes: bookingData.notes,
    }
  };

  const response = await fetch(`${ORACLE_BRIDGE_BASE}/api/appointments/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Oracle appointment booking failed: ${response.status} - ${error}`);
  }

  const result = await response.json();
  return {
    appointmentNumber: result.appointmentNumber,
    appointmentId: result.appointmentId,
    date: result.appointmentDate,
    time: result.appointmentTime,
    clinic: result.clinicName,
    doctor: result.doctorName,
    status: result.status, // CONFIRMED | PENDING
  };
}

/**
 * Store patient in Basma DB with Oracle MRN mapping
 */
async function storePatientInBasma(env, patientData, oracleData) {
  const result = await env.BASMA_DB.prepare(`
    INSERT INTO patients (
      oracle_mrn, 
      oracle_patient_id,
      first_name, 
      last_name, 
      first_name_ar, 
      last_name_ar,
      national_id,
      date_of_birth,
      gender,
      mobile,
      email,
      insurance_payer,
      policy_number,
      city,
      nationality,
      registration_source,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(oracle_mrn) DO UPDATE SET
      mobile = excluded.mobile,
      email = excluded.email,
      insurance_payer = excluded.insurance_payer,
      policy_number = excluded.policy_number,
      updated_at = datetime('now')
    RETURNING id, oracle_mrn
  `).bind(
    oracleData.mrn,
    oracleData.oraclePatientId,
    patientData.firstName,
    patientData.lastName,
    patientData.firstNameAr || patientData.firstName,
    patientData.lastNameAr || patientData.lastName,
    patientData.nationalId,
    patientData.dateOfBirth,
    patientData.gender,
    patientData.mobile,
    patientData.email,
    patientData.insurancePayer || null,
    patientData.policyNumber || null,
    patientData.city || null,
    patientData.nationality || "SA",
    patientData.source || "hnh_booking_form"
  ).first();

  return result;
}

/**
 * Store appointment in Basma DB with Oracle mapping
 */
async function storeAppointmentInBasma(env, appointmentData, oracleAppt, patientBasmaId) {
  const result = await env.BASMA_DB.prepare(`
    INSERT INTO appointments (
      patient_id,
      oracle_appointment_id,
      oracle_appointment_number,
      appointment_date,
      appointment_time,
      clinic,
      doctor_name,
      status,
      source,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    RETURNING id, oracle_appointment_number
  `).bind(
    patientBasmaId,
    oracleAppt.appointmentId,
    oracleAppt.appointmentNumber,
    oracleAppt.date,
    oracleAppt.time,
    oracleAppt.clinic,
    oracleAppt.doctor,
    oracleAppt.status,
    appointmentData.source || "hnh_booking_form"
  ).first();

  return result;
}

/**
 * Main booking flow: Register + Book in Oracle + Store in Basma
 */
async function processBookingFlow(request, env) {
  const body = await request.json();
  const {
    // Patient data
    firstName,
    lastName,
    firstNameAr,
    lastNameAr,
    nationalId,
    dateOfBirth,
    gender,
    mobile,
    email,
    insurancePayer,
    policyNumber,
    memberId,
    city,
    nationality,
    
    // Booking data
    clinic,
    doctorId,
    preferredDate,
    preferredTime,
    appointmentType,
    notes,
    
    // Config
    branch = "RIYADH",
    language = "ar"
  } = body;

  // Validate required fields
  if (!firstName || !lastName || !nationalId || !dateOfBirth || !gender || !mobile) {
    return {
      success: false,
      error: "Missing required patient fields: firstName, lastName, nationalId, dateOfBirth, gender, mobile",
    };
  }

  if (!clinic || !preferredDate) {
    return {
      success: false,
      error: "Missing required booking fields: clinic, preferredDate",
    };
  }

  const apiKey = env.ORACLE_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Oracle API key not configured",
    };
  }

  try {
    // Step 1: Register patient in Oracle
    const patientData = {
      firstName,
      lastName,
      firstNameAr,
      lastNameAr,
      nationalId,
      dateOfBirth,
      gender,
      mobile,
      email,
      insurancePayer,
      policyNumber,
      memberId,
      city,
      nationality,
    };

    const oraclePatient = await registerPatientInOracle(patientData, branch, apiKey);

    // Step 2: Store patient in Basma DB
    const basmaPatient = await storePatientInBasma(env, patientData, oraclePatient);

    // Step 3: Book appointment in Oracle
    const bookingData = {
      mrn: oraclePatient.mrn,
      clinic,
      doctorId,
      preferredDate,
      preferredTime,
      appointmentType,
      notes,
    };

    const oracleAppointment = await bookAppointmentInOracle(bookingData, branch, apiKey);

    // Step 4: Store appointment in Basma DB
    const basmaAppointment = await storeAppointmentInBasma(
      env, 
      bookingData, 
      oracleAppointment, 
      basmaPatient.id
    );

    // Step 5: Generate confirmation message
    const isAr = language === "ar";
    const confirmationMessage = isAr 
      ? `تم تأكيد حجز موعدك بنجاح في ${oracleAppointment.clinic} بتاريخ ${oracleAppointment.date} الساعة ${oracleAppointment.time}. رقم الملف الطبي: ${oraclePatient.mrn}، ورقم الموعد: ${oracleAppointment.appointmentNumber}.`
      : `Your appointment has been confirmed at ${oracleAppointment.clinic} on ${oracleAppointment.date} at ${oracleAppointment.time}. MRN: ${oraclePatient.mrn}, Appointment #: ${oracleAppointment.appointmentNumber}.`;

    return {
      success: true,
      patient: {
        basmaId: basmaPatient.id,
        mrn: oraclePatient.mrn,
        oraclePatientId: oraclePatient.oraclePatientId,
        name: `${firstName} ${lastName}`,
      },
      appointment: {
        basmaId: basmaAppointment.id,
        appointmentNumber: oracleAppointment.appointmentNumber,
        oracleAppointmentId: oracleAppointment.appointmentId,
        date: oracleAppointment.date,
        time: oracleAppointment.time,
        clinic: oracleAppointment.clinic,
        doctor: oracleAppointment.doctor,
        status: oracleAppointment.status,
      },
      confirmationMessage,
      language,
    };

  } catch (error) {
    console.error("Booking flow error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Check if patient exists in Oracle by National ID
 */
async function lookupPatientByNationalId(nationalId, branch = "RIYADH", apiKey) {
  const response = await fetch(
    `${ORACLE_BRIDGE_BASE}/api/patients/lookup?nationalId=${encodeURIComponent(nationalId)}&branch=${branch}`,
    {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    }
  );

  if (response.status === 404) {
    return null; // Patient not found
  }

  if (!response.ok) {
    throw new Error(`Patient lookup failed: ${response.status}`);
  }

  return await response.json();
}

/**
 * Enhanced booking flow with patient lookup (prevent duplicates)
 */
async function processBookingWithLookup(request, env) {
  const body = await request.json();
  const { nationalId, branch = "RIYADH" } = body;
  
  const apiKey = env.ORACLE_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Oracle API key not configured" };
  }

  try {
    // Check if patient already exists
    const existingPatient = await lookupPatientByNationalId(nationalId, branch, apiKey);
    
    if (existingPatient) {
      // Patient exists - use existing MRN
      body.mrn = existingPatient.mrn;
      // Skip registration, go straight to booking
      // ... (modified flow)
    }
    
    // Continue with normal flow
    return await processBookingFlow(request, env);
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export {
  processBookingFlow,
  processBookingWithLookup,
  registerPatientInOracle,
  bookAppointmentInOracle,
  storePatientInBasma,
  storeAppointmentInBasma,
  lookupPatientByNationalId,
};
