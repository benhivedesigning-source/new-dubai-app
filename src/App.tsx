/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/Toast';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { MyTrainingScreen } from './components/MyTrainingScreen';
import { CourseDetailsScreen } from './components/CourseDetailsScreen';
import { LearningPlayerScreen } from './components/LearningPlayerScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SafetyAssistantScreen } from './components/SafetyAssistantScreen';
import { CertificatesScreen } from './components/CertificatesScreen';
import { ResourcesScreen } from './components/ResourcesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { Wifi, Battery, Signal } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <div className="bg-[#172321] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold select-none z-50 shrink-0 w-full relative overflow-hidden">
      <span>9:41</span>
      {/* Dynamic island notch */}
      <div className="w-24 h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#111] absolute right-3"></div>
        <div className="w-2 h-2 rounded-full bg-[#1a2b27] absolute left-3"></div>
      </div>
      <div className="flex items-center gap-1.5 text-white/90">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};

const MainNavigator: React.FC = () => {
  const { isLoggedIn, screen, isRtl } = useApp();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#111816] flex items-center justify-center p-0 sm:p-6">
        {/* Smartphone Device Frame */}
        <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full sm:max-w-[410px] min-h-screen sm:min-h-[850px] sm:max-h-[900px] bg-[#F6F5F0] sm:rounded-[48px] sm:border-[10px] sm:border-[#22302c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0">
            <StatusBar />
            <div className="flex-1 overflow-y-auto min-h-0 relative flex flex-col">
              {screen === 'forgot_password' ? <ForgotPasswordScreen /> : <LoginScreen />}
            </div>
          </div>
          {/* Home indicator bar */}
          <div className="h-5 bg-[#F6F5F0] flex items-center justify-center shrink-0 pb-1 z-40">
            <div className="w-32 h-1 bg-[#172321]/30 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111816] flex items-center justify-center p-0 sm:p-6 selection:bg-[#C44724] selection:text-white">
      {/* Smartphone Device Frame */}
      <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full sm:max-w-[410px] min-h-screen sm:min-h-[850px] sm:max-h-[900px] bg-[#F6F5F0] sm:rounded-[48px] sm:border-[10px] sm:border-[#22302c] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative flex flex-col justify-between overflow-hidden">
        
        {/* Top Group: Status Bar + Scrollable Content */}
        <div className="flex flex-col flex-1 min-h-0">
          <StatusBar />

          <div className="flex-1 overflow-y-auto min-h-0 relative flex flex-col pb-6">
            {screen === 'home' && <HomeScreen />}
            {screen === 'my_training' && <MyTrainingScreen />}
            {screen === 'course_details' && <CourseDetailsScreen />}
            {screen === 'learning_player' && <LearningPlayerScreen />}
            {screen === 'assessment' && <AssessmentScreen />}
            {screen === 'results' && <ResultsScreen />}
            {screen === 'safety_assistant' && <SafetyAssistantScreen />}
            {screen === 'certificates' && <CertificatesScreen />}
            {screen === 'resources' && <ResourcesScreen />}
            {screen === 'profile' && <ProfileScreen />}
            {screen === 'notifications' && <NotificationsScreen />}
          </div>
        </div>

        {/* Bottom Group: Navigation Bar & Home Indicator */}
        <div className="shrink-0 flex flex-col z-50">
          <BottomNav />
          <div className="h-5 bg-[#FFFFFF]/95 backdrop-blur-md flex items-center justify-center shrink-0 pb-1">
            <div className="w-32 h-1 bg-[#172321]/30 rounded-full"></div>
          </div>
        </div>

      </div>
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}
