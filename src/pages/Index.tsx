import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import StartHero from '@/components/StartHero';
import RealMapArab from '@/components/RealMapArab';
import CountrySidebar from '@/components/CountrySidebar';
import LoadingScreen from '@/components/LoadingScreen';
import VoiceAssistant from '@/components/VoiceAssistant';
import { Suspense } from 'react';

const Index = () => {
  const { showWelcome } = useAppStore();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Welcome Screen */}
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <StartHero key="hero" />
        ) : (
          <div key="app" className="w-full h-screen">
            {/* Real Arab World Map */}
            <Suspense fallback={<LoadingScreen message="جاري تحميل خريطة الوطن العربي..." />}>
              <RealMapArab />
            </Suspense>
            
            {/* Country Sidebar */}
            <CountrySidebar />
            
            {/* Voice Assistant */}
            <VoiceAssistant />
          </div>
        )}
      </AnimatePresence>
      
      {/* Meta Tags for SEO */}
      <div className="sr-only">
        <h1>رحلة عبر الوطن العربي - Arabian Voyage 3D</h1>
        <p>
          استكشف جمال وثراء الوطن العربي من خلال رحلة تفاعلية ثلاثية الأبعاد. 
          اكتشف المعالم الأثرية والحضارات العريقة في الدول العربية.
        </p>
      </div>
    </div>
  );
};

export default Index;