'use client'

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { api, safeParse } from '@/lib/api'
import {
  HealthSchema, StatsSchema, PatientsListSchema, PatientCreateSchema,
  type Patient, type PatientCreate, type EligibilityRequest,
} from '@/lib/schemas'
import { toast } from 'sonner'

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

// ─── Providers / Appointments / Claims (read-only lists) ────────────────────
export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const r = await api<{ providers?: any[] }>('/api/providers')
      return r.providers ?? []
    },
  })
}

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const r = await api<{ appointments?: any[] }>('/api/appointments')
      return r.appointments ?? []
    },
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

// ─── Eligibility ─────────────────────────────────────────────────────────────
export function useCheckEligibility() {
  return useMutation({
    mutationFn: async (input: EligibilityRequest) =>
      api<any>('/api/eligibility/check', { method: 'POST', body: input }),
    onError: (e: any) => toast.error(e?.message ?? 'Eligibility check failed'),
  })
}
