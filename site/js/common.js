/* HNH API Client — Wired to live hnh.brainsait.org APIs */
const API_BASE = 'https://hnh.brainsait.org/api';

const HNH = {
  // Language management
  _lang: localStorage.getItem('hnh_lang') || 'ar',
  currentLang() { return this._lang; },
  setLang(lang) {
    this._lang = lang;
    localStorage.setItem('hnh_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
    });
  },

  // API fetcher with error handling
  async api(path, opts = {}) {
    try {
      const url = `${API_BASE}${path}`;
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...opts.headers },
        ...opts
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      return data;
    } catch (err) {
      console.error(`API ${path}:`, err);
      throw err;
    }
  },

  // GET helpers
  async getStats() { return this.api('/stats'); },
  async getBranches() { return this.api('/branches'); },
  async getProviders(params = '') { return this.api(`/providers${params}`); },
  async getPatients(params = '') { return this.api(`/patients${params}`); },
  async getAppointments(params = '') { return this.api(`/appointments${params}`); },
  async getClaims(params = '') { return this.api(`/claims${params}`); },

  // POST helpers
  async createPatient(data) {
    return this.api('/patients', { method: 'POST', body: JSON.stringify(data) });
  },
  async createAppointment(data) {
    return this.api('/appointments', { method: 'POST', body: JSON.stringify(data) });
  },

  // NPHIES integration
  async checkEligibility(memberId, payer) {
    return this.api('/nphies/eligibility', {
      method: 'POST',
      body: JSON.stringify({ member_id: memberId, payer })
    });
  },

  // Toast notification
  showToast(msg, type = 'success') {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.className = `toast ${type} show`;
    setTimeout(() => t.classList.remove('show'), 3500);
  }
};

// i18n strings
const I18N = {
  ar: {
    'nav.home': 'الرئيسية', 'nav.about': 'عن المجموعة', 'nav.departments': 'الأقسام الطبية',
    'nav.doctors': 'أطباؤنا', 'nav.branches': 'فروعنا', 'nav.contact': 'اتصل بنا',
    'nav.blog': 'المدونة', 'nav.achievements': 'الإنجازات', 'nav.academy': 'أكاديمية الحياة',
    'nav.careers': 'التوظيف', 'nav.offers': 'العروض', 'nav.book': 'احجز موعد',
    'cta.title': 'صحتك أولاً', 'cta.subtitle': 'احجز موعدك الآن واحصل على أفضل رعاية طبية',
    'cta.bookBtn': 'احجز موعد', 'cta.callBtn': 'اتصل بنا',
    'departments.title': 'الأقسام الطبية', 'doctors.title': 'أطباؤنا',
    'branches.title': 'فروعنا', 'contact.title': 'اتصل بنا',
    'loading': 'جاري التحميل...', 'noData': 'لا توجد بيانات',
    'form.name': 'الاسم الكامل', 'form.email': 'البريد الإلكتروني', 'form.phone': 'رقم الجوال',
    'form.branch': 'الفرع', 'form.message': 'رسالتك', 'form.submit': 'إرسال الرسالة',
    'form.select': 'اختر', 'form.success': 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    'form.appointment.success': 'تم حجز موعدك بنجاح!',
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.departments': 'Departments',
    'nav.doctors': 'Doctors', 'nav.branches': 'Branches', 'nav.contact': 'Contact',
    'nav.blog': 'Blog', 'nav.achievements': 'Achievements', 'nav.academy': 'Life Academy',
    'nav.careers': 'Careers', 'nav.offers': 'Offers', 'nav.book': 'Book Appointment',
    'cta.title': 'Your Health First', 'cta.subtitle': 'Book your appointment now and get the best medical care',
    'cta.bookBtn': 'Book Appointment', 'cta.callBtn': 'Call Us',
    'departments.title': 'Medical Departments', 'doctors.title': 'Our Doctors',
    'branches.title': 'Our Branches', 'contact.title': 'Contact Us',
    'loading': 'Loading...', 'noData': 'No data available',
    'form.name': 'Full Name', 'form.email': 'Email', 'form.phone': 'Phone',
    'form.branch': 'Branch', 'form.message': 'Your Message', 'form.submit': 'Send Message',
    'form.select': 'Select', 'form.success': 'Your message has been sent successfully!',
    'form.appointment.success': 'Your appointment has been booked successfully!',
  }
};

// Scroll animations observer
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));

  // Header scroll
  window.addEventListener('scroll', () => {
    document.querySelector('.header')?.classList.toggle('scrolled', window.scrollY > 50);
    const bt = document.querySelector('.back-top');
    if (bt) bt.classList.toggle('show', window.scrollY > 400);
  });

  // Mobile toggle
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav')?.classList.toggle('open');
  });

  // Set initial lang
  HNH.setLang(HNH._lang);
});
