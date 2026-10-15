import { Course, Certificate, SafetyResource, AppNotification, UserProfile } from '../types/safety';

export const initialUserProfile: UserProfile = {
  name: 'Rahaf',
  id: 'EMP-89420',
  role: 'Warehouse Operator',
  location: 'Dubai Distribution Centre',
  supervisor: 'Marcus Vance (Shift Lead)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  email: 'rahaf@shift-logistics.ae',
  phone: '+971 50 492 8810',
};

export const initialCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Warehouse Safety Essentials',
    description: 'Foundational safety practices, pedestrian pathways, hazard identification, and personal protective equipment protocols.',
    category: 'Mandatory',
    isMandatory: true,
    duration: '20 min',
    dueDate: 'Today',
    progress: 40,
    status: 'in_progress',
    lessonsCount: 5,
    completedLessonsCount: 2,
    languages: ['English', 'العربية', 'हिन्दी', 'اردو'],
    topics: [
      'Recognizing warehouse hazards',
      'Choosing appropriate PPE',
      'Moving safely around equipment',
      'Reporting hazards and incidents',
      'Knowledge assessment'
    ],
    requirements: [
      'Complete all learning lessons',
      'Acknowledge the safety policy',
      'Pass the knowledge assessment with at least 80%',
      'Complete supervisor practical sign-off'
    ],
    lessons: [
      {
        id: 'l-1',
        title: '1. Recognizing warehouse hazards',
        duration: '4 min',
        type: 'illustrated',
        content: 'Identify common industrial hazards including obstructed aisles, spillages, unstacked pallets, and blind corners around racking zones.',
        illustrationUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
        completed: true,
      },
      {
        id: 'l-2',
        title: '2. Choosing appropriate PPE',
        duration: '3 min',
        type: 'illustrated',
        content: 'Mandatory personal protective equipment includes CSA-approved steel-toe safety footwear, high-visibility reflective vests, and cut-resistant gloves when handling strapping.',
        illustrationUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
        completed: true,
      },
      {
        id: 'l-3',
        title: '3. Moving safely around equipment',
        duration: '5 min',
        type: 'video',
        content: 'Pedestrians must maintain a strict 3-meter safety buffer from active forklifts and reach trucks. Always make eye contact with operators before crossing intersections.',
        illustrationUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800',
        requiresAcknowledgment: true,
        completed: false,
      },
      {
        id: 'l-4',
        title: '4. Reporting hazards and incidents',
        duration: '4 min',
        type: 'interactive',
        content: 'Use the SHIFT app or notify your floor supervisor immediately upon discovering damaged racking or near-miss incidents. Do not attempt makeshift repairs.',
        illustrationUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
        completed: false,
      },
      {
        id: 'l-5',
        title: '5. Knowledge assessment',
        duration: '4 min',
        type: 'interactive',
        content: 'Test your understanding of warehouse safety essentials with 5 scenario-based questions.',
        completed: false,
      }
    ],
    assessment: [
      {
        id: 'q-1',
        scenario: 'You notice wooden pallets and shrink-wrap packaging blocking a marked yellow pedestrian walkway near Bay 12.',
        question: 'What is the correct immediate action?',
        options: [
          'Step over the packaging carefully and continue walking',
          'Stop, clear the walkway immediately or report the obstruction via SHIFT',
          'Wait for the shift supervisor to notice it during their hourly walkthrough',
          'Push the packaging out of sight behind the nearest shelving unit'
        ],
        correctAnswerIndex: 1,
        explanation: 'Marked pedestrian walkways must remain completely clear of obstructions to prevent slips, trips, and collisions with transit equipment.'
      },
      {
        id: 'q-2',
        scenario: 'An electric forklift is approaching a blind intersection in Zone B.',
        question: 'What is the required pedestrian protocol at blind corners?',
        options: [
          'Sound your voice and run across quickly before the forklift arrives',
          'Pause at the convex mirror, verify the route is clear, and maintain 3m distance',
          'Assume the forklift operator sees you and proceed without stopping',
          'Wave your arms to force the forklift to reverse'
        ],
        correctAnswerIndex: 1,
        explanation: 'Always check convex mirrors, stop at intersection thresholds, and ensure eye contact or clear distance before proceeding.'
      },
      {
        id: 'q-3',
        question: 'Which piece of PPE is mandatory for all personnel entering active warehouse floor areas?',
        options: [
          'Hard hat and welding goggles',
          'Steel-toe safety boots and high-visibility vest',
          'Full chemical hazard respirator suit',
          'Ear plugs and insulated winter gloves'
        ],
        correctAnswerIndex: 1,
        explanation: 'Steel-toe boots and high-visibility reflective vests are mandatory baseline PPE across all Dubai Distribution Centre operational zones.'
      },
      {
        id: 'q-4',
        scenario: 'You observe a minor chemical leak dripping from a container on an upper rack shelf.',
        question: 'What should you do first?',
        options: [
          'Attempt to wipe it up with a paper towel immediately',
          'Evacuate the immediate sector, alert the floor safety warden, and establish a barrier',
          'Ignore it unless liquid is pooling on the floor',
          'Spray water onto the leak to dilute it'
        ],
        correctAnswerIndex: 1,
        explanation: 'For chemical leaks, do not touch or dilute without proper hazardous material protocols. Secure the area and alert safety wardens immediately.'
      },
      {
        id: 'q-5',
        question: 'What is the recommended safe lifting technique for heavy cartons?',
        options: [
          'Bend at the waist with straight legs and jerk upward quickly',
          'Keep feet close together and twist while lifting',
          'Bend at the knees, keep load close to your body, and lift with leg muscles',
          'Ask another worker to toss the carton across the table'
        ],
        correctAnswerIndex: 2,
        explanation: 'Always bend at the knees, keep the load close to your center of gravity, and lift smoothly using your leg strength.'
      }
    ],
    passed: false,
    practicalPending: false
  },
  {
    id: 'course-2',
    title: 'Manual Handling Basics',
    description: 'Ergonomic lifting principles, team lifts, pallet loading techniques, and injury prevention in logistics.',
    category: 'Mandatory',
    isMandatory: true,
    duration: '15 min',
    dueDate: 'Tomorrow',
    progress: 0,
    status: 'overdue',
    lessonsCount: 4,
    completedLessonsCount: 0,
    languages: ['English', 'العربية', 'हिन्दी', 'اردو'],
    topics: ['Center of gravity', 'Team lifting protocols', 'Mechanical aids'],
    requirements: ['Complete all lessons', 'Pass assessment (80%)'],
    lessons: [
      { id: 'mh-1', title: '1. Ergonomics and Spine Mechanics', duration: '4 min', type: 'illustrated', content: 'Understanding load limits and leverage.', completed: false },
      { id: 'mh-2', title: '2. Step-by-Step Lift Procedure', duration: '4 min', type: 'illustrated', content: 'Testing load weight before lifting.', completed: false }
    ],
    assessment: [
      {
        id: 'mh-q1',
        question: 'What is the maximum recommended weight for a single-person lift without mechanical assistance under warehouse guidelines?',
        options: ['15 kg', '23 kg', '35 kg', '50 kg'],
        correctAnswerIndex: 1,
        explanation: 'Loads exceeding 23 kg require team lifting or mechanical lifting aids.'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Forklift Awareness & Traffic Safety',
    description: 'Understanding forklift blind spots, pedestrian right-of-way, horn signals, and loading dock safety rules.',
    category: 'Equipment',
    isMandatory: true,
    duration: '25 min',
    dueDate: 'Friday',
    progress: 0,
    status: 'not_started',
    lessonsCount: 6,
    completedLessonsCount: 0,
    languages: ['English', 'العربية', 'اردو'],
    topics: ['Forklift blind spots', 'Intersection protocols', 'Warning beacons'],
    requirements: ['Complete lessons', 'Pass assessment', 'Practical supervisor sign-off'],
    lessons: [],
    assessment: [],
    practicalPending: true
  },
  {
    id: 'course-4',
    title: 'Fire Safety and Evacuation',
    description: 'Evacuation routes, assembly point locations, fire extinguisher classifications, and alarm response.',
    category: 'Emergency',
    isMandatory: true,
    duration: '15 min',
    dueDate: 'Next week',
    progress: 100,
    status: 'completed',
    lessonsCount: 4,
    completedLessonsCount: 4,
    languages: ['English', 'العربية', 'हिन्दी', 'اردو'],
    topics: ['Alarm types', 'Assembly points', 'Extinguisher PASS method'],
    requirements: ['Complete lessons', 'Pass assessment'],
    lessons: [],
    assessment: [],
    passed: true,
    score: 100
  },
  {
    id: 'course-5',
    title: 'Personal Protective Equipment (PPE)',
    description: 'Inspection, fitting, maintenance, and mandatory wearing areas for all site safety equipment.',
    category: 'Mandatory',
    isMandatory: false,
    duration: '12 min',
    dueDate: 'In 2 weeks',
    progress: 100,
    status: 'completed',
    lessonsCount: 3,
    completedLessonsCount: 3,
    languages: ['English', 'العربية', 'हिन्दी', 'اردو'],
    topics: ['Boots and vests', 'Eye protection', 'Hearing protection'],
    requirements: ['Complete lessons', 'Pass assessment'],
    lessons: [],
    assessment: [],
    passed: true,
    score: 90
  },
  {
    id: 'course-6',
    title: 'Loading Bay & Dock Safety',
    description: 'Dock locks, wheel chocks, trailer stabilization, and ramp safety during loading operations.',
    category: 'Equipment',
    isMandatory: true,
    duration: '18 min',
    dueDate: 'In 3 weeks',
    progress: 0,
    status: 'not_started',
    lessonsCount: 4,
    completedLessonsCount: 0,
    languages: ['English', 'العربية'],
    topics: ['Wheel chocks', 'Dock plate security', 'Trailer creep prevention'],
    requirements: ['Complete lessons', 'Pass assessment'],
    lessons: [],
    assessment: []
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-1',
    courseId: 'course-4',
    title: 'Fire Safety and Evacuation',
    issueDate: '10 Jan 2026',
    expiryDate: '10 Jan 2027',
    status: 'valid',
    credentialNumber: 'SHF-DXB-2026-9041',
    issuer: 'Dubai Distribution Centre Safety Directorate',
    type: 'internal_course',
  },
  {
    id: 'cert-2',
    courseId: 'course-5',
    title: 'Personal Protective Equipment (PPE)',
    issueDate: '15 Feb 2026',
    expiryDate: '15 Feb 2027',
    status: 'valid',
    credentialNumber: 'SHF-DXB-2026-4421',
    issuer: 'SHIFT Compliance Academy',
    type: 'internal_course',
  },
  {
    id: 'cert-3',
    courseId: 'cert-ext-1',
    title: 'First Aid & CPR Level 2',
    issueDate: '20 Mar 2025',
    expiryDate: '28 Oct 2026',
    status: 'expiring_soon',
    credentialNumber: 'FA-DXB-88102',
    issuer: 'Emirates Red Crescent Safety Training',
    type: 'external_qualification',
  },
  {
    id: 'cert-4',
    courseId: 'course-3',
    title: 'Forklift Operator Qualification',
    issueDate: 'Pending Practical Sign-off',
    expiryDate: 'Pending',
    status: 'pending_verification',
    credentialNumber: 'PENDING-FORKLIFT',
    issuer: 'Warehouse Operations Supervisor',
    type: 'external_qualification',
  }
];

export const initialResources: SafetyResource[] = [
  {
    id: 'res-1',
    title: 'Standard Operating Procedure: Warehouse Pedestrian Traffic',
    category: 'SOPs',
    language: 'English',
    version: 'v4.2',
    updatedDate: '01 Oct 2026',
    description: 'Comprehensive guidelines on designated walkways, blind spot mirrors, and high-visibility requirements across zones A to F.',
    fileSize: '2.4 MB'
  },
  {
    id: 'res-2',
    title: 'Hazard Reporting & Near-Miss Protocol',
    category: 'Policies',
    language: 'English',
    version: 'v3.0',
    updatedDate: '15 Aug 2026',
    description: 'Step-by-step instructions on documenting hazards in SHIFT, tagging damaged equipment, and worker whistleblower protection.',
    fileSize: '1.1 MB'
  },
  {
    id: 'res-3',
    title: 'Emergency Assembly Points & Evacuation Map',
    category: 'Emergency Contacts',
    language: 'English',
    version: 'v5.1',
    updatedDate: '10 Sep 2026',
    description: 'Detailed site map showing Assembly Points A, B, and C, fire warden contacts, and primary exit routes.',
    fileSize: '4.8 MB'
  },
  {
    id: 'res-4',
    title: 'Site Safety Officer - Marcus Vance',
    category: 'Emergency Contacts',
    language: 'English',
    version: 'Current',
    updatedDate: 'Live',
    description: 'Primary point of contact for urgent safety escalations, incident investigation, and PPE replacements.',
    contactNumber: '+971 4 800 5541',
    role: 'Site Safety Officer'
  },
  {
    id: 'res-5',
    title: 'Shift Supervisor Control Room',
    category: 'Emergency Contacts',
    language: 'English',
    version: 'Current',
    updatedDate: 'Live',
    description: '24/7 internal logistics control room for immediate spill response and equipment stoppages.',
    contactNumber: '+971 4 800 5599',
    role: 'Control Room'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Course Assigned',
    message: 'New mandatory course assigned: Manual Handling Basics. Due tomorrow.',
    time: '2h ago',
    read: false,
    type: 'assignment',
    linkScreen: 'course_details',
    courseId: 'course-2'
  },
  {
    id: 'notif-2',
    title: 'Due Date Reminder',
    message: 'Warehouse Safety Essentials is due today. Complete Lesson 3 & 4.',
    time: '5h ago',
    read: false,
    type: 'reminder',
    linkScreen: 'course_details',
    courseId: 'course-1'
  },
  {
    id: 'notif-3',
    title: 'Qualification Expiring Soon',
    message: 'Your First Aid & CPR Level 2 qualification expires in 15 days.',
    time: '2d ago',
    read: true,
    type: 'expiry',
    linkScreen: 'certificates'
  },
  {
    id: 'notif-4',
    title: 'Safety Tip of the Day',
    message: 'Always check your load weight before lifting. Keep your back straight and lift with your knees.',
    time: '3d ago',
    read: true,
    type: 'system'
  }
];
