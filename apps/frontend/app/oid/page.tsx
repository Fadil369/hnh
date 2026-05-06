'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Network, Loader2, Sparkles, ChevronRight, Stethoscope, Calendar,
  FileText, Video, HeartPulse, FlaskConical, Image as ImageIcon, Pill,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useProviders, useProviderOidTree, useRegisterProviderOid } from '@/hooks/useApi'

const ARC_ICON: Record<number, any> = {
  1: Calendar, 2: FileText, 3: Video, 4: HeartPulse,
  5: FlaskConical, 6: ImageIcon, 7: FileText, 8: Pill,
}
const ARC_TONE: Record<number, string> = {
  1: 'from-sky-500 to-cyan-500',
  2: 'from-fuchsia-500 to-purple-500',
  3: 'from-indigo-500 to-violet-500',
  4: 'from-rose-500 to-pink-500',
  5: 'from-emerald-500 to-teal-500',
  6: 'from-amber-500 to-orange-500',
  7: 'from-slate-500 to-zinc-500',
  8: 'from-lime-500 to-emerald-500',
}

export default function OidPage() {
  const { t, locale } = useT()
  const { data: providers = [], isLoading: provLoading } = useProviders()
  const [providerId, setProviderId] = useState('')
  const tree = useProviderOidTree(providerId)
  const register = useRegisterProviderOid()
  const [filter, setFilter] = useState('')

  const filtered = useMemo(() => {
    const all = providers as any[]
    if (!filter.trim()) return all.slice(0, 50)
    const q = filter.trim().toLowerCase()
    return all.filter((p) =>
      String(p.name_en ?? '').toLowerCase().includes(q) ||
      String(p.name_ar ?? '').includes(q) ||
      String(p.specialty ?? '').toLowerCase().includes(q) ||
      String(p.givc_oid ?? '').includes(q)
    ).slice(0, 50)
  }, [providers, filter])

  const selected = (providers as any[]).find((p) => p.id === providerId)
  const data: any = tree.data
  const oid = data?.oid ?? selected?.givc_oid

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.18),transparent_60%)]" aria-hidden />
        <div className="relative">
          <Badge variant="info">OID Registry · HL7-style</Badge>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {locale === 'ar' ? 'سجل المعرفات الفريدة للأطباء' : 'Provider OID registry'}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {locale === 'ar'
              ? 'كل طبيب لديه OID جذري بنمط HL7. كل سجل سريري وفاتورة ومختبر وأشعة تُربط كأبناء لهذا الجذر، فيتشكل شجرة قابلة للتشغيل البيني مع FHIR.'
              : 'Each provider gets a HL7-style root OID. Encounters, claims, labs, radiology, reports, telehealth and homecare attach as children — yielding an interoperable FHIR-friendly tree.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {['1.3.6.1.4.1.61026.{branch}.{spec}.{seq}', 'urn:oid:*', 'FHIR Practitioner.identifier', 'GIVC network'].map((tag) => (
              <span key={tag} className="rounded-full border bg-background/60 px-3 py-1 font-mono">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Network className="h-4 w-4" />
            {locale === 'ar' ? 'اختر طبيبًا' : 'Select provider'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'ابحث بالاسم أو التخصص أو OID' : 'Search by name, specialty, or OID'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="grid gap-1.5">
              <Label>{locale === 'ar' ? 'بحث' : 'Filter'}</Label>
              <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Cardiology, Riyadh, 61026…" />
            </div>
            <div className="grid gap-1.5">
              <Label>{locale === 'ar' ? 'طبيب' : 'Provider'}</Label>
              <Select value={providerId} onValueChange={setProviderId}>
                <SelectTrigger className="w-72"><SelectValue placeholder={provLoading ? '…' : 'Select'} /></SelectTrigger>
                <SelectContent>
                  {filtered.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {(p.name_en ?? p.name_ar ?? p.id)} · {p.specialty ?? '—'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                disabled={!providerId || register.isPending || !!data?.oid}
                onClick={() => providerId && register.mutate(providerId)}
              >
                {register.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {locale === 'ar' ? 'تسجيل OID' : 'Register OID'}
              </Button>
            </div>
          </div>

          {selected ? (
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{selected.name_en ?? selected.name_ar}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.specialty} · {selected.branch ?? '—'} · DB#{selected.db_id ?? '—'}
                  </p>
                </div>
                <code className="rounded-md border bg-background px-3 py-1 font-mono text-xs">
                  {oid ?? (locale === 'ar' ? 'بدون OID' : 'no OID yet')}
                </code>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {!providerId ? null : tree.isLoading ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : tree.isError ? (
        <Card><CardContent className="p-10 text-center text-sm text-destructive">
          {locale === 'ar' ? 'تعذر جلب الشجرة' : 'Failed to load tree'}
        </CardContent></Card>
      ) : data?.tree ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {data.tree.map((branch: any, i: number) => {
            const Icon = ARC_ICON[branch.arc] ?? Stethoscope
            const tone = ARC_TONE[branch.arc] ?? 'from-slate-500 to-zinc-500'
            return (
              <motion.div key={branch.arc} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="overflow-hidden">
                  <div className={`bg-gradient-to-br ${tone} p-4 text-white`}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-semibold">{branch.label}</span>
                      <Badge className="ms-auto" variant="outline">{branch.count}</Badge>
                    </div>
                    <code className="mt-2 block truncate font-mono text-[11px] text-white/85">{branch.oid}</code>
                  </div>
                  <CardContent className="space-y-1 p-3">
                    {branch.children.length === 0 ? (
                      <p className="py-3 text-center text-xs text-muted-foreground">—</p>
                    ) : branch.children.slice(0, 8).map((child: any) => (
                      <div key={child.oid} className="flex items-center justify-between gap-2 rounded-md border bg-card/60 px-2 py-1.5">
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="flex-1 truncate text-xs">{child.label}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">.{branch.arc}.{child.ref}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
