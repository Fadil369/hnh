'use client'

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { api, safeParse } from '@/lib/api'
import {
  HealthSchema, StatsSchema, PatientsListSchema, PatientCreateSchema,
  AppointmentCreateSchema, ClaimCreateSchema,
  type Patient, type PatientCreate, type EligibilityRequest,
  type AppointmentCreate, type ClaimCreate,
} from '@/lib/schemas'
import { toast } from 'sonner'

const BSMA_API =
  process.env.NEXT_PUBLIC_BSMA_API?.trim() ||
  process.env.BSMA_API?.trim() ||
  'https://bsma.elfadil.com'

// ─── Health & stats ─────────────────────────────────────────────────────────
export function useHealth(opts?: { refetchInterval?: number }) {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => safeParse(HealthSchema, await api('/api/health')).data,
    refetchInterval: opts?.refetchInterval ?? 30_000,
  })
}

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => safeParse(StatsSchema, await api('/api/stats')).data,
  })
}

// ─── Patients ────────────────────────────────────────────────────────────────
export function usePatientsSearch(query: string) {
  return useQuery({
    queryKey: ['patients', 'search', query],
    queryFn: async () => {
      const data = await api('/api/patients', { query: { search: query } })
      return safeParse(PatientsListSchema, data).data
    },
    enabled: query.length > 0,
  })
}

export function useCreatePatient() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: PatientCreate) => {
      const valid = PatientCreateSchema.parse(input)
      return api<{ success: boolean; patient: Patient }>('/api/patients', {
        method: 'POST',
        body: valid,
      })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Patient created')
    },
    onError: (e: any) => toast.error(e?.message ?? 'Create failed'),
  })
}

// ─── Providers / Appointments / Claims ──────────────────────────────────────
export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const r = await api<{ providers?: any[] }>('/api/providers')
      return r.providers ?? []
    },
  })
}

export function useAppointments(date?: string) {
  return useQuery({
    queryKey: ['appointments', date ?? 'all'],
    queryFn: async () => {
      const r = await api<{ appointments?: any[] }>('/api/appointments', {
        query: date ? { date } : undefined,
      })
      return r.appointments ?? []
    },
  })
}

export function useCreateAppointment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: AppointmentCreate) => {
      const valid = AppointmentCreateSchema.parse(input)
      return api<{ success: boolean }>('/api/appointments', { method: 'POST', body: valid })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Appointment booked')
    },
    onError: (e: any) => toast.error(e?.message ?? 'Booking failed'),
  })
}

export function useClaims(opts: Partial<UseQueryOptions> = {}) {
  return useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const r = await api<{ claims?: any[] }>('/api/claims')
      return r.claims ?? []
    },
    ...(opts as any),
  })
}

export function useCreateClaim() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: ClaimCreate) => {
      const valid = ClaimCreateSchema.parse(input)
      return api<{ success: boolean }>('/api/claims', { method: 'POST', body: valid })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['claims'] })
      toast.success('Claim created')
    },
    onError: (e: any) => toast.error(e?.message ?? 'Create failed'),
  })
}

// ─── Eligibility ─────────────────────────────────────────────────────────────
export function useCheckEligibility() {
  return useMutation({
    mutationFn: async (input: EligibilityRequest) =>
      api<any>('/api/eligibility/check', { method: 'POST', body: input }),
    onError: (e: any) => toast.error(e?.message ?? 'Eligibility check failed'),
  })
}

// ─── Provider availability + WhatsApp notify ────────────────────────────────
export function useProviderAvailability(providerId?: string | number, date?: string) {
  return useQuery({
    queryKey: ['availability', providerId ?? null, date ?? null],
    queryFn: async () => {
      const r = await api<{ available_slots?: string[]; date?: string }>(
        `/api/telehealth/providers/${providerId}/availability`,
        { query: date ? { date } : undefined },
      )
      return r
    },
    enabled: !!providerId,
  })
}

export function useNotifyWhatsAppAppointment() {
  return useMutation({
    mutationFn: async (input: {
      to: string
      patient_name?: string
      provider_name?: string
      appointment_date: string
      appointment_time: string
      clinic_name?: string
      reason?: string
      lang?: 'ar' | 'en'
    }) => api<any>('/api/whatsapp/appointment', { method: 'POST', body: input }),
    onError: (e: any) => toast.error(e?.message ?? 'WhatsApp confirmation failed'),
  })
}

// ─── NPHIES ──────────────────────────────────────────────────────────────────
export function useNphiesSubmit() {
  return useMutation({
    mutationFn: async ({ type, payload }: { type: '270' | '278' | '837'; payload: unknown }) =>
      api<any>(`/api/nphies/${type}`, { method: 'POST', body: payload }),
    onError: (e: any) => toast.error(e?.message ?? 'NPHIES submission failed'),
  })
}

export function useGssMirror() {
  return useMutation({
    mutationFn: async () =>
      api<any>('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status'),
    onError: (e: any) => toast.error(e?.message ?? 'GSS mirror unavailable'),
  })
}

// ─── RCM / SBS ───────────────────────────────────────────────────────────────
export function useLoadRcm(branch: string) {
  return useMutation({
    mutationFn: async () => {
      const [dashboard, rejected] = await Promise.all([
        api<any>(`/api/rcm/dashboard/${branch}`),
        api<any>(`/api/rcm/claims/rejected`, { query: { branch } }),
      ])
      return {
        dashboard,
        rejected: rejected.claims || rejected.rejected_claims || [],
      }
    },
    onError: (e: any) => toast.error(e?.message ?? 'RCM load failed'),
  })
}

export function useGenerateAppeal() {
  return useMutation({
    mutationFn: async (claim_id: string) =>
      api<any>('/api/rcm/appeal/generate', { method: 'POST', body: { claim_id } }),
    onError: (e: any) => toast.error(e?.message ?? 'Appeal generation failed'),
  })
}

// ─── Workflow runner (generic POST) ─────────────────────────────────────────
export function useRunWorkflow() {
  return useMutation({
    mutationFn: async ({ endpoint, payload }: { endpoint: string; payload: unknown }) =>
      api<any>(endpoint, { method: 'POST', body: payload }),
    onError: (e: any) => toast.error(e?.message ?? 'Workflow failed'),
  })
}

// ─── GitHub ──────────────────────────────────────────────────────────────────
export function useGithubAll() {
  return useQuery({
    queryKey: ['github', 'all'],
    queryFn: async () => {
      const [activity, repo, notifications] = await Promise.allSettled([
        api<any>('/api/github/activity'),
        api<any>('/api/github/repo'),
        api<any>('/api/github/notifications'),
      ])
      return {
        events: activity.status === 'fulfilled' && activity.value?.success ? activity.value.events ?? [] : [],
        repo: repo.status === 'fulfilled' && repo.value?.success ? repo.value.repo : null,
        workflows: repo.status === 'fulfilled' && repo.value?.success ? repo.value.workflows ?? [] : [],
        notifications: notifications.status === 'fulfilled' && notifications.value?.success
          ? notifications.value.notifications ?? [] : [],
        hasErrors: [activity, repo, notifications].some(r => r.status === 'rejected'
          || (r.status === 'fulfilled' && !r.value?.success)),
      }
    },
    refetchInterval: 60_000,
  })
}

// ─── Knowledge base (BSMA RAG) ──────────────────────────────────────────────
export function useRagDocs() {
  return useQuery({
    queryKey: ['rag', 'docs'],
    queryFn: async () => {
      const r = await api<any>(`${BSMA_API}/basma/rag/documents`)
      return (r?.documents || r?.results || []) as any[]
    },
  })
}

export function useRagSearch() {
  return useMutation({
    mutationFn: async ({ query, category }: { query: string; category?: string }) => {
      const r = await api<any>(`${BSMA_API}/basma/rag/search`, {
        method: 'POST',
        body: { query, limit: 20, category },
      })
      return (r?.results || []) as any[]
    },
    onError: (e: any) => toast.error(e?.message ?? 'Search failed'),
  })
}

// ─── Notifications (Twilio: SMS / WhatsApp / Voice) ─────────────────────────
export function useNotify() {
  return useMutation({
    mutationFn: async (input: { channel: 'sms' | 'whatsapp' | 'voice'; to: string; message: string; locale?: 'ar' | 'en' }) => {
      const path = input.channel === 'whatsapp' ? '/api/whatsapp/send' : '/api/sms/send'
      return api<any>(path, {
        method: 'POST',
        body: { to: input.to, message: input.message, locale: input.locale },
      })
    },
    onSuccess: (_, v) => toast.success(`Sent via ${v.channel}`),
    onError: (e: any) => toast.error(e?.message ?? 'Notify failed'),
  })
}

// ─── Patient history (Oracle EHR + AutoRAG) ─────────────────────────────────
export function usePatientHistory(patientId: string) {
  return useQuery({
    queryKey: ['patient', 'history', patientId],
    queryFn: async () => {
      const [ehr, rag] = await Promise.allSettled([
        api<any>(`/api/patients/${patientId}/history`),
        api<any>(`${BSMA_API}/basma/rag/search`, {
          method: 'POST',
          body: { query: `patient ${patientId} history labs radiology reports`, limit: 10 },
        }),
      ])
      return {
        encounters: ehr.status === 'fulfilled' ? ehr.value?.encounters ?? [] : [],
        labs: ehr.status === 'fulfilled' ? ehr.value?.labs ?? [] : [],
        radiology: ehr.status === 'fulfilled' ? ehr.value?.radiology ?? [] : [],
        reports: ehr.status === 'fulfilled' ? ehr.value?.reports ?? [] : [],
        rag_results: rag.status === 'fulfilled' ? rag.value?.results ?? [] : [],
      }
    },
    enabled: patientId.length > 0,
  })
}

// ─── Telehealth & Homecare ──────────────────────────────────────────────────
export function useTelehealthSessions(opts: { date?: string; status?: string; limit?: number } = {}) {
  return useQuery({
    queryKey: ['telehealth', 'sessions', opts],
    queryFn: async () => {
      const r = await api<{ sessions?: any[]; total?: number }>('/api/telehealth/sessions', {
        query: { date: opts.date, status: opts.status, limit: opts.limit ?? 25 },
      })
      return r.sessions ?? []
    },
    refetchInterval: 30_000,
  })
}

export function useTelehealthStats() {
  return useQuery({
    queryKey: ['telehealth', 'stats'],
    queryFn: async () => {
      const r = await api<any>('/api/telehealth/stats')
      return r.stats ?? r
    },
    refetchInterval: 30_000,
  })
}

export function useTelehealthIceServers() {
  return useQuery({
    queryKey: ['telehealth', 'ice'],
    queryFn: async () => api<any>('/api/telehealth/ice-servers'),
  })
}

export function useCreateTelehealthSession() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      patient_id: string
      provider_id?: string
      branch_id?: string
      session_date: string
      session_time: string
      session_type?: string
      chief_complaint?: string
      duration_min?: number
    }) => api<any>('/api/telehealth/sessions', { method: 'POST', body: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['telehealth'] })
      toast.success('Telehealth session scheduled')
    },
    onError: (e: any) => toast.error(e?.message ?? 'Telehealth schedule failed'),
  })
}

export function useStartTelehealth() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { session_id: string }) => {
      const id = encodeURIComponent(input.session_id)
      return api<any>(`/api/telehealth/sessions/${id}/start`, { method: 'POST', body: input })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['telehealth'] }),
    onError: (e: any) => toast.error(e?.message ?? 'Session start failed'),
  })
}

export function useScheduleHomecare() {
  return useMutation({
    mutationFn: async (input: {
      patient_id: string; service_type: string; visit_date: string; visit_time: string; address?: string
    }) => api<any>('/api/homecare/visits', { method: 'POST', body: input }),
    onSuccess: () => toast.success('Homecare visit scheduled'),
    onError: (e: any) => toast.error(e?.message ?? 'Schedule failed'),
  })
}

// ─── Claims pipeline (normalize → validate → submit) ────────────────────────
export function useNormalizeClaim() {
  return useMutation({
    mutationFn: async (input: { claim_id: string }) => {
      const id = encodeURIComponent(input.claim_id)
      return api<any>(`/api/claims/${id}/normalize`, { method: 'POST', body: input })
    },
    onError: (e: any) => toast.error(e?.message ?? 'Normalization failed'),
  })
}

export function useValidateClaim() {
  return useMutation({
    mutationFn: async (input: { claim_id: string }) => {
      const id = encodeURIComponent(input.claim_id)
      return api<any>(`/api/claims/${id}/validate`, { method: 'POST', body: input })
    },
    onError: (e: any) => toast.error(e?.message ?? 'Validation failed'),
  })
}

export function useSubmitClaim() {
  return useMutation({
    mutationFn: async (input: { claim_id: string }) => {
      const id = encodeURIComponent(input.claim_id)
      return api<any>(`/api/claims/${id}/submit`, { method: 'POST', body: input })
    },
    onError: (e: any) => toast.error(e?.message ?? 'Submission failed'),
  })
}

// ─── Provider OID Tree (HL7-style hierarchical artifact tree) ───────────────
export function useProviderOidTree(providerId: string) {
  return useQuery({
    queryKey: ['provider', 'tree', providerId],
    queryFn: async () => api<any>(`/api/providers/${encodeURIComponent(providerId)}/tree`),
    enabled: providerId.length > 0,
  })
}

export function useRegisterProviderOid() {
  return useMutation({
    mutationFn: async (providerId: string) =>
      api<any>(`/api/providers/${encodeURIComponent(providerId)}/oid/register`, { method: 'POST', body: {} }),
    onSuccess: (r: any) => toast.success(`OID ${r?.oid ?? 'registered'}`),
    onError: (e: any) => toast.error(e?.message ?? 'OID registration failed'),
  })
}
