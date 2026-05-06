'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'

export type Locale = 'en' | 'ar'

export const dictionary = {
  en: {
    'app.title': 'HNH × BrainSAIT',
    'app.tagline': 'Healthcare OS for Saudi providers',
    'nav.home': 'Home',
    'nav.portals': 'Portals',
    'nav.integrations': 'Integrations',
    'nav.github': 'GitHub',
    'nav.workflows': 'Workflows',
    'nav.patients': 'Patients',
    'nav.providers': 'Providers',
    'nav.appointments': 'Appointments',
    'nav.eligibility': 'Eligibility',
    'nav.claims': 'Claims',
    'nav.knowledge': 'Knowledge',
    'nav.stitch': 'Stitch',
    'nav.sbs': 'SBS',
    'nav.givc': 'GIVC',
    'nav.nphies': 'NPHIES',
    'common.search': 'Search',
    'common.loading': 'Loading…',
    'common.error': 'Something went wrong',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.create': 'Create',
    'common.update': 'Update',
    'common.delete': 'Delete',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.empty': 'Nothing here yet',
    'common.viewAll': 'View all',
    'common.required': 'Required',
    'common.online': 'Online',
    'common.offline': 'Offline',
    'common.degraded': 'Degraded',
    'cmd.placeholder': 'Search pages, patients, claims…',
    'cmd.empty': 'No results found.',
    'cmd.pages': 'Pages',
    'cmd.actions': 'Actions',
    'cmd.theme': 'Theme',
    'cmd.locale': 'Language',
    'cmd.theme.light': 'Light mode',
    'cmd.theme.dark': 'Dark mode',
    'cmd.theme.system': 'System',
    'cmd.locale.en': 'English',
    'cmd.locale.ar': 'العربية',
    'home.hero.eyebrow': 'Saudi Healthcare OS',
    'home.hero.title': 'Unified clinical, billing & insurance for HNH-Gharnata',
    'home.hero.subtitle': 'NPHIES, FHIR, RCM, and Basma AI orchestration in one platform — bilingual, accessible, and production-grade on Cloudflare.',
    'home.hero.cta.portal': 'Open portals',
    'home.hero.cta.docs': 'Read docs',
    'home.stats.patients': 'Patients',
    'home.stats.appointments': 'Appointments today',
    'home.stats.providers': 'Providers',
    'home.stats.claims': 'Claims',
    'home.stats.pending': 'Pending claims',
    'patients.title': 'Patients',
    'patients.search.placeholder': 'Search by national ID, MRN, name…',
    'patients.create': 'New patient',
    'patients.empty': 'No patients found',
    'patients.field.national_id': 'National ID',
    'patients.field.first_name_ar': 'First name (Arabic)',
    'patients.field.first_name_en': 'First name (English)',
    'patients.field.last_name_ar': 'Last name (Arabic)',
    'patients.field.last_name_en': 'Last name (English)',
    'patients.field.date_of_birth': 'Date of birth',
    'patients.field.gender': 'Gender',
    'patients.field.gender.M': 'Male',
    'patients.field.gender.F': 'Female',
    'patients.field.phone': 'Phone',
    'patients.field.email': 'Email',
    'patients.created': 'Patient created',
    'patients.updated': 'Patient updated',
    'eligibility.title': 'Insurance eligibility',
    'eligibility.subtitle': 'NPHIES 270/271 real-time check',
    'eligibility.field.national_id': 'National ID',
    'eligibility.field.payer_id': 'Payer',
    'eligibility.field.service_date': 'Service date',
    'eligibility.field.service_type': 'Service type',
    'eligibility.check': 'Check eligibility',
    'eligibility.eligible': 'Eligible',
    'eligibility.not_eligible': 'Not eligible',
    'theme.toggle': 'Toggle theme',
    'locale.toggle': 'Toggle language',
  },
  ar: {
    'app.title': 'HNH × BrainSAIT',
    'app.tagline': 'منصة الرعاية الصحية لمقدمي الخدمة في المملكة',
    'nav.home': 'الرئيسية',
    'nav.portals': 'المنافذ',
    'nav.integrations': 'التكامل',
    'nav.github': 'GitHub',
    'nav.workflows': 'سير العمل',
    'nav.patients': 'المرضى',
    'nav.providers': 'مقدمو الخدمة',
    'nav.appointments': 'المواعيد',
    'nav.eligibility': 'الأهلية',
    'nav.claims': 'المطالبات',
    'nav.knowledge': 'المعرفة',
    'nav.stitch': 'Stitch',
    'nav.sbs': 'الفوترة',
    'nav.givc': 'جيفك',
    'nav.nphies': 'نفيس',
    'common.search': 'بحث',
    'common.loading': 'جاري التحميل…',
    'common.error': 'حدث خطأ ما',
    'common.retry': 'إعادة المحاولة',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.create': 'إنشاء',
    'common.update': 'تحديث',
    'common.delete': 'حذف',
    'common.submit': 'إرسال',
    'common.close': 'إغلاق',
    'common.empty': 'لا توجد بيانات بعد',
    'common.viewAll': 'عرض الكل',
    'common.required': 'مطلوب',
    'common.online': 'متصل',
    'common.offline': 'غير متصل',
    'common.degraded': 'متدهور',
    'cmd.placeholder': 'ابحث في الصفحات، المرضى، المطالبات…',
    'cmd.empty': 'لا توجد نتائج.',
    'cmd.pages': 'الصفحات',
    'cmd.actions': 'الإجراءات',
    'cmd.theme': 'السمة',
    'cmd.locale': 'اللغة',
    'cmd.theme.light': 'الوضع الفاتح',
    'cmd.theme.dark': 'الوضع الداكن',
    'cmd.theme.system': 'النظام',
    'cmd.locale.en': 'English',
    'cmd.locale.ar': 'العربية',
    'home.hero.eyebrow': 'منظومة الرعاية الصحية السعودية',
    'home.hero.title': 'منصة موحدة للسريري والفوترة والتأمين لمستشفى غرناطة',
    'home.hero.subtitle': 'تنسيق نفيس و FHIR و RCM و بسمة AI في منصة واحدة — ثنائية اللغة، قابلة للوصول، وجاهزة للإنتاج على Cloudflare.',
    'home.hero.cta.portal': 'افتح المنافذ',
    'home.hero.cta.docs': 'اقرأ التوثيق',
    'home.stats.patients': 'المرضى',
    'home.stats.appointments': 'مواعيد اليوم',
    'home.stats.providers': 'مقدمو الخدمة',
    'home.stats.claims': 'المطالبات',
    'home.stats.pending': 'مطالبات معلقة',
    'patients.title': 'المرضى',
    'patients.search.placeholder': 'ابحث بالهوية الوطنية أو رقم الملف أو الاسم…',
    'patients.create': 'مريض جديد',
    'patients.empty': 'لم يتم العثور على مرضى',
    'patients.field.national_id': 'الهوية الوطنية',
    'patients.field.first_name_ar': 'الاسم الأول (عربي)',
    'patients.field.first_name_en': 'الاسم الأول (إنجليزي)',
    'patients.field.last_name_ar': 'اسم العائلة (عربي)',
    'patients.field.last_name_en': 'اسم العائلة (إنجليزي)',
    'patients.field.date_of_birth': 'تاريخ الميلاد',
    'patients.field.gender': 'الجنس',
    'patients.field.gender.M': 'ذكر',
    'patients.field.gender.F': 'أنثى',
    'patients.field.phone': 'الهاتف',
    'patients.field.email': 'البريد الإلكتروني',
    'patients.created': 'تم إنشاء المريض',
    'patients.updated': 'تم تحديث المريض',
    'eligibility.title': 'أهلية التأمين',
    'eligibility.subtitle': 'فحص نفيس 270/271 الفوري',
    'eligibility.field.national_id': 'الهوية الوطنية',
    'eligibility.field.payer_id': 'شركة التأمين',
    'eligibility.field.service_date': 'تاريخ الخدمة',
    'eligibility.field.service_type': 'نوع الخدمة',
    'eligibility.check': 'تحقق من الأهلية',
    'eligibility.eligible': 'مؤهل',
    'eligibility.not_eligible': 'غير مؤهل',
    'theme.toggle': 'تبديل السمة',
    'locale.toggle': 'تبديل اللغة',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type TranslationKey = keyof (typeof dictionary)['en']

interface I18nContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  setLocale: (l: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'hnh-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) as Locale | null
    const initial: Locale = saved === 'ar' || saved === 'en' ? saved : 'ar'
    setLocaleState(initial)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale, mounted])

  const value = useMemo<I18nContextValue>(() => {
    const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr'
    return {
      locale,
      dir,
      setLocale: setLocaleState,
      t: (key) => dictionary[locale][key] ?? dictionary.en[key] ?? String(key),
    }
  }, [locale])

  return (
    <I18nContext.Provider value={value}>
      <DirectionProvider dir={value.dir}>{children}</DirectionProvider>
    </I18nContext.Provider>
  )
}

export function useT() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used within I18nProvider')
  return ctx
}

export function useLocale() {
  return useT().locale
}
