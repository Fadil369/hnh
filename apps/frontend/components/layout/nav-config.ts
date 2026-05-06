import {
  Home, Globe, Link2, Github, Workflow, Users, CalendarDays,
  ShieldCheck, ClipboardList, Stethoscope, CreditCard, Building2,
  Hospital, BookOpen, Sparkles, Mic, HeartPulse, Video, type LucideIcon,
} from 'lucide-react'
import type { TranslationKey } from '@/lib/i18n'

export interface NavItem {
  href: string
  labelKey: TranslationKey
  icon: LucideIcon
  group: 'primary' | 'portal' | 'secondary'
  hint?: string
}

export const NAV: NavItem[] = [
  { href: '/',             labelKey: 'nav.home',         icon: Home,         group: 'primary' },
  { href: '/portal',       labelKey: 'nav.portals',      icon: Globe,        group: 'primary' },
  { href: '/patients',     labelKey: 'nav.patients',     icon: Users,        group: 'primary' },
  { href: '/appointments', labelKey: 'nav.appointments', icon: CalendarDays, group: 'primary' },
  { href: '/eligibility',  labelKey: 'nav.eligibility',  icon: ShieldCheck,  group: 'primary' },
  { href: '/claims',       labelKey: 'nav.claims',       icon: ClipboardList,group: 'primary' },
  { href: '/providers',    labelKey: 'nav.providers',    icon: Hospital,     group: 'primary' },

  { href: '/basma',      labelKey: 'nav.basma',      icon: Mic,        group: 'portal', hint: 'AI voice concierge' },
  { href: '/givc',   labelKey: 'nav.givc',   icon: Stethoscope, group: 'portal', hint: 'Provider clinical workstation' },
  { href: '/sbs',    labelKey: 'nav.sbs',    icon: CreditCard,  group: 'portal', hint: 'Saudi billing & RCM' },
  { href: '/nphies', labelKey: 'nav.nphies', icon: Building2,   group: 'portal', hint: 'Insurance exchange' },
  { href: '/homecare',   labelKey: 'nav.homecare',   icon: HeartPulse, group: 'portal', hint: 'Home visits' },
  { href: '/telehealth', labelKey: 'nav.telehealth', icon: Video,      group: 'portal', hint: 'Virtual consults' },

  { href: '/integrations', labelKey: 'nav.integrations', icon: Link2,    group: 'secondary' },
  { href: '/workflows',    labelKey: 'nav.workflows',    icon: Workflow, group: 'secondary' },
  { href: '/knowledge',    labelKey: 'nav.knowledge',    icon: BookOpen, group: 'secondary' },
  { href: '/stitch',       labelKey: 'nav.stitch',       icon: Sparkles, group: 'secondary' },
  { href: '/github',       labelKey: 'nav.github',       icon: Github,   group: 'secondary' },
]

export const PRIMARY_NAV  = NAV.filter(n => n.group === 'primary').slice(0, 7)
export const PORTAL_NAV   = NAV.filter(n => n.group === 'portal')
export const SECONDARY_NAV = NAV.filter(n => n.group === 'secondary')
