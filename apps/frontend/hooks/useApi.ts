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
