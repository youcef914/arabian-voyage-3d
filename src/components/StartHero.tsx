import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import heroImage from '@/assets/arab-world-hero.jpg';

export default function StartHero() {
  const { setShowWelcome } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 40, 66, 0.8), rgba(34, 40, 66, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 pattern-overlay" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 px-6 max-w-4xl mx-auto"
      >
        {/* Arabic Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-decorative font-bold text-secondary glow-text mb-6 text-arabic"
        >
          رحلة عبر الوطن العربي
        </motion.h1>

        {/* English Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-foreground/80 mb-4 font-light"
        >
          Arabian Voyage 3D
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed text-arabic"
        >
          استكشف جمال وثراء الوطن العربي من خلال رحلة تفاعلية ثلاثية الأبعاد
          <br />
          اكتشف المعالم الأثرية والحضارات العريقة
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Button
            onClick={() => setShowWelcome(false)}
            variant="hero"
            size="lg"
            className="px-12 py-6 text-xl font-semibold bg-gradient-secondary text-secondary-foreground hover:scale-110 transition-all duration-500 glow-border shadow-elegant font-arabic"
          >
            ✨ ابدأ الرحلة
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-secondary/10 blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-accent/10 blur-xl"
        />
      </motion.div>
    </motion.div>
  );
}