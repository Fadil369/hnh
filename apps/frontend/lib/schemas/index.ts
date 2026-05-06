import { z } from 'zod'

export const HealthSchema = z.object({
  success: z.boolean().optional(),
  status: z.string(),
  version: z.string().optional(),
  name: z.string().optional(),
  timestamp: z.string().optional(),
  database: z.string().optional(),
  his_database: z.string().optional(),
  basma_database: z.string().optional(),
  environment: z.string().optional(),
  stats: z.object({
    total_patients: z.number().optional(),
    today_appointments: z.number().optional(),
    total_providers: z.number().optional(),
    total_claims: z.number().optional(),
    pending_claims: z.number().optional(),
    givc_network_count: z.number().optional(),
    today_telehealth: z.number().optional(),
    today_homecare: z.number().optional(),
  }).partial().optional(),
  integrations: z.record(z.string(), z.union([z.string(), z.object({}).passthrough()])).optional(),
}).passthrough()
export type Health = z.infer<typeof HealthSchema>

export const StatsSchema = z.object({
  total_patients: z.number().optional(),
  today_appointments: z.number().optional(),
  total_providers: z.number().optional(),
  total_claims: z.number().optional(),
  pending_claims: z.number().optional(),
  givc_network_count: z.number().optional(),
  today_telehealth: z.number().optional(),
  today_homecare: z.number().optional(),
}).partial().passthrough()
export type Stats = z.infer<typeof StatsSchema>

export const PatientSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  national_id: z.string().optional(),
  mrn: z.string().optional(),
  first_name_ar: z.string().optional(),
  first_name_en: z.string().optional(),
  last_name_ar: z.string().optional(),
  last_name_en: z.string().optional(),
  full_name_ar: z.string().optional(),
  full_name_en: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough()
export type Patient = z.infer<typeof PatientSchema>

export const PatientsListSchema = z.object({
  success: z.boolean().optional(),
  patients: z.array(PatientSchema).default([]),
  total: z.number().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
}).passthrough()

export const PatientCreateSchema = z.object({
  national_id: z.string().min(1, 'Required'),
  first_name_ar: z.string().min(1, 'Required'),
  first_name_en: z.string().min(1, 'Required'),
  last_name_ar: z.string().min(1, 'Required'),
  last_name_en: z.string().min(1, 'Required'),
  date_of_birth: z.string().min(1, 'Required'),
  gender: z.enum(['M', 'F']),
  phone: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
})
export type PatientCreate = z.infer<typeof PatientCreateSchema>

export const ProviderSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string().optional(),
  name_ar: z.string().optional(),
  specialty: z.string().optional(),
  specialty_ar: z.string().optional(),
  license_number: z.string().optional(),
  facility: z.string().optional(),
  status: z.string().optional(),
}).passthrough()
export type Provider = z.infer<typeof ProviderSchema>

export const AppointmentSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  patient_id: z.union([z.string(), z.number()]).optional(),
  patient_name: z.string().optional(),
  provider_id: z.union([z.string(), z.number()]).optional(),
  provider_name: z.string().optional(),
  scheduled_at: z.string().optional(),
  appointment_date: z.string().optional(),
  appointment_time: z.string().optional(),
  duration_minutes: z.number().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
}).passthrough()
export type Appointment = z.infer<typeof AppointmentSchema>

export const ClaimSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  claim_number: z.string().optional(),
  patient_id: z.union([z.string(), z.number()]).optional(),
  patient_name: z.string().optional(),
  total_amount: z.number().optional(),
  net_amount: z.number().optional(),
  status: z.string().optional(),
  nphies_status: z.string().optional(),
  payer: z.string().optional(),
  service_date: z.string().optional(),
  submission_date: z.string().optional(),
  created_at: z.string().optional(),
}).passthrough()
export type Claim = z.infer<typeof ClaimSchema>

export const EligibilityRequestSchema = z.object({
  national_id: z.string().min(1, 'Required'),
  payer_id: z.string().min(1, 'Required'),
  service_date: z.string().min(1, 'Required'),
  service_type: z.string().optional(),
})
export type EligibilityRequest = z.infer<typeof EligibilityRequestSchema>

export const EligibilityResponseSchema = z.object({
  success: z.boolean().optional(),
  eligible: z.boolean().optional(),
  status: z.string().optional(),
  coverage: z.unknown().optional(),
  member_id: z.string().optional(),
  policy_number: z.string().optional(),
  effective_date: z.string().optional(),
  expiration_date: z.string().optional(),
  copay: z.number().optional(),
  deductible: z.number().optional(),
  message: z.string().optional(),
  raw: z.unknown().optional(),
}).passthrough()
