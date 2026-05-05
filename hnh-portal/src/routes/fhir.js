import { json } from '../utils/response.js';
import { providers } from './providers.js';

// FHIR R4 Resource builders
function fhirPatient(patient) {
  if (!patient) return null;
  const names = [];
  const nameAr = patient.full_name_ar || patient.name_ar || '';
  const nameEn = patient.full_name_en || patient.name_en || '';
  if (nameAr || nameEn) {
    const name = { use: 'official' };
    if (nameEn) name.text = nameEn;
    if (nameAr) name.text_ar = nameAr;
    names.push(name);
  }
  return {
    resourceType: 'Patient',
    id: patient.id,
    identifier: [
      { system: 'https://hnh.brainsait.org/identifier/patient', value: patient.id },
      ...(patient.national_id ? [{ system: 'https://nphies.sa/identifier/national-id', value: patient.national_id }] : []),
      ...(patient.insurance_id ? [{ system: 'https://nphies.sa/identifier/insurance', value: patient.insurance_id, assigner: { display: patient.insurance_company } }] : []),
    ],
    active: true,
    name: names,
    telecom: [
      ...(patient.phone ? [{ system: 'phone', value: patient.phone, use: 'mobile' }] : []),
      ...(patient.email ? [{ system: 'email', value: patient.email, use: 'work' }] : []),
    ],
    gender: patient.gender || 'unknown',
    birthDate: patient.date_of_birth || patient.dob || null,
    managingOrganization: { reference: 'Organization/HNH-R001', display: 'Hayat National Hospital - Gharnata' },
    generalPractitioner: [],
    communication: [
      { language: { coding: [{ system: 'urn:ietf:bcp:47', code: 'ar' }], text: 'Arabic' }, preferred: true },
      { language: { coding: [{ system: 'urn:ietf:bcp:47', code: 'en' }], text: 'English' } },
    ],
    extension: [
      ...(patient.blood_type ? [{ url: 'http://hl7.org/fhir/StructureDefinition/patient-bloodType', valueString: patient.blood_type }] : []),
      ...(patient.allergies ? [{ url: 'http://hl7.org/fhir/StructureDefinition/patient-allergies', valueString: patient.allergies }] : []),
    ],
  };
}

function fhirPractitioner(provider) {
  if (!provider) return null;
  const qualifications = (provider.education && provider.education.length)
    ? provider.education.map(edu => ({
        identifier: [],
        code: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0360', code: 'MD', display: edu.degree }] },
        period: { start: edu.year ? `${edu.year}-01-01` : '2000-01-01' },
        issuer: { display: edu.institution },
      }))
    : (provider.specialty ? [{ code: { text: provider.specialty } }] : []);
  const languages = provider.languages && provider.languages.length ? provider.languages : ['ar', 'en'];
  return {
    resourceType: 'Practitioner',
    id: provider.id,
    identifier: [
      { system: 'https://hnh.brainsait.org/identifier/provider', value: provider.id },
      ...(provider.givc_oid ? [{ system: 'urn:ietf:rfc:3986', value: `urn:oid:${provider.givc_oid}` }] : []),
    ],
    active: true,
    name: [
      { use: 'official', text: provider.name_en || provider.name_ar || '', text_en: provider.name_en || '', text_ar: provider.name_ar || '' },
    ],
    qualification: qualifications,
    communication: languages.map(l => ({
      coding: [{ system: 'urn:ietf:bcp:47', code: l }],
    })),
    extension: [
      ...(provider.givc_registered ? [{ url: 'https://hnh.brainsait.org/fhir/StructureDefinition/givc-registered', valueBoolean: true }] : []),
      ...(provider.branch_id ? [{ url: 'https://hnh.brainsait.org/fhir/StructureDefinition/provider-branch', valueString: provider.branch_id }] : []),
    ],
  };
}

function fhirAppointment(appt) {
  if (!appt) return null;
  return {
    resourceType: 'Appointment',
    id: appt.id,
    status: appt.status === 'scheduled' ? 'booked' : appt.status,
    start: `${appt.appointment_date}T${appt.appointment_time}:00`,
    participant: [
      ...(appt.patient_id ? [{ actor: { reference: `Patient/${appt.patient_id}` }, status: 'accepted' }] : []),
      ...(appt.provider_id ? [{ actor: { reference: `Practitioner/${appt.provider_id}` }, status: 'accepted' }] : []),
    ],
    description: appt.notes || '',
    serviceType: [{ coding: [{ system: 'http://snomed.info/sct', display: appt.department_id }] }],
  };
}

function fhirClaim(claim) {
  if (!claim) return null;
  return {
    resourceType: 'Claim',
    id: claim.id,
    identifier: [{ system: 'https://hnh.brainsait.org/identifier/claim', value: claim.claim_number }],
    status: claim.status === 'draft' ? 'active' : claim.status === 'submitted' ? 'active' : 'active',
    type: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/claim-type', code: 'professional' }] },
    use: 'claim',
    patient: { reference: `Patient/${claim.patient_id}` },
    created: claim.created_at || new Date().toISOString(),
    insurer: { display: claim.insurance_company || 'Unknown' },
    provider: claim.provider_id ? { reference: `Practitioner/${claim.provider_id}` } : {},
    priority: { coding: [{ code: 'normal' }] },
    total: { value: claim.total_amount, currency: 'SAR' },
  };
}

// FHIR endpoints
export async function getFHIRPatient(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare('SELECT * FROM patients WHERE id = ? OR national_id = ?').bind(id, id).first();
  if (!patient) return json({ success: false, message: 'Patient not found' }, 404);
  return json(fhirPatient(patient));
}

export async function searchFHIRPatients(req, env, ctx, params, url) {
  const name = url.searchParams.get('name') || '';
  const identifier = url.searchParams.get('identifier') || '';
  const phone = url.searchParams.get('phone') || '';

  let query = 'SELECT * FROM patients WHERE 1=1';
  const binds = [];

  if (name) { query += ' AND (full_name_ar LIKE ? OR full_name_en LIKE ?)'; binds.push(`%${name}%`, `%${name}%`); }
  if (identifier) { query += ' AND (id LIKE ? OR national_id LIKE ?)'; binds.push(`%${identifier}%`, `%${identifier}%`); }
  if (phone) { query += ' AND phone LIKE ?'; binds.push(`%${phone}%`); }

  const { results } = await env.DB.prepare(query + ' LIMIT 50').bind(...binds).all();
  return json({
    resourceType: 'Bundle',
    type: 'searchset',
    total: results?.length || 0,
    entry: (results || []).map(p => ({ resource: fhirPatient(p), search: { mode: 'match' } })),
  });
}

export async function getFHIRPractitioner(req, env, ctx, params) {
  const id = params[0];
  const { getProvider } = await import("./providers.js");
  const provider = await getProvider(id, env);
  if (!provider) return json({ success: false, message: 'Provider not found' }, 404);
  return json(fhirPractitioner(provider));
}

export async function getFHIRAppointment(req, env, ctx, params) {
  const id = params[0];
  const appt = await env.DB.prepare('SELECT * FROM appointments WHERE id = ?').bind(id).first();
  if (!appt) return json({ success: false, message: 'Appointment not found' }, 404);
  return json(fhirAppointment(appt));
}

export async function getFHIRClaim(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare('SELECT * FROM claims WHERE id = ? OR claim_number = ?').bind(id, id).first();
  if (!claim) return json({ success: false, message: 'Claim not found' }, 404);
  return json(fhirClaim(claim));
}

export async function getFHIRCoverage(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare('SELECT * FROM patients WHERE id = ? OR national_id = ?').bind(id, id).first();
  
  if (!patient) return json({ success: false, message: 'Patient not found' }, 404);

  return json({
    resourceType: 'Coverage',
    id: `COV-${patient.id}`,
    status: 'active',
    kind: 'insurance',
    subscriber: { reference: `Patient/${patient.id}` },
    subscriberId: patient.insurance_id || 'N/A',
    beneficiary: { reference: `Patient/${patient.id}` },
    relationship: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/subscriber-relationship', code: 'self' }] },
    payor: [{ display: patient.insurance_company || 'Self-Pay' }],
    period: { start: '2026-01-01', end: '2026-12-31' },
  });
}
