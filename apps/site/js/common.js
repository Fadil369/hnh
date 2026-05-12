/* ============================================
   HAYAT NATIONAL HOSPITALS — Common JS
   Shared header/footer, language, utilities
   ============================================ */

(function() {
  'use strict';

  // ===== TRANSLATIONS =====
  const translations = {
    ar: {
      dir: 'rtl',
      lang: 'ar',
      siteName: 'مستشفيات الحياة الوطني',
      siteNameEn: 'Hayat National Hospitals',
      nav: {
        home: 'الرئيسية',
        about: 'عن المجموعة',
        departments: 'الأقسام الطبية',
        doctors: 'أطباؤنا',
        branches: 'فروعنا',
        blog: 'المدونة',
        achievements: 'الإنجازات',
        academy: 'أكاديمية الحياة',
        contact: 'اتصل بنا',
        careers: 'التوظيف',
        offers: 'العروض'
      },
      hero: {
        title: 'رعاية صحية <span>بمعايير عالمية</span>',
        subtitle: 'منذ أكثر من 25 عامًا، نقدم خدمات طبية متميزة في مختلف أنحاء المملكة العربية السعودية بأعلى معايير الجودة والسلامة',
        bookBtn: 'احجز موعدك الآن',
        deptBtn: 'تعرف على أقسامنا',
        stat1Label: 'طبيب',
        stat2Label: 'سرير',
        stat3Label: 'موظف',
        stat4Label: 'عيادة خارجية'
      },
      stats: {
        doctors: 'طبيب',
        beds: 'سرير',
        employees: 'موظف',
        clinics: 'عيادة خارجية',
        surgeries: 'عملية جراحية سنوياً',
        nurses: 'ممرض',
        branches: 'فروع',
        visits: 'زيارة سنوياً'
      },
      about: {
        title: 'عن مستشفيات الحياة الوطني',
        subtitle: 'أكثر من عقدين من التميز في الرعاية الصحية المتكاملة',
        desc1: 'تأسست مجموعة مستشفيات الحياة الوطني عام 1999 على يد الشيخ محمد بن ناصر بن جار الله، وتديرها شركة الإنماء للخدمات الطبية. نقدم خدمات طبية متكاملة عبر شبكة من المستشفيات المتخصصة في مختلف مناطق المملكة.',
        desc2: 'نسعى دائمًا لتطوير وتحديث خدماتنا للوصول إلى أعلى مستويات التطوير في مجال الرعاية الصحية، مع تطبيق أعلى المواصفات والمعايير الدولية في الجودة والسلامة.',
        feature1: 'جودة عالمية',
        feature2: 'كوادر طبية مؤهلة',
        feature3: 'تقنيات حديثة',
        feature4: 'رعاية متميزة',
        moreBtn: 'المزيد عن المجموعة'
      },
      departments: {
        title: 'أقسامنا الطبية',
        subtitle: 'نغطي أكثر من 30 تخصصًا طبيًا لخدمة صحتكم',
        viewAll: 'عرض جميع الأقسام'
      },
      branches: {
        title: 'فروعنا',
        subtitle: 'خمسة فروع في مختلف مناطق المملكة لخدمتكم',
        viewAll: 'عرض جميع الفروع'
      },
      doctors: {
        title: 'أطباؤنا',
        subtitle: 'فريق من أمهر الأطباء والاستشاريين',
        viewAll: 'عرض جميع الأطباء',
        bookNow: 'احجز الآن'
      },
      cta: {
        title: 'صحتك أولاً',
        subtitle: 'احجز موعدك الآن واحصل على أفضل رعاية طبية',
        bookBtn: 'احجز موعد',
        callBtn: 'اتصل بنا'
      },
      footer: {
        desc: 'مجموعة مستشفيات الحياة الوطني — أكثر من 25 عامًا من التميز في الرعاية الصحية المتكاملة في المملكة العربية السعودية.',
        quickLinks: 'روابط سريعة',
        services: 'خدماتنا',
        contact: 'تواصل معنا',
        homeHealth: 'الرعاية المنزلية',
        insurance: 'التغطية التأمينية',
        installments: 'خدمة التقسيط',
        complaints: 'الشكاوى والمقترحات',
        feedback: 'تقييم زيارتك',
        app: 'تطبيق الجوال',
        rights: 'جميع الحقوق محفوظة',
        privacy: 'سياسة الخصوصية',
        terms: 'الشروط والأحكام'
      },
      chat: {
        title: 'مساعدك الصحي',
        subtitle: 'متصل',
        welcome: 'مرحبًا! أنا مساعدك الصحي الذكي من مستشفيات الحياة الوطني. كيف يمكنني مساعدتك اليوم؟',
        placeholder: 'اكتب رسالتك...',
        suggestions: [
          'ما هي الأقسام الطبية لديكم؟',
          'كيف أحجز موعد؟',
          'ما هي شركات التأمين المقبولة؟',
          'أخبرني عن أكاديمية الحياة'
        ],
        responses: {
          departments: 'لدينا أكثر من 30 تخصصًا طبيًا تشمل: القلب، العظام، الأطفال، النساء والولادة، الجلدية، العيون، المسالك البولية، الأعصاب، الباطنية، وأقسام أخرى كثيرة. هل تريد معرفة المزيد عن قسم معين؟',
          appointment: 'يمكنك حجز موعد عبر عدة طرق:\n1. عبر تطبيق الجوال\n2. عبر موقعنا الإلكتروني\n3. الاتصال المباشر على 966920000094\n\nما القسم الذي تريد الحجز فيه؟',
          insurance: 'نتعامل مع多家شركات تأمين تشمل:\n- تكافل الراجحي\n- أكسا للتأمين التعاوني\n- وشركات تأمين أخرى\n\nيمكنك التحقق من تغطية تأمينك عبر نموذج التأمين في موقعنا.',
          academy: 'أكاديمية الحياة للتطوير المهني تقدم برامج تدريبية بالتعاون مع الهيئة السعودية للتخصصات الصحية. تهدف إلى تدريب وتأهيل الكوادر الصحية وفقًا لأعلى المعايير الدولية.',
          default: 'شكرًا لتواصلك! يمكنك السؤال عن أقسامنا الطبية، حجز المواعد، التأمين، أو أي موضوع صحي آخر. كيف يمكنني مساعدتك؟'
        }
      },
      finder: {
        title: 'الباحث عن القسم المناسب',
        subtitle: 'أخبرنا عن أعراضك وسنقترح لك القسم المناسب',
        q1: 'ما المنطقة التي تشعر بألم أو不适؟',
        head: 'الرأس والرأس',
        chest: 'الصدر والتنفس',
        stomach: 'المعدة والجهاز الهضمي',
        bones: 'العظام والمفاصل',
        skin: 'الجلد والبشرة',
        general: 'أعراض عامة',
        q2: 'ما نوع الأعراض؟',
        pain: 'ألم',
        chronic: 'مزمنة',
        acute: 'حادة',
        skin_sym: 'جلدية',
        result: 'القسم المقترح',
        bookBtn: 'احجز موعد في هذا القسم',
        resetBtn: 'ابحث مرة أخرى'
      },
      appointment: {
        title: 'احجز موعدك',
        subtitle: 'اختر القسم والفرع والوقت المناسب لك',
        dept: 'القسم الطبي',
        branch: 'الفرع',
        doctor: 'الطبيب',
        date: 'التاريخ',
        time: 'الوقت',
        name: 'الاسم الكامل',
        phone: 'رقم الجوال',
        email: 'البريد الإلكتروني',
        notes: 'ملاحظات إضافية',
        submit: 'تأكيد الحجز',
        selectDept: 'اختر القسم',
        selectBranch: 'اختر الفرع',
        selectDoctor: 'اختر الطبيب',
        selectDate: 'اختر التاريخ',
        selectTime: 'اختر الوقت'
      },
      contact: {
        title: 'اتصل بنا',
        subtitle: 'نحن هنا لمساعدتك في أي وقت',
        formTitle: 'أرسل لنا رسالة',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الجوال',
        subject: 'الموضوع',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        infoTitle: 'معلومات التواصل',
        phoneLabel: 'الهاتف',
        emailLabel: 'البريد الإلكتروني',
        addressLabel: 'العنوان',
        hoursLabel: 'ساعات العمل'
      }
    },
    en: {
      dir: 'ltr',
      lang: 'en',
      siteName: 'Hayat National Hospitals',
      siteNameEn: 'مجموعة مستشفيات الحياة الوطني',
      nav: {
        home: 'Home',
        about: 'About',
        departments: 'Departments',
        doctors: 'Doctors',
        branches: 'Branches',
        blog: 'Blog',
        achievements: 'Achievements',
        academy: 'Academy',
        contact: 'Contact',
        careers: 'Careers',
        offers: 'Offers'
      },
      hero: {
        title: 'Healthcare with <span>Global Standards</span>',
        subtitle: 'For over 25 years, we have been providing distinguished medical services across the Kingdom of Saudi Arabia with the highest quality and safety standards',
        bookBtn: 'Book Your Appointment',
        deptBtn: 'Explore Our Departments',
        stat1Label: 'Doctors',
        stat2Label: 'Beds',
        stat3Label: 'Employees',
        stat4Label: 'Outpatient Clinics'
      },
      stats: {
        doctors: 'Doctors',
        beds: 'Beds',
        employees: 'Employees',
        clinics: 'Outpatient Clinics',
        surgeries: 'Surgeries per Year',
        nurses: 'Nurses',
        branches: 'Branches',
        visits: 'Visits per Year'
      },
      about: {
        title: 'About Hayat National Hospitals',
        subtitle: 'Over two decades of excellence in integrated healthcare',
        desc1: 'Hayat National Hospitals Group was established in 1999 by A. Mohammed bin Nasser bin Jar Allah, operated by Al-Inmaa Medical Services Company. We provide integrated medical services through a network of specialized hospitals across the Kingdom.',
        desc2: 'We constantly strive to develop and modernize our services to reach the highest levels of healthcare development, applying the highest international standards in quality and safety.',
        feature1: 'Global Quality',
        feature2: 'Qualified Medical Staff',
        feature3: 'Modern Technology',
        feature4: 'Distinguished Care',
        moreBtn: 'Learn More About Us'
      },
      departments: {
        title: 'Our Medical Departments',
        subtitle: 'Covering 30+ medical specialties for your health',
        viewAll: 'View All Departments'
      },
      branches: {
        title: 'Our Branches',
        subtitle: 'Five branches across the Kingdom to serve you',
        viewAll: 'View All Branches'
      },
      doctors: {
        title: 'Our Doctors',
        subtitle: 'A team of skilled doctors and consultants',
        viewAll: 'View All Doctors',
        bookNow: 'Book Now'
      },
      cta: {
        title: 'Your Health First',
        subtitle: 'Book your appointment now and get the best medical care',
        bookBtn: 'Book Appointment',
        callBtn: 'Call Us'
      },
      footer: {
        desc: 'Hayat National Hospitals Group — Over 25 years of excellence in integrated healthcare in the Kingdom of Saudi Arabia.',
        quickLinks: 'Quick Links',
        services: 'Our Services',
        contact: 'Contact Us',
        homeHealth: 'Home Healthcare',
        insurance: 'Insurance Coverage',
        installments: 'Installment Plans',
        complaints: 'Complaints & Suggestions',
        feedback: 'Review Your Visit',
        app: 'Mobile App',
        rights: 'All Rights Reserved',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions'
      },
      chat: {
        title: 'Health Assistant',
        subtitle: 'Online',
        welcome: 'Hello! I am your smart health assistant from Hayat National Hospitals. How can I help you today?',
        placeholder: 'Type your message...',
        suggestions: [
          'What departments do you have?',
          'How do I book an appointment?',
          'What insurance do you accept?',
          'Tell me about Hayat Academy'
        ],
        responses: {
          departments: 'We have 30+ medical specialties including: Cardiology, Orthopedics, Pediatrics, OB/GYN, Dermatology, Ophthalmology, Urology, Neurology, Internal Medicine, and many more. Would you like to know about a specific department?',
          appointment: 'You can book an appointment through:\n1. Mobile App\n2. Our website\n3. Direct call: 966920000094\n\nWhich department would you like to book?',
          insurance: 'We work with multiple insurance providers including:\n- Takaful Al Rajhi\n- AXA Cooperative Insurance\n- And other providers\n\nYou can verify your insurance coverage through our website form.',
          academy: 'Hayat Academy for Professional Development offers training programs in collaboration with the Saudi Commission for Health Specialties, aiming to train and qualify healthcare professionals to the highest international standards.',
          default: 'Thank you for reaching out! You can ask about our departments, appointments, insurance, or any health topic. How can I help you?'
        }
      },
      finder: {
        title: 'Find the Right Department',
        subtitle: 'Tell us your symptoms and we will suggest the right department',
        q1: 'Which area are you experiencing discomfort?',
        head: 'Head & Neck',
        chest: 'Chest & Breathing',
        stomach: 'Stomach & Digestive',
        bones: 'Bones & Joints',
        skin: 'Skin & Dermatology',
        general: 'General Symptoms',
        q2: 'What type of symptoms?',
        pain: 'Pain',
        chronic: 'Chronic',
        acute: 'Acute',
        skin_sym: 'Skin-related',
        result: 'Suggested Department',
        bookBtn: 'Book in This Department',
        resetBtn: 'Search Again'
      },
      appointment: {
        title: 'Book Your Appointment',
        subtitle: 'Choose the department, branch, and time that suits you',
        dept: 'Medical Department',
        branch: 'Branch',
        doctor: 'Doctor',
        date: 'Date',
        time: 'Time',
        name: 'Full Name',
        phone: 'Phone Number',
        email: 'Email',
        notes: 'Additional Notes',
        submit: 'Confirm Booking',
        selectDept: 'Select Department',
        selectBranch: 'Select Branch',
        selectDoctor: 'Select Doctor',
        selectDate: 'Select Date',
        selectTime: 'Select Time'
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'We are here to help you anytime',
        formTitle: 'Send Us a Message',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        infoTitle: 'Contact Information',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        addressLabel: 'Address',
        hoursLabel: 'Working Hours'
      }
    }
  };

  // ===== STATE =====
  let currentLang = localStorage.getItem('hnh-lang') || 'ar';
  let currentT = translations[currentLang];

  // ===== LANGUAGE FUNCTIONS =====
  function getT(key) {
    const keys = key.split('.');
    let val = currentT;
    for (const k of keys) {
      if (val && val[k] !== undefined) val = val[k];
      else return key;
    }
    return val;
  }

  function setLanguage(lang) {
    currentLang = lang;
    currentT = translations[lang];
    localStorage.setItem('hnh-lang', lang);
    document.documentElement.dir = currentT.dir;
    document.documentElement.lang = currentT.lang;
    updatePageContent();
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'ar' ? 'en' : 'ar');
  }

  function updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getT(key);
      if (typeof val === 'string') {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });
    // Update lang switch button
    const langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
      langBtn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
    }
  }

  // ===== HEADER INJECTION =====
  function injectHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <div class="container">
        <a href="index.html" class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="logo-text">
            <span class="name-ar" data-i18n="siteName">مستشفيات الحياة الوطني</span>
            <span class="name-en" data-i18n="siteNameEn">Hayat National Hospitals</span>
          </div>
        </a>
        <nav class="nav-menu" id="navMenu">
          <a href="index.html" data-i18n="nav.home">الرئيسية</a>
          <a href="about.html" data-i18n="nav.about">عن المجموعة</a>
          <a href="departments.html" data-i18n="nav.departments">الأقسام الطبية</a>
          <a href="doctors.html" data-i18n="nav.doctors">أطباؤنا</a>
          <a href="branches.html" data-i18n="nav.branches">فروعنا</a>
          <a href="blog.html" data-i18n="nav.blog">المدونة</a>
          <a href="achievements.html" data-i18n="nav.achievements">الإنجازات</a>
          <a href="academy.html" data-i18n="nav.academy">أكاديمية الحياة</a>
          <a href="careers.html" data-i18n="nav.careers">التوظيف</a>
          <a href="contact.html" data-i18n="nav.contact">اتصل بنا</a>
        </nav>
        <div class="header-actions">
          <button class="lang-switch" onclick="HNH.toggleLanguage()">EN</button>
          <a href="contact.html" class="btn btn-primary btn-sm" data-i18n="nav.contact">اتصل بنا</a>
          <div class="mobile-toggle" id="mobileToggle" onclick="HNH.toggleMobileMenu()">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
    document.body.prepend(header);

    // Highlight active nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('.nav-menu a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // Sticky header
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== FOOTER INJECTION =====
  function injectFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div class="logo-text">
                <span class="name-ar" data-i18n="siteName">مستشفيات الحياة الوطني</span>
                <span class="name-en" data-i18n="siteNameEn">Hayat National Hospitals</span>
              </div>
            </a>
            <p data-i18n="footer.desc">مجموعة مستشفيات الحياة الوطني — أكثر من 25 عامًا من التميز في الرعاية الصحية المتكاملة في المملكة العربية السعودية.</p>
            <div class="footer-social">
              <a href="https://www.facebook.com/hnhgrooup" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/hnhgrooup" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="white" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
              </a>
              <a href="https://twitter.com/hnhgrooup" target="_blank" rel="noopener" aria-label="Twitter">
                <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/hayat-national-hospitals-6b935329a/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCueDME1ckhHWNJOtT41n4XQ" target="_blank" rel="noopener" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 data-i18n="footer.quickLinks">روابط سريعة</h4>
            <div class="footer-links">
              <a href="about.html" data-i18n="nav.about">عن المجموعة</a>
              <a href="departments.html" data-i18n="nav.departments">الأقسام الطبية</a>
              <a href="doctors.html" data-i18n="nav.doctors">أطباؤنا</a>
              <a href="branches.html" data-i18n="nav.branches">فروعنا</a>
              <a href="achievements.html" data-i18n="nav.achievements">الإنجازات</a>
              <a href="academy.html" data-i18n="nav.academy">أكاديمية الحياة</a>
            </div>
          </div>
          <div>
            <h4 data-i18n="footer.services">خدماتنا</h4>
            <div class="footer-links">
              <a href="careers.html" data-i18n="nav.careers">التوظيف</a>
              <a href="offers.html" data-i18n="nav.offers">العروض</a>
              <a href="#" data-i18n="footer.homeHealth">الرعاية المنزلية</a>
              <a href="#" data-i18n="footer.insurance">التغطية التأمينية</a>
              <a href="#" data-i18n="footer.installments">خدمة التقسيط</a>
              <a href="#" data-i18n="footer.app">تطبيق الجوال</a>
            </div>
          </div>
          <div>
            <h4 data-i18n="footer.contact">تواصل معنا</h4>
            <div class="footer-links">
              <a href="tel:966920000094">966920000094+</a>
              <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
              <a href="contact.html" data-i18n="footer.complaints">الشكاوى والمقترحات</a>
              <a href="contact.html" data-i18n="footer.feedback">تقييم زيارتك</a>
              <a href="blog.html" data-i18n="nav.blog">المدونة</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} <span data-i18n="siteName">مستشفيات الحياة الوطني</span>. <span data-i18n="footer.rights">جميع الحقوق محفوظة</span></span>
          <div class="footer-bottom-links">
            <a href="#" data-i18n="footer.privacy">سياسة الخصوصية</a>
            <a href="#" data-i18n="footer.terms">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  // ===== FLOATING ELEMENTS =====
  function injectFloatingElements() {
    // WhatsApp button
    const wa = document.createElement('a');
    wa.href = 'https://wa.me/966920000094';
    wa.target = '_blank';
    wa.className = 'whatsapp-btn';
    wa.setAttribute('aria-label', 'WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(wa);

    // Back to top
    const btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.setAttribute('aria-label', 'Back to top');
    btt.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>';
    btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btt);

    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // ===== CHAT WIDGET =====
  function injectChatWidget() {
    // Skip if premium Basma widget is present
    if (document.getElementById('basmaWidget')) return;
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
      <div class="chat-panel" id="chatPanel">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="avatar">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div>
              <h4 data-i18n="chat.title">مساعدك الصحي</h4>
              <span class="status" data-i18n="chat.subtitle">متصل</span>
            </div>
          </div>
          <button class="chat-close" onclick="HNH.toggleChat()">
            <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" fill="none"/></svg>
          </button>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="chat-msg bot" data-i18n="chat.welcome">مرحبًا! أنا مساعدك الصحي الذكي من مستشفيات الحياة الوطني. كيف يمكنني مساعدتك اليوم؟</div>
        </div>
        <div class="chat-suggestions" id="chatSuggestions"></div>
        <div class="chat-input-area">
          <input type="text" id="chatInput" data-i18n="chat.placeholder" placeholder="اكتب رسالتك..." onkeypress="if(event.key==='Enter')HNH.sendChatMsg()">
          <button onclick="HNH.sendChatMsg()">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
      <button class="chat-toggle" onclick="HNH.toggleChat()">
        <span class="pulse"></span>
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M12 10c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/></svg>
      </button>
    `;
    document.body.appendChild(widget);

    // Populate suggestions
    setTimeout(() => {
      const sugContainer = document.getElementById('chatSuggestions');
      if (sugContainer) {
        const suggestions = getT('chat.suggestions');
        if (Array.isArray(suggestions)) {
          sugContainer.innerHTML = suggestions.map(s =>
            `<button class="chat-suggestion" onclick="HNH.handleSuggestion('${s}')">${s}</button>`
          ).join('');
        }
      }
    }, 100);
  }

  // ===== CHAT LOGIC =====
  function toggleChat() {
    const panel = document.getElementById('chatPanel');
    if (panel) panel.classList.toggle('active');
  }

  function sendChatMsg() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    if (!input || !messages || !input.value.trim()) return;

    const userMsg = input.value.trim();
    messages.innerHTML += `<div class="chat-msg user">${escapeHtml(userMsg)}</div>`;
    input.value = '';

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;

    // Generate response
    setTimeout(() => {
      const response = generateChatResponse(userMsg);
      messages.innerHTML += `<div class="chat-msg bot">${response}</div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 800);
  }

  function handleSuggestion(text) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = text;
      sendChatMsg();
    }
  }

  function generateChatResponse(msg) {
    const lower = msg.toLowerCase();
    const ar = currentLang === 'ar';

    if (lower.includes('قسم') || lower.includes('department') || lower.includes('تخصص') || lower.includes('specialt')) {
      return getT('chat.responses.departments');
    }
    if (lower.includes('حجز') || lower.includes('موعد') || lower.includes('book') || lower.includes('appointment')) {
      return getT('chat.responses.appointment');
    }
    if (lower.includes('تأمين') || lower.includes('insurance') || lower.includes('تكافل')) {
      return getT('chat.responses.insurance');
    }
    if (lower.includes('أكاديمية') || lower.includes('academy') || lower.includes('تدريب')) {
      return getT('chat.responses.academy');
    }
    return getT('chat.responses.default');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ===== MOBILE MENU =====
  function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileToggle');
    if (menu) menu.classList.toggle('active');
    if (toggle) toggle.classList.toggle('active');
  }

  // ===== DEPARTMENT FINDER =====
  const deptMapping = {
    head: { pain: 'ال大脑 والأعصاب', chronic: 'الأنف والأذن والحنجرة', acute: 'ال大脑 والأعصاب', skin_sym: 'الجلدية' },
    chest: { pain: 'الصدرية', chronic: 'الصدرية', acute: 'القلب', skin_sym: 'الحساسية' },
    stomach: { pain: 'الباطنية', chronic: 'الباطنية', acute: 'الجراحة العامة', skin_sym: 'التغذية' },
    bones: { pain: 'العظام', chronic: 'العلاج الطبيعي', acute: 'العظام', skin_sym: 'الروماتيزم' },
    skin: { pain: 'الجلدية', chronic: 'الجلدية', acute: 'الحساسية', skin_sym: 'الجلدية' },
    general: { pain: 'الطب العام', chronic: 'الباطنية', acute: 'الطوارئ', skin_sym: 'الجلدية' }
  };

  const deptMappingEn = {
    head: { pain: 'Neurology', chronic: 'ENT', acute: 'Neurology', skin_sym: 'Dermatology' },
    chest: { pain: 'Pulmonology', chronic: 'Pulmonology', acute: 'Cardiology', skin_sym: 'Allergy' },
    stomach: { pain: 'Internal Medicine', chronic: 'Internal Medicine', acute: 'General Surgery', skin_sym: 'Nutrition' },
    bones: { pain: 'Orthopedics', chronic: 'Physical Therapy', acute: 'Orthopedics', skin_sym: 'Rheumatology' },
    skin: { pain: 'Dermatology', chronic: 'Dermatology', acute: 'Allergy', skin_sym: 'Dermatology' },
    general: { pain: 'General Medicine', chronic: 'Internal Medicine', acute: 'Emergency', skin_sym: 'Dermatology' }
  };

  let finderStep = 1;
  let finderArea = '';

  function openFinder() {
    const overlay = document.getElementById('finderOverlay');
    if (overlay) {
      overlay.classList.add('active');
      resetFinder();
    }
  }

  function closeFinder() {
    const overlay = document.getElementById('finderOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  function resetFinder() {
    finderStep = 1;
    finderArea = '';
    showFinderStep(1);
  }

  function showFinderStep(step) {
    document.querySelectorAll('.finder-step').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('finderStep' + step);
    if (el) el.classList.add('active');
  }

  function selectFinderArea(area) {
    finderArea = area;
    finderStep = 2;
    showFinderStep(2);
  }

  function selectFinderType(type) {
    const mapping = currentLang === 'ar' ? deptMapping : deptMappingEn;
    const dept = mapping[finderArea]?.[type] || (currentLang === 'ar' ? 'الطب العام' : 'General Medicine');
    const resultEl = document.getElementById('finderResult');
    if (resultEl) resultEl.textContent = dept;
    finderStep = 3;
    showFinderStep(3);
  }

  // ===== SMOOTH SCROLL =====
  function smoothScroll(target) {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== TOAST =====
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 24px;
      z-index: 3000;
      padding: 16px 24px;
      background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
      color: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      font-weight: 500;
      max-width: 400px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== INIT =====
  function init() {
    // Set initial language
    document.documentElement.dir = currentT.dir;
    document.documentElement.lang = currentT.lang;

    // Inject shared elements
    injectHeader();
    injectFooter();
    injectFloatingElements();
    injectChatWidget();

    // Init animations
    setTimeout(() => {
      initScrollAnimations();
      animateCounters();
      updatePageContent();
    }, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===== PUBLIC API =====
  window.HNH = {
    toggleLanguage,
    setLanguage,
    getT,
    toggleMobileMenu,
    toggleChat,
    sendChatMsg,
    handleSuggestion,
    openFinder,
    closeFinder,
    selectFinderArea,
    selectFinderType,
    resetFinder,
    smoothScroll,
    showToast,
    currentLang: () => currentLang,

    // ===== BASMA VOICE AGENT =====
    basmaToggle,
    basmaMinimize,
    basmaSend,
    basmaToggleVoice,
  };

  // ===== BASMA VOICE AGENT INTEGRATION =====
  var basmaAgent = null;
  var basmaOrb = null;
  var basmaWaveformInstance = null;
  var basmaInitialized = false;
  var basmaIsOpen = false;
  var basmaIsListening = false;

  function initBasma() {
    if (basmaInitialized || typeof HNH.createOrb !== 'function') return;
    basmaInitialized = true;

    // Create mini orb (header)
    try {
      basmaOrb = HNH.createOrb(document.getElementById('basmaMiniOrb') || document.getElementById('basmaToggleOrb'), {
        colors: ['#0066CC', '#C9A84C'],
        size: 44,
        speed: 0.8,
      });
    } catch(e) {}

    // Create main orb
    try {
      const mainOrbCanvas = document.getElementById('basmaMainOrb');
      if (mainOrbCanvas && mainOrbCanvas.parentNode) {
        basmaOrb = HNH.createOrb(mainOrbCanvas.parentNode, {
          colors: ['#0066CC', '#C9A84C'],
          size: 80,
          speed: 0.6,
        });
      }
    } catch(e) {}

    // Initialize waveform
    try {
      const waveformContainer = document.getElementById('basmaWaveformContainer');
      if (waveformContainer && typeof HNH.createWaveform === 'function') {
        basmaWaveformInstance = HNH.createWaveform(waveformContainer, {
          mode: 'static',
          primaryColor: '#0066CC',
          accentColor: '#C9A84C',
          barCount: 48,
        });
      }
    } catch(e) {}

    // Initialize agent
    if (typeof HNH.createAgent === 'function') {
      basmaAgent = HNH.createAgent({
        lang: currentLang,
      });

      // Listen for state changes → update orb
      basmaAgent.onStateChange(function(state) {
        updateBasmaUI(state);
      });

      // Listen for transcripts (user messages)
      basmaAgent.onTranscript(function(text, role) {
        if (role === 'user') {
          addBasmaMessage(text, 'user');
        }
      });

      // Listen for volume changes → update waveform
      basmaAgent.onVolume(function(inputVol, outputVol) {
        if (basmaWaveformInstance && basmaWaveformInstance.isActive) {
          basmaWaveformInstance.setVolume(Math.max(inputVol || 0, outputVol || 0));
        }
        if (basmaOrb) {
          basmaOrb.setInputVolume(inputVol || 0);
          basmaOrb.setOutputVolume(outputVol || 0);
        }
      });

      // Listen for replies (assistant messages)
      basmaAgent.onReply(function(text, role) {
        if (role === 'system') {
          addBasmaMessage(text, 'system');
        } else {
          addBasmaMessage(text, 'assistant');
        }
      });

      // Connect agent state changes to waveform
      basmaAgent.onStateChange(function(state) {
        if (basmaWaveformInstance) {
          if (state === 'listening') {
            basmaWaveformInstance.setProcessing(true);
            basmaWaveformInstance.start(new Promise(function(resolve) {
              // Try connecting mic stream
              navigator.mediaDevices.getUserMedia({ audio: true }).then(resolve).catch(function() {
                // If no mic, just show idle
                basmaWaveformInstance.setProcessing(false);
              });
            }));
          } else if (state === 'talking' || state === 'thinking') {
            basmaWaveformInstance.setProcessing(true);
          } else {
            basmaWaveformInstance.setProcessing(false);
          }
        }
      });
    }

    updateBasmaStatusUI();
  }

  function updateBasmaUI(state) {
    var dot = document.getElementById('basmaStatusDot');
    var statusText = document.getElementById('basmaStatusText');
    var innerOrb = document.querySelector('.basma-orb-display .inner-orb');
    var toggleBtn = document.getElementById('basmaToggle');

    if (!dot || !statusText) return;

    // Update dot
    dot.className = 'status-dot';
    if (state === 'listening') {
      dot.classList.add('listening');
      statusText.textContent = currentLang === 'ar' ? 'جاري الاستماع...' : 'Listening...';
      if (toggleBtn) toggleBtn.classList.add('listening');
    } else if (state === 'thinking') {
      dot.classList.add('thinking');
      statusText.textContent = currentLang === 'ar' ? 'جاري التفكير...' : 'Thinking...';
      if (toggleBtn) toggleBtn.classList.remove('listening');
    } else if (state === 'talking') {
      dot.classList.add('talking');
      statusText.textContent = currentLang === 'ar' ? 'جاري التحدث...' : 'Speaking...';
      if (toggleBtn) toggleBtn.classList.remove('listening');
    } else if (state === 'connected') {
      dot.classList.add('connected');
      statusText.textContent = currentLang === 'ar' ? 'متصل' : 'Connected';
      if (toggleBtn) toggleBtn.classList.remove('listening');
    } else if (state === 'error') {
      dot.classList.add('error');
      statusText.textContent = currentLang === 'ar' ? 'خطأ في الاتصال' : 'Connection error';
      if (toggleBtn) toggleBtn.classList.remove('listening');
    } else {
      dot.classList.add('disconnected');
      statusText.textContent = currentLang === 'ar' ? 'غير متصل' : 'Disconnected';
      if (toggleBtn) toggleBtn.classList.remove('listening');
    }

    // Update inner orb glow
    if (innerOrb) {
      innerOrb.className = 'inner-orb';
      if (state === 'listening') innerOrb.classList.add('listening');
      else if (state === 'talking') innerOrb.classList.add('talking');
      else if (state === 'thinking') innerOrb.classList.add('thinking');
    }

    // Update orb animation state
    if (basmaOrb) {
      var orbState = 'idle';
      if (state === 'listening') orbState = 'listening';
      else if (state === 'thinking') orbState = 'thinking';
      else if (state === 'talking') orbState = 'talking';
      basmaOrb.setState(orbState);

      // Set volumes from agent
      if (basmaAgent) {
        basmaOrb.setInputVolume(basmaAgent.getInputVolume ? basmaAgent.getInputVolume() : 0);
        basmaOrb.setOutputVolume(basmaAgent.getOutputVolume ? basmaAgent.getOutputVolume() : 0);
      }
    }

    updateBasmaStatusUI();
  }

  function updateBasmaStatusUI() {
    var suggestions = document.getElementById('basmaSuggestions');
    if (!suggestions) return;
    var titleEl = document.getElementById('basmaTitle');
    if (titleEl) {
      titleEl.textContent = currentLang === 'ar' ? 'بسمة — مساعدك الصحي' : 'Basma — Your Health Assistant';
    }

    // Update placeholder and suggestions based on language
    var input = document.getElementById('basmaInput');
    if (input) {
      input.placeholder = currentLang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...';
    }

    var sugTexts = currentLang === 'ar'
      ? ['ما هي الأقسام الطبية؟', 'كيف أحجز موعد؟', 'ما هي شركات التأمين؟', 'أخبرني عن الأكاديمية']
      : ['What departments?', 'How to book?', 'Insurance info?', 'About the Academy'];

    suggestions.innerHTML = sugTexts.map(function(s) {
      return '<button class="basma-suggestion-btn" onclick="HNH.basmaSendSuggestion(\'' + s.replace(/'/g, "\\'") + '\')">' + s + '</button>';
    }).join('');
  }

  function basmaToggle() {
    var panel = document.getElementById('basmaPanel');
    if (!panel) return;

    basmaIsOpen = !panel.classList.contains('active');
    panel.classList.toggle('active');

    if (basmaIsOpen) {
      // Initialize on first open
      initBasma();

      // Connect agent
      if (basmaAgent && !basmaAgent.isConnected()) {
        basmaAgent.connect();
        addBasmaMessage(
          currentLang === 'ar'
            ? 'السلام عليكم! أنا بسمة، مساعدك الصحي الذكي من مستشفيات الحياة الوطني. كيف يمكنني مساعدتك اليوم؟'
            : 'Welcome! I\'m Basma, your smart health assistant from Hayat National Hospitals. How can I help you today?',
          'system'
        );
      }

      // Focus input
      setTimeout(function() {
        var input = document.getElementById('basmaInput');
        if (input) input.focus();
      }, 400);
    }
  }

  function basmaMinimize() {
    var panel = document.getElementById('basmaPanel');
    if (panel) panel.classList.remove('active');
    basmaIsOpen = false;

    // Stop listening when minimizing
    if (basmaIsListening) {
      basmaToggleVoice();
    }
  }

  function basmaSend() {
    var input = document.getElementById('basmaInput');
    if (!input || !input.value.trim()) return;

    var text = input.value.trim();
    input.value = '';

    addBasmaMessage(text, 'user');

    if (basmaAgent) {
      basmaAgent.sendText(text);
    }
  }

  function basmaSendSuggestion(text) {
    addBasmaMessage(text, 'user');
    if (basmaAgent) {
      basmaAgent.sendText(text);
    }
    // Scroll to bottom
    var msgs = document.getElementById('basmaMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function basmaToggleVoice() {
    if (!basmaAgent) return;

    var micBtn = document.getElementById('basmaMicBtn');

    if (basmaIsListening) {
      basmaAgent.stopListening();
      basmaIsListening = false;
      if (micBtn) micBtn.classList.remove('active');
    } else {
      basmaAgent.startListening().then(function(success) {
        basmaIsListening = success;
        if (micBtn && success) micBtn.classList.add('active');
      });
    }
  }

  function addBasmaMessage(text, role) {
    var messages = document.getElementById('basmaMessages');
    if (!messages) return;

    // Remove typing indicator
    var typing = messages.querySelector('.typing-msg');
    if (typing) typing.remove();

    var div = document.createElement('div');
    div.className = 'basma-msg ' + role;

    if (role === 'assistant') {
      div.innerHTML = '<span>' + escapeHtml(text) + '</span><button class="basma-copy-btn" onclick="copyToClipboard(this)" title="' + (currentLang === 'ar' ? 'نسخ' : 'Copy') + '"><svg viewBox="0 0 24 24" width="12" height="12"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg></button>';
    } else if (role === 'system') {
      div.innerHTML = escapeHtml(text);
    } else {
      div.innerHTML = escapeHtml(text);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function basmaShowTyping() {
    var messages = document.getElementById('basmaMessages');
    if (!messages) return;

    var typing = messages.querySelector('.typing-msg');
    if (typing) return;

    var div = document.createElement('div');
    div.className = 'basma-msg assistant typing-msg';
    div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function copyToClipboard(btn) {
    var text = btn.parentNode.querySelector('span')?.textContent || btn.parentNode.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(function(){});
    }
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>';
    setTimeout(function() {
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>';
    }, 2000);
  }

  // Expose additional helpers
  HNH.basmaSendSuggestion = basmaSendSuggestion;
  HNH.basmaInit = initBasma;

})();
