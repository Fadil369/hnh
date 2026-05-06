'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Sparkles, User, Stethoscope, Building2, Landmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useT } from '@/lib/i18n'
import { useRunWorkflow } from '@/hooks/useApi'

interface CardInput { name: string; label: string; labelAr: string; placeholder?: string }
interface WorkflowDef {
  id: string
  label: string; labelAr: string
  desc: string; descAr: string
  endpoint: string
  inputs: CardInput[]
}

const PATIENT: WorkflowDef[] = [
  { id: 'symptom', label: 'Symptom triage', labelAr: 'فرز الأعراض', desc: 'AI symptom triage', descAr: 'فرز الأعراض بالذكاء',
    endpoint: '/api/workflows/patient/symptom-triage',
    inputs: [{ name: 'symptoms', label: 'Symptoms', labelAr: 'الأعراض' }, { name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }] },
  { id: 'reminder', label: 'Appointment reminder', labelAr: 'تذكير بالموعد', desc: 'SMS / WhatsApp reminders', descAr: 'تذكيرات الرسائل',
    endpoint: '/api/workflows/patient/reminder',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }, { name: 'phone', label: 'Phone', labelAr: 'الهاتف' }] },
  { id: 'medication', label: 'Medication assist', labelAr: 'مساعد الأدوية', desc: 'Drug interaction & adherence', descAr: 'تفاعلات الدواء',
    endpoint: '/api/workflows/patient/medication',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }, { name: 'medication', label: 'Medication', labelAr: 'الدواء' }] },
  { id: 'followup', label: 'Follow-up scheduling', labelAr: 'جدولة المتابعة', desc: 'Suggest follow-up dates', descAr: 'اقتراح المتابعة',
    endpoint: '/api/workflows/patient/follow-up',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }, { name: 'last_visit', label: 'Last visit', labelAr: 'آخر زيارة' }] },
]

const PROVIDER: WorkflowDef[] = [
  { id: 'clinical', label: 'Clinical decision', labelAr: 'القرار السريري', desc: 'AI clinical assistant', descAr: 'مساعد القرار السريري',
    endpoint: '/api/workflows/provider/clinical-decision',
    inputs: [
      { name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' },
      { name: 'provider_id', label: 'Provider ID', labelAr: 'رقم الطبيب' },
      { name: 'chief_complaint', label: 'Chief complaint', labelAr: 'الشكوى الرئيسية' },
    ] },
  { id: 'soap', label: 'SOAP notes', labelAr: 'ملاحظات SOAP', desc: 'Generate clinical notes', descAr: 'توليد الملاحظات',
    endpoint: '/api/workflows/provider/soap-notes',
    inputs: [{ name: 'encounter_id', label: 'Encounter ID', labelAr: 'رقم الزيارة' }] },
  { id: 'lab', label: 'Lab analysis', labelAr: 'تحليل المختبر', desc: 'Interpret lab results', descAr: 'تفسير النتائج',
    endpoint: '/api/workflows/provider/lab-analysis',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }] },
  { id: 'rx', label: 'Prescription review', labelAr: 'مراجعة الوصفة', desc: 'Review prescriptions', descAr: 'مراجعة الوصفات',
    endpoint: '/api/workflows/provider/prescription',
    inputs: [{ name: 'rx_id', label: 'Rx ID', labelAr: 'رقم الوصفة' }] },
  { id: 'referral', label: 'Referral routing', labelAr: 'توجيه الإحالة', desc: 'Smart referral matching', descAr: 'مطابقة الإحالات',
    endpoint: '/api/workflows/provider/referral',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }, { name: 'specialty', label: 'Specialty', labelAr: 'التخصص' }] },
]

const PAYER: WorkflowDef[] = [
  { id: 'eligibility', label: 'Auto eligibility', labelAr: 'أهلية تلقائية', desc: '270/271 automation', descAr: 'أتمتة 270/271',
    endpoint: '/api/workflows/payer/eligibility',
    inputs: [{ name: 'national_id', label: 'National ID', labelAr: 'رقم الهوية' }, { name: 'payer_id', label: 'Payer ID', labelAr: 'جهة الدفع' }] },
  { id: 'preauth', label: 'Pre-authorization', labelAr: 'موافقة مسبقة', desc: 'AI pre-auth recommender', descAr: 'موافقة ذكية',
    endpoint: '/api/workflows/payer/preauth',
    inputs: [{ name: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض' }, { name: 'service_code', label: 'Service code', labelAr: 'رمز الخدمة' }] },
  { id: 'fraud', label: 'Fraud detection', labelAr: 'كشف الاحتيال', desc: 'Pattern-based detection', descAr: 'كشف بالأنماط',
    endpoint: '/api/workflows/payer/fraud-detect',
    inputs: [{ name: 'claim_id', label: 'Claim ID', labelAr: 'رقم المطالبة' }] },
  { id: 'adjudicate', label: 'Adjudication', labelAr: 'تسوية المطالبة', desc: 'Auto-adjudicate claim', descAr: 'تسوية تلقائية',
    endpoint: '/api/workflows/payer/adjudicate',
    inputs: [{ name: 'claim_id', label: 'Claim ID', labelAr: 'رقم المطالبة' }] },
]

const GOV: WorkflowDef[] = [
  { id: 'reporting', label: 'MoH reporting', labelAr: 'تقارير الصحة', desc: 'Compliance reports', descAr: 'تقارير الامتثال',
    endpoint: '/api/workflows/government/reporting',
    inputs: [{ name: 'period', label: 'Period (YYYY-MM)', labelAr: 'الفترة' }] },
  { id: 'epidemic', label: 'Epidemic surveillance', labelAr: 'الترصد الوبائي', desc: 'Outbreak detection', descAr: 'رصد الأوبئة',
    endpoint: '/api/workflows/government/surveillance',
    inputs: [{ name: 'region', label: 'Region', labelAr: 'المنطقة' }] },
  { id: 'license', label: 'License verification', labelAr: 'التحقق من الترخيص', desc: 'Verify provider license', descAr: 'تحقق من الترخيص',
    endpoint: '/api/workflows/government/license',
    inputs: [{ name: 'provider_id', label: 'Provider ID', labelAr: 'رقم الطبيب' }] },
  { id: 'audit', label: 'Compliance audit', labelAr: 'تدقيق الامتثال', desc: 'Run compliance audit', descAr: 'تشغيل التدقيق',
    endpoint: '/api/workflows/government/audit',
    inputs: [{ name: 'entity_id', label: 'Entity ID', labelAr: 'رقم المنشأة' }] },
]

const TABS: { value: string; icon: any; label: string; data: WorkflowDef[] }[] = [
  { value: 'patient', icon: User, label: 'workflows.tab.patient', data: PATIENT },
  { value: 'provider', icon: Stethoscope, label: 'workflows.tab.provider', data: PROVIDER },
  { value: 'payer', icon: Building2, label: 'workflows.tab.payer', data: PAYER },
  { value: 'government', icon: Landmark, label: 'workflows.tab.government', data: GOV },
]

export default function WorkflowsPage() {
  const { t } = useT()

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">Workflows</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('workflows.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('workflows.subtitle')}</p>
      </header>

      <Tabs defaultValue="patient">
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="h-4 w-4" />
              {t(tab.label as any)}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tab.data.map((wf, idx) => (
              <motion.div key={wf.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                <WorkflowCard wf={wf} />
              </motion.div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function WorkflowCard({ wf }: { wf: WorkflowDef }) {
  const { t, locale } = useT()
  const run = useRunWorkflow()
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(wf.inputs.map((i) => [i.name, '']))
  )
  const [result, setResult] = useState<string>('')

  const onRun = async () => {
    try {
      const r: any = await run.mutateAsync({ endpoint: wf.endpoint, payload: values })
      setResult(r?.ai_summary || r?.summary || r?.result || JSON.stringify(r, null, 2))
    } catch (e: any) {
      setResult(e?.message ?? 'Failed')
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{locale === 'ar' ? wf.labelAr : wf.label}</CardTitle>
        <CardDescription>{locale === 'ar' ? wf.descAr : wf.desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {wf.inputs.map((input) => (
          <div key={input.name} className="grid gap-1.5">
            <Label>{locale === 'ar' ? input.labelAr : input.label}</Label>
            <Input
              value={values[input.name] ?? ''}
              onChange={(e) => setValues((prev) => ({ ...prev, [input.name]: e.target.value }))}
            />
          </div>
        ))}
        <Button size="sm" onClick={onRun} disabled={run.isPending}>
          {run.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {run.isPending ? t('workflows.running') : t('workflows.run')}
        </Button>
        <AnimatePresence>
          {result ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border bg-muted/40 p-3">
              <pre className="whitespace-pre-wrap text-xs">{result}</pre>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
