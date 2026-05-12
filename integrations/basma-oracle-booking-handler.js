/**
 * Basma ↔ Oracle Booking Handler
 * To be added to hnh-unified worker.js
 */

/**
 * POST /api/basma/booking
 * 
 * Full patient registration + appointment booking flow:
 * 1. Register patient in Oracle → Get MRN
 * 2. Store patient in Basma DB
 * 3. Book appointment in Oracle → Get Appointment #
 * 4. Store appointment in Basma DB
 * 5. Return MRN + Appointment Number
 */
async function handleBasmaBooking(request, env) {
  try {
    const body = await request.json();
    const {
      // Patient data (required)
      firstName,
      lastName,
      firstNameAr,
      lastNameAr,
      nationalId,       // Saudi ID / Iqama
      dateOfBirth,      // YYYY-MM-DD
      gender,           // "M" | "F"
      mobile,           // +966xxxxxxxxx
      email,            // optional
      
      // Insurance (optional)
      insurancePayer,
      policyNumber,
      memberId,
      
      // Address
      city,
      nationality = "SA",
      
      // Booking data (required)
      clinic,           // e.g., "Internal Medicine", "Pediatrics"
      doctorId,         // optional - specific doctor
      preferredDate,    // YYYY-MM-DD
      preferredTime,    // HH:MM (optional)
      appointmentType = "NEW",  // NEW | FOLLOWUP | EMERGENCY
      notes,            // optional
      
      // Config
      branch = "RIYADH",
      language = "ar",
      
      // Skip registration if patient exists
      existingMrn,      // If provided, skip Oracle registration
    } = body;

    // Validation
    if (!firstName || !lastName || !nationalId || !dateOfBirth || !gender || !mobile) {
      return json({ 
        success: false, 
        error: "Missing required patient fields: firstName, lastName, nationalId, dateOfBirth, gender, mobile" 
      }, 400);
    }

    if (!clinic || !preferredDate) {
      return json({ 
        success: false, 
        error: "Missing required booking fields: clinic, preferredDate" 
      }, 400);
    }

    const apiKey = env.ORACLE_API_KEY;
    if (!apiKey) {
      return json({ 
        success: false, 
        error: "Oracle API key not configured (ORACLE_API_KEY)" 
      }, 500);
    }

    const oracleBase = env.ORACLE_BRIDGE_URL || "https://oracle-bridge.brainsait.org";
    
    let mrn = existingMrn;
    let oraclePatientId = null;
    let patientBasmaId = null;

    // Step 1: Register patient in Oracle (if no existing MRN)
    if (!mrn) {
      const patientPayload = {
        branch,
        patient: {
          firstName,
          lastName,
          firstNameAr: firstNameAr || firstName,
          lastNameAr: lastNameAr || lastName,
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
        }
      };

      const regResponse = await fetch(`${oracleBase}/api/patients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(patientPayload),
      });

      if (!regResponse.ok) {
        const errorText = await regResponse.text();
        return json({ 
          success: false, 
          error: `Oracle patient registration failed: ${regResponse.status} - ${errorText}` 
        }, 502);
      }

      const regResult = await regResponse.json();
      mrn = regResult.mrn;
      oraclePatientId = regResult.patientId;
    }

    // Step 2: Store/Update patient in Basma DB
    if (env.BASMA_DB) {
      const basmaResult = await env.BASMA_DB.prepare(`
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
          member_id,
          city,
          nationality,
          registration_source,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        ON CONFLICT(oracle_mrn) DO UPDATE SET
          mobile = excluded.mobile,
          email = excluded.email,
          insurance_payer = excluded.insurance_payer,
          policy_number = excluded.policy_number,
          member_id = excluded.member_id,
          updated_at = datetime('now')
        RETURNING id
      `).bind(
        mrn,
        oraclePatientId,
        firstName,
        lastName,
        firstNameAr || firstName,
        lastNameAr || lastName,
        nationalId,
        dateOfBirth,
        gender,
        mobile,
        email || null,
        insurancePayer || null,
        policyNumber || null,
        memberId || null,
        city || null,
        nationality,
        "hnh_booking_form"
      ).first();

      patientBasmaId = basmaResult?.id;
    }

    // Step 3: Book appointment in Oracle
    const appointmentPayload = {
      branch,
      appointment: {
        mrn,
        clinic,
        doctorId,
        preferredDate,
        preferredTime,
        appointmentType,
        notes,
      }
    };

    const apptResponse = await fetch(`${oracleBase}/api/appointments/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(appointmentPayload),
    });

    if (!apptResponse.ok) {
      const errorText = await apptResponse.text();
      return json({ 
        success: false, 
        error: `Oracle appointment booking failed: ${apptResponse.status} - ${errorText}`,
        patient: { mrn }  // Return MRN even if booking failed
      }, 502);
    }

    const apptResult = await apptResponse.json();

    // Step 4: Store appointment in Basma DB
    let appointmentBasmaId = null;
    if (env.BASMA_DB && patientBasmaId) {
      const apptBasmaResult = await env.BASMA_DB.prepare(`
        INSERT INTO appointments (
          patient_id,
          oracle_appointment_id,
          oracle_appointment_number,
          appointment_date,
          appointment_time,
          clinic,
          doctor_name,
          appointment_type,
          notes,
          status,
          source,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        RETURNING id
      `).bind(
        patientBasmaId,
        apptResult.appointmentId,
        apptResult.appointmentNumber,
        apptResult.appointmentDate || preferredDate,
        apptResult.appointmentTime || preferredTime || null,
        apptResult.clinicName || clinic,
        apptResult.doctorName || null,
        appointmentType,
        notes || null,
        apptResult.status || "CONFIRMED",
        "hnh_booking_form"
      ).first();

      appointmentBasmaId = apptBasmaResult?.id;
    }

    // Step 5: Send confirmation notification (async)
    const isAr = language === "ar";
    const confirmationMessage = isAr 
      ? `تم تأكيد حجز موعدك بنجاح في ${apptResult.clinicName || clinic} بتاريخ ${apptResult.appointmentDate || preferredDate} الساعة ${apptResult.appointmentTime || preferredTime || "غير محدد"}. رقم الملف الطبي: ${mrn}، ورقم الموعد: ${apptResult.appointmentNumber}.`
      : `Your appointment has been confirmed at ${apptResult.clinicName || clinic} on ${apptResult.appointmentDate || preferredDate} at ${apptResult.appointmentTime || preferredTime || "TBD"}. MRN: ${mrn}, Appointment #: ${apptResult.appointmentNumber}.`;

    // Fire notification asynchronously (don't wait)
    if (env.EMAIL || env.SENDGRID_API_KEY) {
      ctx?.waitUntil?.(sendConfirmationEmail(env, {
        email,
        firstName,
        confirmationMessage,
        appointmentNumber: apptResult.appointmentNumber,
        mrn,
        date: apptResult.appointmentDate || preferredDate,
        time: apptResult.appointmentTime || preferredTime,
        clinic: apptResult.clinicName || clinic,
      }));
    }

    if (mobile && (env.TWILIO_ACCOUNT_SID || env.WHATSAPP_TOKEN)) {
      ctx?.waitUntil?.(sendConfirmationSMS(env, {
        mobile,
        confirmationMessage,
      }));
    }

    // Return success response
    return json({
      success: true,
      message: confirmationMessage,
      patient: {
        mrn,
        basmaId: patientBasmaId,
        oraclePatientId,
        name: isAr 
          ? `${firstNameAr || firstName} ${lastNameAr || lastName}`
          : `${firstName} ${lastName}`,
      },
      appointment: {
        appointmentNumber: apptResult.appointmentNumber,
        basmaId: appointmentBasmaId,
        oracleAppointmentId: apptResult.appointmentId,
        date: apptResult.appointmentDate || preferredDate,
        time: apptResult.appointmentTime || preferredTime,
        clinic: apptResult.clinicName || clinic,
        doctor: apptResult.doctorName,
        status: apptResult.status || "CONFIRMED",
      },
      language,
      branch,
    });

  } catch (e) {
    console.error("Basma booking error:", e);
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * GET /api/basma/patient/lookup?nationalId=xxx&branch=RIYADH
 * Check if patient exists in Oracle by National ID
 */
async function handlePatientLookup(request, env) {
  try {
    const url = new URL(request.url);
    const nationalId = url.searchParams.get("nationalId");
    const branch = url.searchParams.get("branch") || "RIYADH";

    if (!nationalId) {
      return json({ success: false, error: "nationalId required" }, 400);
    }

    const apiKey = env.ORACLE_API_KEY;
    if (!apiKey) {
      return json({ success: false, error: "Oracle API key not configured" }, 500);
    }

    const oracleBase = env.ORACLE_BRIDGE_URL || "https://oracle-bridge.brainsait.org";

    const response = await fetch(
      `${oracleBase}/api/patients/lookup?nationalId=${encodeURIComponent(nationalId)}&branch=${branch}`,
      {
        headers: { "Authorization": `Bearer ${apiKey}` },
      }
    );

    if (response.status === 404) {
      return json({ 
        success: true, 
        found: false, 
        message: "Patient not found in Oracle" 
      });
    }

    if (!response.ok) {
      const error = await response.text();
      return json({ 
        success: false, 
        error: `Oracle lookup failed: ${response.status} - ${error}` 
      }, 502);
    }

    const patient = await response.json();
    return json({
      success: true,
      found: true,
      patient: {
        mrn: patient.mrn,
        firstName: patient.firstName,
        lastName: patient.lastName,
        nationalId: patient.nationalId,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        mobile: patient.mobile,
        email: patient.email,
      }
    });

  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

// Helper: Send confirmation email
async function sendConfirmationEmail(env, data) {
  // Implementation depends on email service (SendGrid, Mailgun, etc.)
  // This is a placeholder for the async notification
  console.log(`[Email] Confirmation to ${data.email}: ${data.confirmationMessage}`);
}

// Helper: Send confirmation SMS/WhatsApp
async function sendConfirmationSMS(env, data) {
  // Implementation depends on SMS service (Twilio, etc.)
  console.log(`[SMS] Confirmation to ${data.mobile}: ${data.confirmationMessage}`);
}

export { handleBasmaBooking, handlePatientLookup };
