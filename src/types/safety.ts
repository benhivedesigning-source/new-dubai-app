export type Language = 'English' | 'العربية' | 'हिन्दी' | 'اردو';

export type CourseStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'illustrated' | 'interactive' | 'policy';
  content: string;
  illustrationUrl?: string;
  requiresAcknowledgment?: boolean;
  completed: boolean;
}

export interface Question {
  id: string;
  scenario?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Mandatory' | 'Refresher' | 'Equipment' | 'Emergency';
  isMandatory: boolean;
  duration: string;
  dueDate: string;
  progress: number; // 0 to 100
  status: CourseStatus;
  lessonsCount: number;
  completedLessonsCount: number;
  languages: Language[];
  topics: string[];
  requirements: string[];
  lessons: Lesson[];
  assessment: Question[];
  passed?: boolean;
  score?: number;
  practicalPending?: boolean;
}

export interface Certificate {
  id: string;
  courseId: string;
  title: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring_soon' | 'expired' | 'pending_verification';
  credentialNumber: string;
  issuer: string;
  type: 'internal_course' | 'external_qualification';
}

export interface SafetyResource {
  id: string;
  title: string;
  category: 'SOPs' | 'Emergency Contacts' | 'Quick Guides' | 'Policies';
  language: Language;
  version: string;
  updatedDate: string;
  description: string;
  fileSize?: string;
  contactNumber?: string;
  role?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'assignment' | 'reminder' | 'assessment' | 'expiry' | 'system';
  linkScreen?: string;
  courseId?: string;
}

export interface UserProfile {
  name: string;
  id: string;
  role: string;
  location: string;
  supervisor: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface NotificationPreferences {
  trainingAssignments: boolean;
  dueDateReminders: boolean;
  assessmentUpdates: boolean;
  qualificationExpiry: boolean;
}
