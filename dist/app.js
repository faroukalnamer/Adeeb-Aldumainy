/**
 * أديب الدُميني — Phone Care
 * Full-Featured Interactive Web Application Logic
 */

// Initial default tickets if no server or storage
const DEFAULT_TICKETS = [
  {
    id: "AD-7091",
    customerName: "محمد عبد الله الشرعبي",
    phone: "771234567",
    deviceBrand: "Apple",
    deviceModel: "iPhone 13 Pro Max",
    color: "أزرق سييرا (Sierra Blue)",
    issueCategory: "screen",
    issueDescription: "كسر في الشاشة الخارجية والشاشة الداخلية بها خطوط خضراء، اللمس متوقف جزئياً في الجزء العلوي.",
    status: "ready",
    statusText: "جاهز للاستلام والتسليم",
    receivedAt: "2026-11-04 10:30",
    estimatedCompletion: "2026-11-05 18:00",
    completedAt: "2026-11-05 17:15",
    cost: 165,
    currency: "دولار",
    costYer: 87000,
    technician: "م. أديب الدُميني",
    replacedParts: "شاشة OLED أصلية وكالة 100% مع برمجة True Tone ونقل فلكس الحساسات",
    warrantyDays: 90,
    technicianNotes: "تم استبدال الشاشة بنجاح مع نقل رقاقة الشاشة الأصلية لتفادي رسالة التحذير، تفعيل True Tone بنجاح واختبار اللمس ونسبة الاستجابة بنسبة 100%. تم فحص الشحن والكاميرات والسماعة.",
    passcode: "محمي برمز نمط - تم الفحص بحضور العميل",
    intakeMethod: "تسليم بالمركز (دمنة خدير)"
  },
  {
    id: "AD-8842",
    customerName: "أحمد سعيد الخديري",
    phone: "734567890",
    deviceBrand: "Samsung",
    deviceModel: "Galaxy S22 Ultra",
    color: "أسود فانتوم (Phantom Black)",
    issueCategory: "charging",
    issueDescription: "الهاتف لا يشحن بتاتاً ويظهر تنبيه رطوبة أو حرارة زائدة بمنفذ الشحن حتى بعد التجفيف.",
    status: "repairing",
    statusText: "قيد الصيانة واستبدال القطع",
    receivedAt: "2026-11-05 14:15",
    estimatedCompletion: "2026-11-06 19:00",
    cost: 45,
    currency: "دولار",
    costYer: 24000,
    technician: "م. أديب الدُميني",
    replacedParts: "فلكس شحن كامل أصلي Sub-board + صيانة مسار الـ VBUS وحساس الحرارة",
    warrantyDays: 60,
    technicianNotes: "فحص المايكروسكوب أظهر تلف وتكلس بأرجل منفذ التايب سي وتذبذب في خط VBUS. جاري استبدال فلكس الشحن الأصلي وإعادة اللحام الدقيق.",
    passcode: "مرفق مع التذكرة",
    intakeMethod: "تسليم بالمركز"
  },
  {
    id: "AD-4120",
    customerName: "وسيم خالد المقبلي",
    phone: "778901234",
    deviceBrand: "Xiaomi",
    deviceModel: "Redmi Note 12 Pro 5G",
    color: "أبيض قطبي",
    issueCategory: "software",
    issueDescription: "توقف الهاتف على شعار MI فجأة بعد محاولة تحديث نظام MIUI ويقوم بإعادة تشغيل لا نهائية (Bootloop).",
    status: "quality_check",
    statusText: "اختبار الجودة والضمان بعد البرمجة",
    receivedAt: "2026-11-05 16:45",
    estimatedCompletion: "2026-11-06 14:00",
    cost: 18,
    currency: "دولار",
    costYer: 9500,
    technician: "م. أديب الدُميني",
    replacedParts: "تفليش روم رسمي عالمي مع الحفاظ على ملفات النظام الأساسية وتصحيح قسم الـ NVRAM",
    warrantyDays: 30,
    technicianNotes: "تم تفليش النظام الرسمي عبر Fastboot بدون فقدان بيانات المستخدم وإصلاح ملفات التمهيد Boot Partition. الجهاز يعمل الآن بشكل سليم وجاري اختبار الاستقرار والشبكة.",
    passcode: "بدون رمز قفل",
    intakeMethod: "تسليم بالمركز"
  },
  {
    id: "AD-9514",
    customerName: "فاطمة سلطان المنصوب",
    phone: "712398456",
    deviceBrand: "Huawei",
    deviceModel: "Mate 40 Pro",
    color: "فضي فضائي",
    issueCategory: "water_damage",
    issueDescription: "سقوط الهاتف في حوض ماء، تم إخراجه فوراً ولكنه انطفأ ولم يعد يستجيب للشاحن.",
    status: "diagnosing",
    statusText: "قيد الفحص والتشخيص الفني المجهري",
    receivedAt: "2026-11-06 09:10",
    estimatedCompletion: "2026-11-07 16:00",
    cost: 55,
    currency: "دولار",
    costYer: 29000,
    technician: "م. أديب الدُميني",
    replacedParts: "تنظيف كيميائي بالموجات فوق الصوتية + عزل قصر دائرة الباور الرئيسية",
    warrantyDays: 45,
    technicianNotes: "تم فك الهاتف فوراً، نزع البطارية، وغسيل البوردة بجهاز الألتراسونيك لإزالة الرطوبة والأملاح. يوجد شورت طفيف في خط VDD_MAIN وجاري حقن الفولت لتحديد المكثف التالف بالمجهر الحراري.",
    passcode: "مرفق",
    intakeMethod: "استلام فني مباشر"
  },
  {
    id: "AD-6238",
    customerName: "عصام مهيوب الحيدري",
    phone: "770987654",
    deviceBrand: "Infinix",
    deviceModel: "Note 30",
    color: "ذهبي غروب",
    issueCategory: "battery",
    issueDescription: "نفاد البطارية بسرعة وتفريغ الشحن من 50% إلى 0% بشكل مفاجئ مع سخونة في الظهر.",
    status: "delivered",
    statusText: "تم التسليم للعميل بنجاح",
    receivedAt: "2026-11-02 11:20",
    completedAt: "2026-11-02 17:30",
    cost: 22,
    currency: "دولار",
    costYer: 12000,
    technician: "م. أديب الدُميني",
    replacedParts: "بطارية أصلية وكالة 5000mAh جديدة بنسبة صحة 100%",
    warrantyDays: 180,
    technicianNotes: "تم استبدال البطارية ببطارية أصلية مع شريط لاصق حراري، وتم معايرة دورات الشحن وفحص استهلاك التيار على جهاز Power Supply بنسبة ممتازة.",
    passcode: "مفتوح",
    intakeMethod: "تسليم بالمركز"
  }
];

// App State
const AppState = {
  tickets: [],
  services: [],
  activeView: 'tracker',
  currentTrackedTicket: null,
  activeAdminFilter: 'all',
  adminSearchQuery: '',
  selectedBrand: 'Apple',
  selectedIssue: 'screen',
  selectedQuality: 'original',
  modelsByBrand: {
    'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Pro Max', 'iPhone 13 Pro Max', 'iPhone 12 Pro', 'iPhone 11', 'iPhone X / XS'],
    'Samsung': ['Galaxy S24 Ultra', 'Galaxy S23 Ultra', 'Galaxy S22 Ultra', 'Galaxy A54 5G', 'Galaxy A34', 'Galaxy Note 20 Ultra'],
    'Xiaomi': ['Redmi Note 13 Pro+', 'Redmi Note 12 Pro', 'Xiaomi 13 Ultra', 'Poco X6 Pro', 'Redmi 12'],
    'Huawei': ['Mate 60 Pro', 'Mate 40 Pro', 'P50 Pro', 'Nova 11', 'Nova 9'],
    'Infinix': ['Note 30 VIP', 'Hot 40 Pro', 'Zero 30 5G', 'Smart 8'],
    'Pixel': ['Google Pixel 8 Pro', 'Google Pixel 7 Pro', 'Google Pixel 6A']
  },
  pricingMatrix: {
    'screen': { baseUsd: 65, yerRate: 530, time: '30 - 60 دقيقة', warranty: '90 يوماً' },
    'battery': { baseUsd: 22, yerRate: 530, time: '20 - 45 دقيقة', warranty: '180 يوماً' },
    'charging': { baseUsd: 18, yerRate: 530, time: '30 - 60 دقيقة', warranty: '60 يوماً' },
    'water': { baseUsd: 40, yerRate: 530, time: 'ساعتان - 24 ساعة', warranty: 'فحص مجهري' },
    'software': { baseUsd: 12, yerRate: 530, time: '15 - 35 دقيقة', warranty: 'ضمان استقرار' },
    'unlock': { baseUsd: 14, yerRate: 530, time: '15 دقيقة', warranty: 'فك دائم رسمي' },
    'security': { baseUsd: 16, yerRate: 530, time: '20 - 45 دقيقة', warranty: 'حماية معتمدة' },
    'motherboard': { baseUsd: 55, yerRate: 530, time: '3 ساعات - يوم عمل', warranty: '90 يوماً' },
    'camera': { baseUsd: 30, yerRate: 530, time: '40 دقيقة', warranty: '60 يوماً' }
  }
};

// ===================================================================
// Initialization & Data Loading
// ===================================================================

document.addEventListener('DOMContentLoaded', async () => {
  await loadTicketsData();
  setupNavigation();
  setupTracker();
  setupEstimator();
  setupBookingForm();
  setupAdminDashboard();
  setupPWA();
  renderKpis();

  // Load first ticket by default into tracker for immediate rich view
  if (AppState.tickets.length > 0) {
    displayTrackedTicket(AppState.tickets[0]);
  }
});

// Load data from Server API or fallback to LocalStorage/Defaults
async function loadTicketsData() {
  try {
    const res = await fetch('/api/tickets');
    if (res.ok) {
      const data = await res.json();
      if (data.tickets && data.tickets.length > 0) {
        AppState.tickets = data.tickets;
        localStorage.setItem('adeeb_tickets', JSON.stringify(AppState.tickets));
        return;
      }
    }
  } catch (err) {
    console.warn('API unreachable, using local persistence:', err);
  }

  // Fallback to localStorage or defaults
  const saved = localStorage.getItem('adeeb_tickets');
  if (saved) {
    try {
      AppState.tickets = JSON.parse(saved);
    } catch (e) {
      AppState.tickets = DEFAULT_TICKETS;
    }
  } else {
    AppState.tickets = DEFAULT_TICKETS;
    localStorage.setItem('adeeb_tickets', JSON.stringify(AppState.tickets));
  }
}

// Save ticket to Server API & LocalStorage
async function saveTicket(ticket, isUpdate = false) {
  // Update local memory & storage
  if (isUpdate) {
    const idx = AppState.tickets.findIndex(t => t.id === ticket.id);
    if (idx !== -1) AppState.tickets[idx] = ticket;
  } else {
    AppState.tickets.unshift(ticket);
  }
  localStorage.setItem('adeeb_tickets', JSON.stringify(AppState.tickets));

  // Try sync with API
  try {
    if (isUpdate) {
      await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      });
    } else {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      });
    }
  } catch (e) {
    console.log('Server sync pending (offline or static mode)');
  }

  renderAdminTable();
  renderKpis();
}

// ===================================================================
// Navigation & Views Switching
// ===================================================================

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .tab-btn');
  const views = document.querySelectorAll('.app-view');

  function switchView(viewName) {
    AppState.activeView = viewName;

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    // Update tab bar buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Show active view
    views.forEach(v => {
      v.classList.toggle('active', v.id === `view-${viewName}`);
    });

    // Close mobile menu if open
    document.querySelector('.main-nav')?.classList.remove('open');

    // Scroll smoothly to top of view
    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection && window.scrollY > 200) {
      activeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      if (targetView) switchView(targetView);
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  menuToggle?.addEventListener('click', () => {
    mainNav?.classList.toggle('open');
  });

  // Admin switch button in header
  const adminSwitch = document.querySelector('.btn-admin-switch');
  adminSwitch?.addEventListener('click', () => {
    switchView('admin');
  });

  // Quick Action Launcher buttons on Hero
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.goto;
      if (target) switchView(target);
    });
  });
}

// ===================================================================
// View 1: Repair Tracker Logic
// ===================================================================

function setupTracker() {
  const trackBtn = document.getElementById('btn-track-submit');
  const trackInput = document.getElementById('input-track-code');
  const heroInput = document.getElementById('hero-quick-track-input');
  const heroBtn = document.getElementById('hero-quick-track-btn');

  function performSearch(query) {
    if (!query) {
      showToast('يرجى إدخال رقم تذكرة الصيانة أو رقم هاتفك المسجل', 'info');
      return;
    }
    const cleanQ = query.trim().toUpperCase();
    const found = AppState.tickets.find(t =>
      t.id.toUpperCase() === cleanQ ||
      t.id.toUpperCase().includes(cleanQ) ||
      (t.phone && t.phone.endsWith(cleanQ))
    );

    if (found) {
      displayTrackedTicket(found);
      showToast(`تم العثور على تذكرة ${found.id} لجهاز ${found.deviceModel}`, 'success');
    } else {
      showToast(`عذراً، لم يتم العثور على تذكرة تطابق "${query}". يرجى التأكد من الرقم.`, 'error');
    }
  }

  trackBtn?.addEventListener('click', () => {
    performSearch(trackInput?.value);
  });

  trackInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch(trackInput.value);
  });

  heroBtn?.addEventListener('click', () => {
    if (heroInput?.value) {
      document.querySelector('[data-view="tracker"]')?.click();
      setTimeout(() => performSearch(heroInput.value), 200);
    }
  });

  // Click on sample ticket pills
  document.querySelectorAll('.pill-code, .sample-ticket-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      if (code) {
        if (trackInput) trackInput.value = code;
        performSearch(code);
      }
    });
  });

  // Print button
  document.getElementById('btn-print-receipt')?.addEventListener('click', () => {
    if (AppState.currentTrackedTicket) {
      openPrintReceiptModal(AppState.currentTrackedTicket);
    }
  });

  // WhatsApp chat button for current ticket
  document.getElementById('btn-track-whatsapp')?.addEventListener('click', () => {
    if (AppState.currentTrackedTicket) {
      const t = AppState.currentTrackedTicket;
      const text = encodeURIComponent(
        `السلام عليكم م. أديب الدُميني، أستفسر بخصوص تذكرة الصيانة الخاصة بي:
📌 رقم التذكرة: ${t.id}
📱 نوع الجهاز: ${t.deviceModel}
⚙️ العطل: ${t.issueDescription}
الحالة الحالية في التطبيق: ${t.statusText}
شكراً لك.`
      );
      window.open(`https://wa.me/967770000000?text=${text}`, '_blank');
    }
  });
}

function displayTrackedTicket(ticket) {
  AppState.currentTrackedTicket = ticket;
  const container = document.getElementById('repair-result-container');
  if (!container) return;

  container.style.display = 'block';

  // 1. Header info
  document.getElementById('ticket-display-id').textContent = ticket.id;
  document.getElementById('ticket-display-model').textContent = ticket.deviceModel;

  // 2. Status Badge
  const statusBadge = document.getElementById('ticket-status-badge');
  if (statusBadge) {
    statusBadge.className = `status-badge ${ticket.status}`;
    statusBadge.innerHTML = `<i>●</i> ${ticket.statusText}`;
  }

  // 3. Timeline Stages Mapping
  const stageMap = {
    'waiting_approval': 1,
    'diagnosing': 2,
    'repairing': 3,
    'quality_check': 4,
    'ready': 5,
    'delivered': 5
  };
  const currentStep = stageMap[ticket.status] || 2;

  const steps = document.querySelectorAll('.timeline-step');
  steps.forEach((step, idx) => {
    const stepNum = idx + 1;
    step.classList.remove('completed', 'active');
    if (stepNum < currentStep) {
      step.classList.add('completed');
    } else if (stepNum === currentStep) {
      step.classList.add('active');
    }
  });

  // Update progress line width
  const progressBar = document.getElementById('timeline-progress-fill');
  if (progressBar) {
    const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  // 4. Details Information Grid
  document.getElementById('ticket-customer-name').textContent = ticket.customerName;
  document.getElementById('ticket-phone').textContent = ticket.phone || 'غير مسجل';
  document.getElementById('ticket-received-at').textContent = ticket.receivedAt || 'غير محدد';
  document.getElementById('ticket-estimated-date').textContent = ticket.estimatedCompletion || 'خلال 24 ساعة';
  document.getElementById('ticket-issue-desc').textContent = ticket.issueDescription;
  document.getElementById('ticket-replaced-parts').textContent = ticket.replacedParts || 'قطع أصلية وكالة';
  document.getElementById('ticket-warranty-days').textContent = `${ticket.warrantyDays || 60} يوماً معتمد`;
  document.getElementById('ticket-cost-usd').textContent = `$${ticket.cost || 0}`;
  document.getElementById('ticket-cost-yer').textContent = `(${Number(ticket.costYer || ticket.cost * 530).toLocaleString()} ر.ي)`;
  document.getElementById('ticket-tech-notes').textContent = ticket.technicianNotes || 'الفحص والتشخيص جارٍ بأحدث أجهزة القياس المجهرية.';
  document.getElementById('ticket-intake-method').textContent = ticket.intakeMethod || 'تسليم بالمركز (دمنة خدير)';
}

// ===================================================================
// View 2: Cost & Diagnostic Estimator Logic
// ===================================================================

function setupEstimator() {
  // Brand selection
  const brandButtons = document.querySelectorAll('.brand-select-btn');
  const modelSelect = document.getElementById('calc-model-select');

  function updateModels(brand) {
    AppState.selectedBrand = brand;
    if (!modelSelect) return;
    modelSelect.innerHTML = '';
    const models = AppState.modelsByBrand[brand] || ['موديل قياسي'];
    models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modelSelect.appendChild(opt);
    });
    calculateEstimate();
  }

  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brandButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateModels(btn.dataset.brand);
    });
  });

  // Issue selection
  const issueButtons = document.querySelectorAll('.issue-select-btn');
  issueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      issueButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      AppState.selectedIssue = btn.dataset.issue;
      calculateEstimate();
    });
  });

  // Quality selection
  const qualityButtons = document.querySelectorAll('.quality-select-btn');
  qualityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      qualityButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      AppState.selectedQuality = btn.dataset.quality;
      calculateEstimate();
    });
  });

  modelSelect?.addEventListener('change', calculateEstimate);

  // Transfer estimation to booking form
  document.getElementById('btn-book-from-estimate')?.addEventListener('click', () => {
    const brand = AppState.selectedBrand;
    const model = modelSelect?.value || brand;
    const issueBtn = document.querySelector('.issue-select-btn.selected');
    const issueName = issueBtn?.querySelector('.issue-name')?.textContent || 'صيانة عامة';

    // Switch to booking tab
    document.querySelector('[data-view="booking"]')?.click();

    // Populate booking fields
    const bookBrand = document.getElementById('book-brand-select');
    const bookModel = document.getElementById('book-device-model');
    const bookIssue = document.getElementById('book-issue-desc');

    if (bookBrand) bookBrand.value = brand;
    if (bookModel) bookModel.value = model;
    if (bookIssue) bookIssue.value = `طلب صيانة: ${issueName} (${AppState.selectedQuality === 'original' ? 'قطع أصلية وكالة' : 'درجة أولى معتمدة'}).`;

    showToast(`تم نقل بيانات ${brand} ${model} إلى نموذج الحجز.`, 'info');
  });

  // Initial calculation
  calculateEstimate();
}

function calculateEstimate() {
  const issue = AppState.selectedIssue;
  const brand = AppState.selectedBrand;
  const quality = AppState.selectedQuality;
  const matrix = AppState.pricingMatrix[issue] || AppState.pricingMatrix['screen'];

  let multiplier = 1.0;
  if (brand === 'Apple') multiplier = 1.45;
  else if (brand === 'Samsung') multiplier = 1.25;
  else if (brand === 'Huawei') multiplier = 1.15;
  else if (brand === 'Xiaomi' || brand === 'Infinix') multiplier = 0.9;

  if (quality === 'high_copy') multiplier *= 0.65;

  const estimatedUsd = Math.round(matrix.baseUsd * multiplier);
  const estimatedYer = Math.round(estimatedUsd * matrix.yerRate);

  const usdEl = document.getElementById('est-price-usd');
  const yerEl = document.getElementById('est-price-yer');
  const timeEl = document.getElementById('est-time-val');
  const warrantyEl = document.getElementById('est-warranty-val');

  if (usdEl) usdEl.textContent = `$${estimatedUsd}`;
  if (yerEl) yerEl.textContent = `${estimatedYer.toLocaleString()} ر.ي تقريباً`;
  if (timeEl) timeEl.textContent = matrix.time;
  if (warrantyEl) warrantyEl.textContent = quality === 'original' ? matrix.warranty : '30 يوماً';
}

// ===================================================================
// View 3: Online Booking & Intake Logic
// ===================================================================

function setupBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('book-customer-name')?.value.trim();
    const phone = document.getElementById('book-phone')?.value.trim();
    const brand = document.getElementById('book-brand-select')?.value;
    const model = document.getElementById('book-device-model')?.value.trim();
    const issueCategory = document.getElementById('book-issue-category')?.value;
    const issueDesc = document.getElementById('book-issue-desc')?.value.trim();
    const passcode = document.getElementById('book-passcode')?.value.trim() || 'لا يوجد / نمط';
    const methodEl = document.querySelector('input[name="intake_method"]:checked');
    const intakeMethod = methodEl?.value === 'center' ? 'زيارة للمركز (دمنة خدير - شارع النيابة)' : 'طلب مندوب استلام';

    if (!name || !phone || !model || !issueDesc) {
      showToast('يرجى ملء جميع الحقول المطلوبة الإلزامية (*)', 'error');
      return;
    }

    // Generate unique Ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `AD-${randomNum}`;
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newTicket = {
      id: newId,
      customerName: name,
      phone: phone,
      deviceBrand: brand,
      deviceModel: `${brand} ${model}`,
      color: 'افتراضي',
      issueCategory: issueCategory,
      issueDescription: issueDesc,
      status: 'diagnosing',
      statusText: 'قيد الفحص والتشخيص الفني المجهري',
      receivedAt: dateStr,
      estimatedCompletion: 'خلال 24-48 ساعة',
      completedAt: null,
      cost: 35,
      currency: 'دولار',
      costYer: 18500,
      technician: 'م. أديب الدُميني',
      replacedParts: 'قيد التحديد بعد الفحص المجهري',
      warrantyDays: 60,
      technicianNotes: 'تم حجز الطلب إلكترونياً عبر تطبيق الويب وجاري الاستعداد للفحص الفني.',
      passcode: passcode,
      intakeMethod: intakeMethod,
      createdAt: now.toISOString()
    };

    // Save ticket to state and backend
    await saveTicket(newTicket);

    // Show confirmation modal
    openBookingConfirmationModal(newTicket);

    form.reset();
  });
}

function openBookingConfirmationModal(ticket) {
  const modal = document.getElementById('booking-success-modal');
  if (!modal) return;

  document.getElementById('modal-conf-ticket-id').textContent = ticket.id;
  document.getElementById('modal-conf-device').textContent = ticket.deviceModel;
  document.getElementById('modal-conf-name').textContent = ticket.customerName;

  // WhatsApp confirmation button
  const waBtn = document.getElementById('btn-modal-wa-confirm');
  if (waBtn) {
    const text = encodeURIComponent(
      `السلام عليكم م. أديب الدُميني، قمت بحجز صيانة عبر تطبيق الويب:
رقم التذكرة: ${ticket.id}
الاسم: ${ticket.customerName}
رقم الهاتف: ${ticket.phone}
نوع الجهاز: ${ticket.deviceModel}
المشكلة: ${ticket.issueDescription}
طريقة التسليم: ${ticket.intakeMethod}
أرجو تأكيد موعد الاستلام. شكراً لك.`
    );
    waBtn.onclick = () => window.open(`https://wa.me/967770000000?text=${text}`, '_blank');
  }

  // Track button
  const trackNowBtn = document.getElementById('btn-modal-track-now');
  if (trackNowBtn) {
    trackNowBtn.onclick = () => {
      closeModal('booking-success-modal');
      document.querySelector('[data-view="tracker"]')?.click();
      displayTrackedTicket(ticket);
    };
  }

  modal.classList.add('open');
}

// ===================================================================
// View 4: Emergency First-Aid & Catalog Search
// ===================================================================

// Catalog search and category filter
document.getElementById('catalog-search-input')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  filterServicesCatalog(query, document.querySelector('.cat-filter-btn.active')?.dataset.cat);
});

document.querySelectorAll('.cat-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    const query = document.getElementById('catalog-search-input')?.value.toLowerCase().trim() || '';
    filterServicesCatalog(query, cat);
  });
});

function filterServicesCatalog(query, category) {
  const cards = document.querySelectorAll('.service-card-item');
  cards.forEach(card => {
    const title = card.querySelector('.service-title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.service-desc')?.textContent.toLowerCase() || '';
    const cardCat = card.dataset.cat;

    const matchesQuery = !query || title.includes(query) || desc.includes(query);
    const matchesCat = !category || category === 'all' || cardCat === category;

    card.style.display = (matchesQuery && matchesCat) ? 'flex' : 'none';
  });
}

// Quick service request button in catalog
document.querySelectorAll('.btn-order-service').forEach(btn => {
  btn.addEventListener('click', () => {
    const srvName = btn.dataset.serviceName;
    document.querySelector('[data-view="booking"]')?.click();
    const issueInput = document.getElementById('book-issue-desc');
    if (issueInput) {
      issueInput.value = `طلب خدمة: ${srvName}`;
      issueInput.focus();
    }
  });
});

// ===================================================================
// View 5: Technician & Admin Hub Logic
// ===================================================================

function setupAdminDashboard() {
  renderAdminTable();
  renderKpis();

  // Search input in admin
  const adminSearch = document.getElementById('admin-search-input');
  adminSearch?.addEventListener('input', (e) => {
    AppState.adminSearchQuery = e.target.value.toLowerCase().trim();
    renderAdminTable();
  });

  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.activeAdminFilter = pill.dataset.filter;
      renderAdminTable();
    });
  });

  // Open New Ticket Modal (for in-shop walk-ins)
  document.getElementById('btn-admin-add-ticket')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-add-ticket');
    modal?.classList.add('open');
  });

  // Form submit in New Ticket Modal
  document.getElementById('form-modal-new-ticket')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('new-t-name')?.value.trim();
    const phone = document.getElementById('new-t-phone')?.value.trim();
    const device = document.getElementById('new-t-device')?.value.trim();
    const issue = document.getElementById('new-t-issue')?.value.trim();
    const cost = Number(document.getElementById('new-t-cost')?.value || 0);
    const status = document.getElementById('new-t-status')?.value || 'diagnosing';

    if (!name || !device || !issue) {
      showToast('يرجى ملء الحقول الإلزامية', 'error');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `AD-${randomNum}`;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const statusMap = {
      'waiting_approval': 'بانتظار موافقة العميل على التكلفة',
      'diagnosing': 'قيد الفحص والتشخيص الفني المجهري',
      'repairing': 'قيد الصيانة واستبدال القطع',
      'quality_check': 'اختبار الجودة والضمان بعد الإصلاح',
      'ready': 'جاهز للاستلام والتسليم',
      'delivered': 'تم التسليم للعميل بنجاح'
    };

    const newTicket = {
      id: newId,
      customerName: name,
      phone: phone,
      deviceBrand: 'غير محدد',
      deviceModel: device,
      color: 'افتراضي',
      issueCategory: 'general',
      issueDescription: issue,
      status: status,
      statusText: statusMap[status],
      receivedAt: dateStr,
      estimatedCompletion: 'خلال 24 ساعة',
      completedAt: status === 'delivered' ? dateStr : null,
      cost: cost,
      currency: 'دولار',
      costYer: cost * 530,
      technician: 'م. أديب الدُميني',
      replacedParts: 'قطع أصلية معتمدة',
      warrantyDays: 60,
      technicianNotes: 'تم فتح تذكرة استلام بالمركز بواسطة الفني المسؤول.',
      passcode: 'تم التحقق بالمركز',
      intakeMethod: 'استلام بالمركز (دمنة خدير)'
    };

    await saveTicket(newTicket);
    closeModal('modal-add-ticket');
    e.target.reset();
    showToast(`تم إنشاء تذكرة الصيانة ${newId} بنجاح!`, 'success');

    // Automatically prompt to print receipt for customer in the shop
    openPrintReceiptModal(newTicket);
  });

  // Export JSON Backup
  document.getElementById('btn-admin-export')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.tickets, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `adeeb_tickets_backup_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('تم تصدير نسخة احتياطية من التذاكر بنجاح', 'success');
  });

  // Edit Ticket Modal Form Submit
  document.getElementById('form-modal-edit-ticket')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-t-id')?.value;
    const ticket = AppState.tickets.find(t => t.id === id);
    if (!ticket) return;

    ticket.status = document.getElementById('edit-t-status')?.value || ticket.status;
    ticket.cost = Number(document.getElementById('edit-t-cost')?.value || ticket.cost);
    ticket.costYer = ticket.cost * 530;
    ticket.warrantyDays = Number(document.getElementById('edit-t-warranty')?.value || ticket.warrantyDays);
    ticket.replacedParts = document.getElementById('edit-t-parts')?.value || ticket.replacedParts;
    ticket.technicianNotes = document.getElementById('edit-t-notes')?.value || ticket.technicianNotes;

    const statusMap = {
      'waiting_approval': 'بانتظار موافقة العميل على التكلفة',
      'diagnosing': 'قيد الفحص والتشخيص الفني المجهري',
      'repairing': 'قيد الصيانة واستبدال القطع',
      'quality_check': 'اختبار الجودة والضمان بعد الإصلاح',
      'ready': 'جاهز للاستلام والتسليم',
      'delivered': 'تم التسليم للعميل بنجاح'
    };
    ticket.statusText = statusMap[ticket.status] || ticket.statusText;

    await saveTicket(ticket, true);
    closeModal('modal-edit-ticket');
    showToast(`تم تحديث التذكرة ${id} بنجاح!`, 'success');

    // If currently tracked, update display
    if (AppState.currentTrackedTicket?.id === id) {
      displayTrackedTicket(ticket);
    }
  });
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-tickets-tbody');
  if (!tbody) return;

  const q = AppState.adminSearchQuery;
  const filter = AppState.activeAdminFilter;

  let filtered = AppState.tickets;
  if (filter !== 'all') {
    filtered = filtered.filter(t => t.status === filter);
  }
  if (q) {
    filtered = filtered.filter(t =>
      t.id.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.deviceModel.toLowerCase().includes(q) ||
      (t.phone && t.phone.includes(q))
    );
  }

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--muted);">لا توجد تذاكر تطابق البحث الحالي</td></tr>`;
    return;
  }

  filtered.forEach(ticket => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b style="font-family:var(--font-mono); color:var(--lime);">${ticket.id}</b></td>
      <td>
        <div style="font-weight:700;">${ticket.customerName}</div>
        <small style="color:var(--muted);">${ticket.phone || 'بدون هاتف'}</small>
      </td>
      <td>
        <div>${ticket.deviceModel}</div>
        <small style="color:var(--cyan);">${ticket.issueDescription.substring(0, 32)}...</small>
      </td>
      <td>
        <select class="table-status-select" data-id="${ticket.id}">
          <option value="diagnosing" ${ticket.status === 'diagnosing' ? 'selected' : ''}>🔬 قيد الفحص</option>
          <option value="repairing" ${ticket.status === 'repairing' ? 'selected' : ''}>⚙️ قيد الصيانة</option>
          <option value="quality_check" ${ticket.status === 'quality_check' ? 'selected' : ''}>🧪 فحص الجودة</option>
          <option value="ready" ${ticket.status === 'ready' ? 'selected' : ''}>✅ جاهز للاستلام</option>
          <option value="delivered" ${ticket.status === 'delivered' ? 'selected' : ''}>📦 تم التسليم</option>
          <option value="waiting_approval" ${ticket.status === 'waiting_approval' ? 'selected' : ''}>⏳ بانتظار الموافقة</option>
        </select>
      </td>
      <td>
        <b style="color:var(--lime); font-family:var(--font-mono);">$${ticket.cost || 0}</b>
        <div style="font-size:0.75rem; color:var(--muted);">${Number(ticket.costYer || ticket.cost * 530).toLocaleString()} ر.ي</div>
      </td>
      <td><small style="color:var(--muted);">${ticket.receivedAt || '-'}</small></td>
      <td>
        <div class="table-actions-cell">
          <button class="btn-icon-action" title="تعديل تفاصيل التذكرة" onclick="openEditTicketModal('${ticket.id}')">✏️</button>
          <button class="btn-icon-action" title="طباعة الإيصال والضمان" onclick="openPrintModalById('${ticket.id}')">🖨️</button>
          <button class="btn-icon-action danger" title="حذف التذكرة" onclick="deleteTicketById('${ticket.id}')">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach status change listeners
  tbody.querySelectorAll('.table-status-select').forEach(select => {
    select.addEventListener('change', async (e) => {
      const ticketId = e.target.dataset.id;
      const newStatus = e.target.value;
      const ticket = AppState.tickets.find(t => t.id === ticketId);
      if (ticket) {
        ticket.status = newStatus;
        const statusMap = {
          'waiting_approval': 'بانتظار موافقة العميل على التكلفة',
          'diagnosing': 'قيد الفحص والتشخيص الفني المجهري',
          'repairing': 'قيد الصيانة واستبدال القطع',
          'quality_check': 'اختبار الجودة والضمان بعد الإصلاح',
          'ready': 'جاهز للاستلام والتسليم',
          'delivered': 'تم التسليم للعميل بنجاح'
        };
        ticket.statusText = statusMap[newStatus];
        if (newStatus === 'delivered' && !ticket.completedAt) {
          ticket.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
        }
        await saveTicket(ticket, true);
        showToast(`تم تحديث حالة التذكرة ${ticketId} إلى: ${ticket.statusText}`, 'success');
        if (AppState.currentTrackedTicket?.id === ticketId) {
          displayTrackedTicket(ticket);
        }
      }
    });
  });
}

function renderKpis() {
  const tickets = AppState.tickets;
  const total = tickets.length;
  const inProgress = tickets.filter(t => t.status === 'repairing' || t.status === 'diagnosing' || t.status === 'quality_check').length;
  const ready = tickets.filter(t => t.status === 'ready').length;
  const delivered = tickets.filter(t => t.status === 'delivered').length;
  const totalRevenue = tickets.reduce((sum, t) => sum + (Number(t.cost) || 0), 0);

  // Update header and admin KPI counters
  document.querySelectorAll('.kpi-total-val').forEach(el => el.textContent = total);
  document.querySelectorAll('.kpi-progress-val').forEach(el => el.textContent = inProgress);
  document.querySelectorAll('.kpi-ready-val').forEach(el => el.textContent = ready);
  document.querySelectorAll('.kpi-delivered-val').forEach(el => el.textContent = delivered);
  document.querySelectorAll('.kpi-revenue-val').forEach(el => el.textContent = `$${totalRevenue}`);

  const badgeCount = document.querySelector('.nav-badge-count');
  if (badgeCount) badgeCount.textContent = inProgress + ready;
}

// Window functions for inline HTML calls
window.openEditTicketModal = function(ticketId) {
  const ticket = AppState.tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById('edit-t-id').value = ticket.id;
  document.getElementById('edit-modal-title').textContent = `تعديل تذكرة الصيانة (${ticket.id})`;
  document.getElementById('edit-t-status').value = ticket.status;
  document.getElementById('edit-t-cost').value = ticket.cost;
  document.getElementById('edit-t-warranty').value = ticket.warrantyDays;
  document.getElementById('edit-t-parts').value = ticket.replacedParts || '';
  document.getElementById('edit-t-notes').value = ticket.technicianNotes || '';

  const modal = document.getElementById('modal-edit-ticket');
  modal?.classList.add('open');
};

window.openPrintModalById = function(ticketId) {
  const ticket = AppState.tickets.find(t => t.id === ticketId);
  if (ticket) openPrintReceiptModal(ticket);
};

window.deleteTicketById = async function(ticketId) {
  if (confirm(`هل أنت متأكد من حذف تذكرة الصيانة رقم ${ticketId} نهائياً؟`)) {
    AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId);
    localStorage.setItem('adeeb_tickets', JSON.stringify(AppState.tickets));
    try {
      await fetch(`/api/tickets/${ticketId}`, { method: 'DELETE' });
    } catch (e) {}
    renderAdminTable();
    renderKpis();
    showToast(`تم حذف التذكرة ${ticketId}`, 'info');
  }
};

// ===================================================================
// Print Receipt Modal Logic
// ===================================================================

function openPrintReceiptModal(ticket) {
  const modal = document.getElementById('modal-print-receipt');
  if (!modal) return;

  document.getElementById('receipt-id').textContent = ticket.id;
  document.getElementById('receipt-barcode-txt').textContent = `*${ticket.id}*`;
  document.getElementById('receipt-date').textContent = ticket.receivedAt || new Date().toISOString().substring(0, 10);
  document.getElementById('receipt-customer').textContent = ticket.customerName;
  document.getElementById('receipt-phone').textContent = ticket.phone || 'غير مسجل';
  document.getElementById('receipt-device').textContent = ticket.deviceModel;
  document.getElementById('receipt-issue').textContent = ticket.issueDescription;
  document.getElementById('receipt-parts').textContent = ticket.replacedParts || 'قطع غيار أصلية وكالة 100%';
  document.getElementById('receipt-warranty').textContent = `${ticket.warrantyDays || 60} يوماً من تاريخ الاستلام`;
  document.getElementById('receipt-cost').textContent = `$${ticket.cost || 0} (${Number(ticket.costYer || ticket.cost * 530).toLocaleString()} ريال يمني)`;
  document.getElementById('receipt-tech').textContent = ticket.technician || 'م. أديب الدُميني';

  modal.classList.add('open');
}

document.getElementById('btn-trigger-print')?.addEventListener('click', () => {
  window.print();
});

// Modal close handler
window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
};

// Close modal when clicking outside dialog
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.classList.remove('open');
  });
});

// ===================================================================
// Toast Notifications System
// ===================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconMap = {
    'success': '✓',
    'error': '✕',
    'info': 'ℹ'
  };

  toast.innerHTML = `<i>${iconMap[type] || '●'}</i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===================================================================
// PWA Service Worker & Install Prompt
// ===================================================================

function setupPWA() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('ServiceWorker registered with scope:', reg.scope);
    }).catch(err => {
      console.log('ServiceWorker registration skipped:', err.message);
    });
  }

  // Handle PWA installation prompt
  let deferredPrompt;
  const pwaInstallBtn = document.getElementById('btn-pwa-install');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'inline-flex';
      pwaInstallBtn.addEventListener('click', () => {
        pwaInstallBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast('شكراً لتثبيت تطبيق أديب الدُميني!', 'success');
          }
          deferredPrompt = null;
        });
      });
    }
  });
}
