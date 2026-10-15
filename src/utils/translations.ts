import { Language } from '../types/safety';

export interface Translations {
  // Navigation
  home: string;
  my_training: string;
  safety_assistant: string;
  profile: string;

  // Header & General
  good_morning: string;
  user_name: string;
  notifications: string;
  view_all: string;
  mandatory: string;
  due: string;
  progress: string;
  completed: string;
  in_progress: string;
  due_this_week: string;
  not_started: string;
  overdue: string;
  all: string;
  search_placeholder: string;
  back: string;

  // Login Screen
  login_tagline_badge: string;
  login_subheading: string;
  login_quote: string;
  dubai_dc: string;
  live_sync: string;
  instant_demo: string;
  or_sign_in: string;
  employee_id_label: string;
  employee_id_placeholder: string;
  password_label: string;
  forgot_password: string;
  remember_terminal: string;
  sign_in_button: string;
  signing_in: string;
  supervisor_support: string;
  support_desc: string;

  // Forgot Password Screen
  forgot_pw_title: string;
  forgot_pw_subtitle: string;
  reset_method_label: string;
  reset_method_supervisor: string;
  reset_method_sms: string;
  send_reset_code: string;
  sending_code: string;
  reset_sent_title: string;
  reset_sent_desc: string;
  enter_code_placeholder: string;
  verify_code: string;
  return_to_login: string;

  // Home Screen
  continue_learning: string;
  lesson_counter: (current: number, total: number) => string;
  resume_training: string;
  next_up_heading: string;
  safety_tip_title: string;
  safety_tip_body: string;
  my_certificates: string;
  credentials_count: (count: number) => string;
  safety_resources: string;
  resources_count: (count: number) => string;

  // Training & Course
  course_overview: string;
  assigned_modules_sub: string;
  start_training: string;
  review_course: string;
  syllabus: string;
  prerequisites: string;
  certificate_on_pass: string;
  course_completed: string;

  // Safety Assistant
  safety_assistant_title: string;
  safety_assistant_subtitle: string;
  assistant_banner_title: string;
  assistant_banner_sub: string;
  ask_placeholder: string;
  emergency_note: string;
  approved_sources: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;

  // Notifications Screen
  alerts_sub: string;
  activity_feed: string;
  all_caught_up: string;
  new_badge: (count: number) => string;
  mark_all_read: string;
  no_notifications: string;
  no_notifications_sub: string;

  // Profile Screen
  profile_title: string;
  profile_subtitle: string;
  supervisor_label: string;
  work_email_label: string;
  preferred_language: string;
  notification_preferences: string;
  pref_assignments: string;
  pref_due_reminders: string;
  pref_assessments: string;
  pref_expiry: string;
  accessibility_title: string;
  reduced_motion: string;
  sign_out: string;

  // Certificates & Resources
  certificates_title: string;
  certificates_subtitle: string;
  official_certificate: string;
  download_pdf: string;
  credential_id: string;
  issue_date: string;
  expiry_date: string;
  resources_title: string;
  resources_subtitle: string;
  download_guide: string;
  call_support: string;
}

export const translations: Record<Language, Translations> = {
  English: {
    home: 'Home',
    my_training: 'My Training',
    safety_assistant: 'Safety Assistant',
    profile: 'Profile',

    good_morning: 'Good morning',
    user_name: 'Rahaf',
    notifications: 'Notifications',
    view_all: 'View all',
    mandatory: 'Mandatory',
    due: 'Due',
    progress: 'Progress',
    completed: 'Completed',
    in_progress: 'In Progress',
    due_this_week: 'Due This Week',
    not_started: 'Not started',
    overdue: 'Overdue',
    all: 'All',
    search_placeholder: 'Search training modules, SOPs, PPE...',
    back: 'Back',

    login_tagline_badge: 'Precision in Motion',
    login_subheading: 'Logistics Training Platform',
    login_quote: '“Build safer habits. One shift at a time.”',
    dubai_dc: 'Dubai Distribution Centre',
    live_sync: 'Live Sync',
    instant_demo: 'Instant Demo',
    or_sign_in: 'or sign in with ID',
    employee_id_label: 'Employee ID or Work Email',
    employee_id_placeholder: 'e.g. EMP-89420',
    password_label: 'Password',
    forgot_password: 'Forgot password?',
    remember_terminal: 'Remember this terminal',
    sign_in_button: 'Sign In to SHIFT',
    signing_in: 'Signing in...',
    supervisor_support: 'Shift Supervisor Support',
    support_desc: 'Contact Dubai DC Control Room directly for badge issues',

    forgot_pw_title: 'Reset Password',
    forgot_pw_subtitle: 'Dubai DC Security & ID Verification',
    reset_method_label: 'Choose Recovery Method',
    reset_method_supervisor: 'Send reset request to Supervisor Marcus Vance',
    reset_method_sms: 'Send 6-digit OTP to mobile (+971 50 492 8810)',
    send_reset_code: 'Send Verification Code',
    sending_code: 'Sending code...',
    reset_sent_title: 'Reset Code Dispatched',
    reset_sent_desc: 'A 6-digit verification code has been issued. Enter your code below or check with your supervisor.',
    enter_code_placeholder: 'Enter 6-digit PIN (e.g. 849201)',
    verify_code: 'Verify & Set Temporary Password',
    return_to_login: 'Back to Sign In',

    continue_learning: 'Continue Learning',
    lesson_counter: (current, total) => `Lesson ${current} of ${total}`,
    resume_training: 'Resume training',
    next_up_heading: 'Next Up & Outstanding',
    safety_tip_title: 'Safety Tip of the Shift',
    safety_tip_body: 'Always maintain a strict 3-meter safety buffer around operating reach trucks and forklifts. Never cross behind a reversing vehicle without eye contact.',
    my_certificates: 'My Certificates',
    credentials_count: (count) => `${count} credentials`,
    safety_resources: 'Safety Resources',
    resources_count: (count) => `${count} SOPs & guides`,

    course_overview: 'Course Overview',
    assigned_modules_sub: 'Assigned safety modules and compliance',
    start_training: 'Start Training',
    review_course: 'Review Course',
    syllabus: 'Course Syllabus',
    prerequisites: 'Prerequisites & PPE Requirements',
    certificate_on_pass: 'Certificate on Pass',
    course_completed: 'Completed',

    safety_assistant_title: 'SHIFT Safety Assistant',
    safety_assistant_subtitle: 'AI compliance & procedure guide',
    assistant_banner_title: 'What safety question can I help with?',
    assistant_banner_sub: 'Ask about approved Dubai Distribution Centre SOPs, PPE requirements, or hazard reporting guidelines.',
    ask_placeholder: 'Ask a safety or procedure question...',
    emergency_note: 'For an immediate hazard or emergency, follow your site’s emergency procedure.',
    approved_sources: 'Approved Sources',
    q1: 'Where can I find the PPE procedure?',
    q2: 'How do I report a warehouse hazard?',
    q3: 'Where is the evacuation procedure?',
    q4: 'What training do I still need to complete?',

    alerts_sub: 'Alerts, assignments & reminders',
    activity_feed: 'Activity Feed',
    all_caught_up: 'All caught up',
    new_badge: (count) => `${count} new`,
    mark_all_read: 'Mark all read',
    no_notifications: 'No notifications',
    no_notifications_sub: 'You have reviewed all your alerts.',

    profile_title: 'Employee Profile',
    profile_subtitle: 'Account, preferences & safety credentials',
    supervisor_label: 'Supervisor',
    work_email_label: 'Work Email',
    preferred_language: 'Preferred Language',
    notification_preferences: 'Notification Preferences',
    pref_assignments: 'Training assignments',
    pref_due_reminders: 'Due date reminders',
    pref_assessments: 'Assessment results',
    pref_expiry: 'Qualification renewal reminders',
    accessibility_title: 'Accessibility & Display',
    reduced_motion: 'Reduced motion animations',
    sign_out: 'Sign Out',

    certificates_title: 'Certificates & Qualifications',
    certificates_subtitle: 'Official safety compliance credentials',
    official_certificate: 'Official Certificate',
    download_pdf: 'Download PDF Certificate',
    credential_id: 'Credential ID',
    issue_date: 'Issue Date',
    expiry_date: 'Expiry Date',
    resources_title: 'Safety Resources & SOPs',
    resources_subtitle: 'Official procedures, emergency manuals & site contacts',
    download_guide: 'Open Procedure PDF',
    call_support: 'Call Contact',
  },

  'العربية': {
    home: 'الرئيسية',
    my_training: 'تدريباتي',
    safety_assistant: 'مساعد السلامة',
    profile: 'الملف الشخصي',

    good_morning: 'صباح الخير',
    user_name: 'رهف',
    notifications: 'الإشعارات',
    view_all: 'عرض الكل',
    mandatory: 'إلزامي',
    due: 'الموعد',
    progress: 'التقدم',
    completed: 'مكتمل',
    in_progress: 'قيد التنفيذ',
    due_this_week: 'مستحق هذا الأسبوع',
    not_started: 'لم تبدأ',
    overdue: 'متأخر',
    all: 'الكل',
    search_placeholder: 'ابحث في وحدات التدريب، إجراءات التشغيل، الوقاية...',
    back: 'رجوع',

    login_tagline_badge: 'الدقة في الحركة',
    login_subheading: 'منصة التدريب والسلامة اللوجستية',
    login_quote: '«بناء عادات أكثر أماناً، وردية تلو الأخرى.»',
    dubai_dc: 'مركز توزيع دبي',
    live_sync: 'مزامنة مباشرة',
    instant_demo: 'عرض تجريبي فوري',
    or_sign_in: 'أو تسجيل الدخول بالرقم الوظيفي',
    employee_id_label: 'الرقم الوظيفي أو بريد العمل',
    employee_id_placeholder: 'مثال: EMP-89420',
    password_label: 'كلمة المرور',
    forgot_password: 'نسيت كلمة المرور؟',
    remember_terminal: 'تذكر هذا الجهاز',
    sign_in_button: 'تسجيل الدخول إلى SHIFT',
    signing_in: 'جاري تسجيل الدخول...',
    supervisor_support: 'دعم مشرف الوردية',
    support_desc: 'اتصل بغرفة تحكم مركز توزيع دبي مباشرة لأي استفسار',

    forgot_pw_title: 'إعادة تعيين كلمة المرور',
    forgot_pw_subtitle: 'التحقق الأمني لمركز توزيع دبي',
    reset_method_label: 'اختر طريقة الاسترداد',
    reset_method_supervisor: 'إرسال طلب الاسترداد إلى المشرف ماركوس فانس',
    reset_method_sms: 'إرسال رمز أمان (OTP) إلى الهاتف (+971 50 492 8810)',
    send_reset_code: 'إرسال رمز التحقق',
    sending_code: 'جاري الإرسال...',
    reset_sent_title: 'تم إرسال رمز التحقق',
    reset_sent_desc: 'تم إصدار رمز تحقق مكون من 6 أرقام. أدخل الرمز أدناه أو راجع مشرف الوردية.',
    enter_code_placeholder: 'أدخل الرمز المكون من 6 أرقام (مثال: 849201)',
    verify_code: 'التحقق وتعيين كلمة مرور مؤقتة',
    return_to_login: 'العودة لتسجيل الدخول',

    continue_learning: 'متابعة التدريب',
    lesson_counter: (current, total) => `الدرس ${current} من ${total}`,
    resume_training: 'استئناف التدريب',
    next_up_heading: 'التالي والمطلوب إنجازه',
    safety_tip_title: 'نصيحة السلامة للوردية',
    safety_tip_body: 'حافظ دائمًا على مسافة أمان لا تقل عن 3 أمتار حول شاحنات الرفع والرافعات الشوكية أثناء تشغيلها. لا تمر خلف مركبة ترجع للخلف دون تواصل بصري.',
    my_certificates: 'شهاداتي',
    credentials_count: (count) => `${count} شهادات معتمدة`,
    safety_resources: 'موارد السلامة',
    resources_count: (count) => `${count} أدلة وإجراءات`,

    course_overview: 'تفاصيل الدورة',
    assigned_modules_sub: 'وحدات السلامة الإلزامية المخصصة لك',
    start_training: 'بدء التدريب',
    review_course: 'مراجعة الدورة',
    syllabus: 'منهج الدورة',
    prerequisites: 'المتطلبات الوقائية والمعدات',
    certificate_on_pass: 'شهادة عند الاجتياز',
    course_completed: 'مكتمل بنجاح',

    safety_assistant_title: 'مساعد السلامة SHIFT',
    safety_assistant_subtitle: 'دليل الامتثال والإجراءات بالذكاء الاصطناعي',
    assistant_banner_title: 'ما هو سؤال السلامة الذي يمكنني مساعدتك به؟',
    assistant_banner_sub: 'اسأل عن إجراءات التشغيل القياسية المعتمدة في مركز دبي، أو متطلبات الوقاية الشخصية، أو إبلاغ المخاطر.',
    ask_placeholder: 'اطرح سؤالاً عن السلامة أو الإجراءات...',
    emergency_note: 'في حالات الخطر المباشر أو الطوارئ، اتبع إجراءات الطوارئ الخاصة بموقعك فوراً.',
    approved_sources: 'المصادر المعتمدة',
    q1: 'أين أجد إجراءات معدات الوقاية الشخصية؟',
    q2: 'كيف أبلغ عن خطر داخل المستودع؟',
    q3: 'أين هو إجراء الإخلاء في حالات الطوارئ؟',
    q4: 'ما هي التدريبات التي لا يزال علي إكمالها؟',

    alerts_sub: 'التنبيهات، المهام والتذكيرات',
    activity_feed: 'سجل النشاط',
    all_caught_up: 'أنت على اطلاع بكل جديد',
    new_badge: (count) => `${count} جديد`,
    mark_all_read: 'تحديد الكل كمقروء',
    no_notifications: 'لا توجد إشعارات',
    no_notifications_sub: 'لقد اطلعت على جميع التنبيهات.',

    profile_title: 'الملف التعريفي للموظف',
    profile_subtitle: 'الحساب والتفضيلات والشهادات المعتمدة',
    supervisor_label: 'المشرف المباشر',
    work_email_label: 'بريد العمل',
    preferred_language: 'اللغة المفضلة',
    notification_preferences: 'تفضيلات الإشعارات',
    pref_assignments: 'تكليفات التدريب الجديدة',
    pref_due_reminders: 'تذكيرات مواعيد الاستحقاق',
    pref_assessments: 'نتائج الاختبارات',
    pref_expiry: 'تنبيهات تجديد المؤهلات',
    accessibility_title: 'إمكانية الوصول والعرض',
    reduced_motion: 'تقليل الحركة في الرسوم المتحركة',
    sign_out: 'تسجيل الخروج',

    certificates_title: 'الشهادات والمؤهلات',
    certificates_subtitle: 'وثائق الامتثال الرسمية للسلامة المهنية',
    official_certificate: 'شهادة رسمية',
    download_pdf: 'تحميل الشهادة بصيغة PDF',
    credential_id: 'رقم الاعتماد',
    issue_date: 'تاريخ الإصدار',
    expiry_date: 'تاريخ الانتهاء',
    resources_title: 'موارد السلامة وإجراءات التشغيل',
    resources_subtitle: 'الإجراءات المعتمدة، كتيبات الطوارئ وجهات الاتصال',
    download_guide: 'فتح الإجراء (PDF)',
    call_support: 'الاتصال المباشر',
  },

  'हिन्दी': {
    home: 'होम',
    my_training: 'मेरा प्रशिक्षण',
    safety_assistant: 'सुरक्षा सहायक',
    profile: 'प्रोफ़ाइल',

    good_morning: 'शुभ प्रभात',
    user_name: 'राहफ',
    notifications: 'सूचनाएं',
    view_all: 'सभी देखें',
    mandatory: 'अनिवार्य',
    due: 'देय',
    progress: 'प्रगति',
    completed: 'पूर्ण',
    in_progress: 'प्रगति पर है',
    due_this_week: 'इस सप्ताह देय',
    not_started: 'शुरू नहीं हुआ',
    overdue: 'अतिदेय',
    all: 'सभी',
    search_placeholder: 'प्रशिक्षण मॉड्यूल, एसओपी, पीपीई खोजें...',
    back: 'वापस',

    login_tagline_badge: 'सटीकता और गति',
    login_subheading: 'लॉजिस्टिक्स सुरक्षा प्रशिक्षण मंच',
    login_quote: '“सुरक्षित आदतें अपनाएं, हर शिफ्ट के साथ।”',
    dubai_dc: 'दुबई वितरण केंद्र',
    live_sync: 'लाइव सिंक',
    instant_demo: 'त्वरित डेमो',
    or_sign_in: 'या आईडी से लॉगिन करें',
    employee_id_label: 'कर्मचारी आईडी या कार्य ईमेल',
    employee_id_placeholder: 'उदा. EMP-89420',
    password_label: 'पासवर्ड',
    forgot_password: 'पासवर्ड भूल गए?',
    remember_terminal: 'इस टर्मिनल को याद रखें',
    sign_in_button: 'SHIFT में लॉगिन करें',
    signing_in: 'लॉगिन हो रहा है...',
    supervisor_support: 'शिफ्ट पर्यवेक्षक सहायता',
    support_desc: 'बैज या लॉगिन समस्याओं के लिए सीधे कंट्रोल रूम से संपर्क करें',

    forgot_pw_title: 'पासवर्ड रीसेट करें',
    forgot_pw_subtitle: 'दुबई डीसी सुरक्षा एवं पहचान सत्यापन',
    reset_method_label: 'पुनर्प्राप्ति विधि चुनें',
    reset_method_supervisor: 'पर्यवेक्षक मार्कस वेंस को रीसेट अनुरोध भेजें',
    reset_method_sms: 'मोबाइल पर 6-अंकीय ओटीपी भेजें (+971 50 492 8810)',
    send_reset_code: 'सत्यापन कोड भेजें',
    sending_code: 'कोड भेजा जा रहा है...',
    reset_sent_title: 'रीसेट कोड भेज दिया गया',
    reset_sent_desc: 'एक 6-अंकीय सत्यापन कोड जारी किया गया है। नीचे कोड दर्ज करें या अपने पर्यवेक्षक से संपर्क करें।',
    enter_code_placeholder: '6-अंकीय पिन दर्ज करें (उदा. 849201)',
    verify_code: 'सत्यापित करें और पासवर्ड रीसेट करें',
    return_to_login: 'लॉगिन पर वापस जाएं',

    continue_learning: 'प्रशिक्षण जारी रखें',
    lesson_counter: (current, total) => `पाठ ${current} / ${total}`,
    resume_training: 'प्रशिक्षण फिर से शुरू करें',
    next_up_heading: 'अगला और अनिवार्य कार्य',
    safety_tip_title: 'शिफ्ट की सुरक्षा सलाह',
    safety_tip_body: 'ऑपरेटिंग रीच ट्रक और फोर्कलिफ्ट के चारों ओर हमेशा 3 मीटर की सख्त सुरक्षा दूरी बनाए रखें। बिना आई कॉन्टैक्ट के कभी भी पीछे मुड़ते वाहन के पीछे न जाएं।',
    my_certificates: 'मेरे प्रमाणपत्र',
    credentials_count: (count) => `${count} प्रमाणपत्र`,
    safety_resources: 'सुरक्षा संसाधन',
    resources_count: (count) => `${count} एसओपी और गाइड`,

    course_overview: 'पाठ्यक्रम अवलोकन',
    assigned_modules_sub: 'आवंटित सुरक्षा मॉड्यूल और अनुपालन',
    start_training: 'प्रशिक्षण शुरू करें',
    review_course: 'पाठ्यक्रम समीक्षा',
    syllabus: 'पाठ्यक्रम रूपरेखा',
    prerequisites: 'पूर्वापेक्षाएँ और पीपीई आवश्यकताएँ',
    certificate_on_pass: 'उत्तीर्ण होने पर प्रमाणपत्र',
    course_completed: 'सफलतापूर्वक पूर्ण',

    safety_assistant_title: 'SHIFT सुरक्षा सहायक',
    safety_assistant_subtitle: 'एआई अनुपालन और प्रक्रिया गाइड',
    assistant_banner_title: 'मैं किस सुरक्षा प्रश्न में आपकी मदद कर सकता हूँ?',
    assistant_banner_sub: 'दुबई डीसी के स्वीकृत एसओपी, पीपीई आवश्यकताओं या खतरा रिपोर्टिंग के बारे में पूछें।',
    ask_placeholder: 'सुरक्षा या प्रक्रिया संबंधी प्रश्न पूछें...',
    emergency_note: 'किसी भी तत्काल खतरे या आपात स्थिति के लिए, अपनी साइट की आपातकालीन प्रक्रिया का पालन करें।',
    approved_sources: 'स्वीकृत स्रोत',
    q1: 'मुझे पीपीई प्रक्रिया कहाँ मिल सकती है?',
    q2: 'मैं गोदाम में खतरे की रिपोर्ट कैसे करूँ?',
    q3: 'आपातकालीन निकासी प्रक्रिया कहाँ है?',
    q4: 'मुझे अभी कौन सा प्रशिक्षण पूरा करना है?',

    alerts_sub: 'अलर्ट, असाइनमेंट और अनुस्मारक',
    activity_feed: 'गतिविधि फ़ीड',
    all_caught_up: 'सब कुछ अद्यतित है',
    new_badge: (count) => `${count} नए`,
    mark_all_read: 'सभी पढ़े हुए चिह्नित करें',
    no_notifications: 'कोई नई सूचना नहीं',
    no_notifications_sub: 'आपने अपने सभी अलर्ट देख लिए हैं।',

    profile_title: 'कर्मचारी प्रोफ़ाइल',
    profile_subtitle: 'खाता, प्राथमिकताएं और सुरक्षा क्रेडेंशियल',
    supervisor_label: 'पर्यवेक्षक',
    work_email_label: 'कार्य ईमेल',
    preferred_language: 'पसंदीदा भाषा',
    notification_preferences: 'सूचना प्राथमिकताएं',
    pref_assignments: 'प्रशिक्षण असाइनमेंट',
    pref_due_reminders: 'नियत तारीख अनुस्मारक',
    pref_assessments: 'मूल्यांकन परिणाम',
    pref_expiry: 'योग्यता नवीनीकरण अनुस्मारक',
    accessibility_title: 'अभिगम्यता और प्रदर्शन',
    reduced_motion: 'कम गति एनिमेशन',
    sign_out: 'साइन आउट',

    certificates_title: 'प्रमाणपत्र और योग्यताएं',
    certificates_subtitle: 'आधिकारिक सुरक्षा अनुपालन क्रेडेंशियल',
    official_certificate: 'आधिकारिक प्रमाणपत्र',
    download_pdf: 'पीडीएफ प्रमाणपत्र डाउनलोड करें',
    credential_id: 'क्रेडेंशियल आईडी',
    issue_date: 'जारी करने की तारीख',
    expiry_date: 'समाप्ति तारीख',
    resources_title: 'सुरक्षा संसाधन और एसओपी',
    resources_subtitle: 'आधिकारिक प्रक्रियाएं, आपातकालीन नियमावली और संपर्क',
    download_guide: 'प्रक्रिया पीडीएफ खोलें',
    call_support: 'संपर्क करें',
  },

  'اردو': {
    home: 'ہوم',
    my_training: 'میری تربیت',
    safety_assistant: 'حفاظتی معاون',
    profile: 'پروفائل',

    good_morning: 'صبح بخیر',
    user_name: 'رہف',
    notifications: 'اطلاعات',
    view_all: 'سب دیکھیں',
    mandatory: 'لازمی',
    due: 'آخری تاریخ',
    progress: 'پیش رفت',
    completed: 'مکمل',
    in_progress: 'جاری ہے',
    due_this_week: 'اس ہفتے واجب',
    not_started: 'شروع نہیں ہوا',
    overdue: 'معیاد ختم',
    all: 'سب',
    search_placeholder: 'تربیتی ماڈیولز، ایس او پیز، پی پی ای تلاش کریں...',
    back: 'واپس',

    login_tagline_badge: 'حرکت میں درستگی',
    login_subheading: 'لاجسٹکس ٹریننگ اور سیفٹی پلیٹ فارم',
    login_quote: '”محفوظ عادات بنائیں، ہر شفٹ کے ساتھ۔“',
    dubai_dc: 'دبئی ڈسٹری بیوشن سینٹر',
    live_sync: 'لائیو سنک',
    instant_demo: 'فوری ڈیمو',
    or_sign_in: 'یا آئی ڈی کے ساتھ سائن ان کریں',
    employee_id_label: 'ملازم کی شناخت یا دفتری ای میل',
    employee_id_placeholder: 'مثلاً EMP-89420',
    password_label: 'پاس ورڈ',
    forgot_password: 'پاس ورڈ بھول گئے؟',
    remember_terminal: 'اس ٹرمینل کو یاد رکھیں',
    sign_in_button: 'SHIFT میں سائن ان کریں',
    signing_in: 'سائن ان ہو رہا ہے...',
    supervisor_support: 'شفٹ سپروائزر سپورٹ',
    support_desc: 'کارڈ یا لاگ ان کے مسائل کے لیے دبئی ڈی سی کنٹرول روم سے رابطہ کریں',

    forgot_pw_title: 'پاس ورڈ ری سیٹ کریں',
    forgot_pw_subtitle: 'دبئی ڈی سی سیکیورٹی اور شناخت کی تصدیق',
    reset_method_label: 'بحالی کا طریقہ منتخب کریں',
    reset_method_supervisor: 'سپروائزر مارکس وینس کو ری سیٹ کی درخواست بھیجیں',
    reset_method_sms: 'موبائل پر 6 ہندسوں کا او ٹی پی بھیجیں (+971 50 492 8810)',
    send_reset_code: 'تصدیقی کوڈ بھیجیں',
    sending_code: 'کوڈ بھیجا جا رہا ہے...',
    reset_sent_title: 'ری سیٹ کوڈ بھیج دیا گیا',
    reset_sent_desc: '6 ہندسوں کا تصدیقی کوڈ جاری کر دیا گیا ہے۔ نیچے کوڈ درج کریں یا اپنے سپروائزر سے رجوع کریں۔',
    enter_code_placeholder: '6 ہندسوں کا پن درج کریں (مثلاً 849201)',
    verify_code: 'تصدیق کریں اور عارضی پاس ورڈ سیٹ کریں',
    return_to_login: 'سائن ان پر واپس جائیں',

    continue_learning: 'تربیت جاری رکھیں',
    lesson_counter: (current, total) => `سبق ${current} از ${total}`,
    resume_training: 'تربیت دوبارہ شروع کریں',
    next_up_heading: 'اگلا اور واجب الادا',
    safety_tip_title: 'شفٹ کی حفاظتی نصیحت',
    safety_tip_body: 'کام کرنے والے فورک لفٹ اور ریچ ٹرک کے ارد گرد ہمیشہ 3 میٹر کا حفاظتی فاصلہ رکھیں۔ نظروں کے رابطے کے بغیر کبھی بھی پیچھے ہٹنے والی گاڑی کے پیچھے سے نہ گزریں۔',
    my_certificates: 'میری اسناد',
    credentials_count: (count) => `${count} اسناد`,
    safety_resources: 'حفاظتی وسائل',
    resources_count: (count) => `${count} ایس او پیز اور گائیڈز`,

    course_overview: 'کورس کا جائزہ',
    assigned_modules_sub: 'تفویض کردہ تربیتی ماڈیولز اور تعمیل',
    start_training: 'تربیت شروع کریں',
    review_course: 'کورس کا جائزہ لیں',
    syllabus: 'کورس کا نصاب',
    prerequisites: 'لازمی تقاضے اور پی پی ای',
    certificate_on_pass: 'کامیابی پر سند',
    course_completed: 'کامیابی سے مکمل',

    safety_assistant_title: 'SHIFT حفاظتی معاون',
    safety_assistant_subtitle: 'اے آئی تعمیل اور طریقہ کار گائیڈ',
    assistant_banner_title: 'میں حفاظت کے کس سوال میں آپ کی مدد کر سکتا ہوں؟',
    assistant_banner_sub: 'دبئی ڈی سی کے منظور شدہ ایس او پیز، پی پی ای کے تقاضوں، یا خطرات کی رپورٹنگ کے بارے میں پوچھیں۔',
    ask_placeholder: 'حفاظت یا طریقہ کار سے متعلق سوال پوچھیں...',
    emergency_note: 'فوری خطرے یا ہنگامی صورتحال کے لیے، فوری طور پر اپنی سائٹ کے ہنگامی طریقہ کار پر عمل کریں۔',
    approved_sources: 'منظور شدہ ذرائع',
    q1: 'مجھے پی پی ای کا طریقہ کار کہاں مل سکتا ہے؟',
    q2: 'میں گودام میں خطرے کی اطلاع کیسے دوں؟',
    q3: 'ہنگامی انخلاء کا طریقہ کار کہاں ہے؟',
    q4: 'مجھے ابھی کون سی تربیت مکمل کرنی ہے؟',

    alerts_sub: 'انتباہات، اسائنمنٹس اور یاد دہانیاں',
    activity_feed: 'سرگرمی فیڈ',
    all_caught_up: 'سب اپ ڈیٹ ہے',
    new_badge: (count) => `${count} نئے`,
    mark_all_read: 'سب پڑھا ہوا نشان زد کریں',
    no_notifications: 'کوئی نئی اطلاع نہیں',
    no_notifications_sub: 'آپ نے تمام الرٹس دیکھ لیے ہیں۔',

    profile_title: 'ملازم کا پروفائل',
    profile_subtitle: 'اکاؤنٹ، ترجیحات اور حفاظتی اسناد',
    supervisor_label: 'نگران (سپروائزر)',
    work_email_label: 'دفتری ای میل',
    preferred_language: 'پسندیدہ زبان',
    notification_preferences: 'اطلاعات کی ترجیحات',
    pref_assignments: 'تربیتی اسائنمنٹس',
    pref_due_reminders: 'مقررہ تاریخ کی یاد دہانیاں',
    pref_assessments: 'ٹیسٹ کے نتائج',
    pref_expiry: 'تجدید کی یاد دہانیاں',
    accessibility_title: 'رسائی اور ڈسپلے',
    reduced_motion: 'کم اینیمیشن حرکت',
    sign_out: 'سائن آؤٹ',

    certificates_title: 'اسناد اور قابلیتیں',
    certificates_subtitle: 'سرکاری حفاظتی تعمیل کی اسناد',
    official_certificate: 'سرکاری سند',
    download_pdf: 'پی ڈی ایف سرٹیفکیٹ ڈاؤن لوڈ کریں',
    credential_id: 'سند کا نمبر',
    issue_date: 'تاریخ اجرا',
    expiry_date: 'تاریخ تنسیخ',
    resources_title: 'حفاظتی وسائل اور ایس او پیز',
    resources_subtitle: 'سرکاری طریقہ کار، ہنگامی دستی کتابچے اور رابطے',
    download_guide: 'پی ڈی ایف کھولیں',
    call_support: 'کال کریں',
  }
};

export const useT = (language: Language): Translations => {
  return translations[language] || translations.English;
};
