import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Certificate, SafetyResource, AppNotification, UserProfile, Language, NotificationPreferences } from '../types/safety';
import { initialUserProfile, initialCourses, initialCertificates, initialResources, initialNotifications } from '../data/mockData';

export type ScreenType = 
  | 'login'
  | 'home'
  | 'my_training'
  | 'course_details'
  | 'learning_player'
  | 'assessment'
  | 'results'
  | 'certificates'
  | 'resources'
  | 'profile'
  | 'safety_assistant'
  | 'notifications';

export type BottomNavTab = 'home' | 'my_training' | 'safety_assistant' | 'profile';

interface AppContextType {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  activeTab: BottomNavTab;
  setActiveTab: (tab: BottomNavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  courses: Course[];
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  certificates: Certificate[];
  resources: SafetyResource[];
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  acknowledgeLessonPolicy: (courseId: string, lessonId: string) => void;
  submitAssessment: (courseId: string, score: number, passed: boolean) => void;
  resetCourseProgress: (courseId: string) => void;
  chatMessages: Array<{ role: 'user' | 'assistant'; text: string; sources?: Array<{ title: string; section: string; version: string }> }>;
  sendChatMessage: (text: string) => Promise<void>;
  isChatLoading: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [activeTab, setActiveTab] = useState<BottomNavTab>('home');
  const [language, setLanguage] = useState<Language>('English');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('shift_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-1');
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [resources] = useState<SafetyResource[]>(initialResources);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    trainingAssignments: true,
    dueDateReminders: true,
    assessmentUpdates: true,
    qualificationExpiry: true,
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; sources?: Array<{ title: string; section: string; version: string }> }>>([
    {
      role: 'assistant',
      text: 'Hello Alex! I am your SHIFT Safety Assistant. What safety question or procedure can I help with today?',
      sources: [
        { title: 'Dubai Distribution Centre Safety Handbook', section: 'Overview', version: 'v4.0' }
      ]
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('shift_courses', JSON.stringify(courses));
  }, [courses]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
    showToast('Profile updated successfully');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const updateNotificationPreferences = (prefs: Partial<NotificationPreferences>) => {
    setNotificationPreferences(prev => ({ ...prev, ...prefs }));
    showToast('Notification preferences saved');
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const updatedLessons = c.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l);
      const completedCount = updatedLessons.filter(l => l.completed).length;
      const progress = Math.round((completedCount / c.lessonsCount) * 100);
      const status = progress === 100 ? 'completed' : 'in_progress';
      return {
        ...c,
        lessons: updatedLessons,
        completedLessonsCount: completedCount,
        progress,
        status: status as any
      };
    }));
  };

  const acknowledgeLessonPolicy = (courseId: string, lessonId: string) => {
    completeLesson(courseId, lessonId);
    showToast('Policy acknowledgment recorded successfully');
  };

  const submitAssessment = (courseId: string, score: number, passed: boolean) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const progress = passed ? 100 : c.progress;
      const status = passed ? 'completed' : c.status;
      return {
        ...c,
        score,
        passed,
        progress,
        status: status as any
      };
    }));

    if (passed) {
      // Add certificate if not already present
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const newCert: Certificate = {
          id: `cert-${Date.now()}`,
          courseId,
          title: course.title,
          issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'valid',
          credentialNumber: `SHF-DXB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          issuer: 'Dubai Distribution Centre Safety Directorate',
          type: 'internal_course'
        };
        setCertificates(prev => [newCert, ...prev]);
      }
    }
  };

  const resetCourseProgress = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        progress: 0,
        status: 'not_started',
        completedLessonsCount: 0,
        passed: undefined,
        score: undefined,
        lessons: c.lessons.map(l => ({ ...l, completed: false }))
      };
    }));
    showToast('Course progress reset');
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text };
    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/safety-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: data.response || 'Please follow standard site safety protocol or contact your supervisor.',
        sources: data.sources || []
      }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: 'I am currently operating in offline backup mode. For immediate safety guidance, refer to SOP-LOG-402 or contact the Site Safety Officer at +971 4 800 5541.',
        sources: [{ title: 'Warehouse Safety Essentials', section: 'General', version: 'v4.2' }]
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      screen,
      setScreen,
      activeTab,
      setActiveTab,
      language,
      setLanguage,
      isLoggedIn,
      setIsLoggedIn,
      userProfile,
      updateUserProfile,
      courses,
      selectedCourseId,
      setSelectedCourseId,
      certificates,
      resources,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      notificationPreferences,
      updateNotificationPreferences,
      reducedMotion,
      setReducedMotion,
      completeLesson,
      acknowledgeLessonPolicy,
      submitAssessment,
      resetCourseProgress,
      chatMessages,
      sendChatMessage,
      isChatLoading,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
