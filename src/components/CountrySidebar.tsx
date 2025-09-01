import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { X, MapPin, Users, Landmark, Utensils, Star, Clock } from 'lucide-react';
import LandmarkCard from './LandmarkCard';
import pyramidImage from '@/assets/pyramid-3d.jpg';
import petraImage from '@/assets/petra-3d.jpg';
import kaabaImage from '@/assets/kaaba-3d.jpg';

export default function CountrySidebar() {
  const { sidebarOpen, setSidebarOpen, selectedCountry, getCountryByCode } = useAppStore();
  
  const country = selectedCountry ? getCountryByCode(selectedCountry) : null;

  // Enhanced data for the selected country with more details
  const countryData = {
    EG: {
      population: '104 مليون',
      capital: 'القاهرة',
      history: 'مصر، أم الدنيا وحضارة عريقة تمتد لآلاف السنين، موطن الفراعنة والأهرامات العظيمة التي تشهد على عظمة الحضارة المصرية القديمة.',
      landmarks: [
        { name: 'Pyramids of Giza', nameAr: 'أهرامات الجيزة', image: pyramidImage, description: 'إحدى عجائب الدنيا السبع، بناها الفراعنة منذ أكثر من 4500 عام' },
        { name: 'Karnak Temple', nameAr: 'معبد الكرنك', image: pyramidImage, description: 'أكبر مجمع ديني في العالم القديم بمدينة الأقصر' },
        { name: 'Abu Simbel', nameAr: 'أبو سمبل', image: pyramidImage, description: 'معبد الملك رمسيس الثاني المنحوت في الصخر' }
      ],
      cuisine: ['الكشري المصري', 'الملوخية', 'الفتة', 'المحشي', 'البامية'],
      rating: 4.8,
      visitTime: 'أفضل وقت: أكتوبر - أبريل'
    },
    SA: {
      population: '35 مليون',
      capital: 'الرياض',
      history: 'المملكة العربية السعودية، مهد الإسلام وموطن الحرمين الشريفين، تجمع بين التراث العريق والحداثة المتطورة.',
      landmarks: [
        { name: 'Kaaba', nameAr: 'الكعبة المشرفة', image: kaabaImage, description: 'أقدس مكان في الإسلام وقبلة المسلمين في صلاتهم' },
        { name: 'Madinah', nameAr: 'المدينة المنورة', image: kaabaImage, description: 'المدينة التي هاجر إليها النبي محمد صلى الله عليه وسلم' },
        { name: 'Al-Ula', nameAr: 'العُلا', image: kaabaImage, description: 'متحف طبيعي يضم آثار حضارات متعاقبة' }
      ],
      cuisine: ['الكبسة', 'المندي', 'الجريش', 'المعصوب', 'القرصان'],
      rating: 4.9,
      visitTime: 'أفضل وقت: نوفمبر - مارس'
    },
    JO: {
      population: '10 مليون',
      capital: 'عمان',
      history: 'الأردن، أرض الضيافة والتاريخ العريق، موطن البتراء الوردية وحضارات متعاقبة من النبطيين إلى الرومان.',
      landmarks: [
        { name: 'Petra', nameAr: 'البتراء', image: petraImage, description: 'المدينة الوردية المنحوتة في الصخر، إحدى عجائب الدنيا الجديدة' },
        { name: 'Wadi Rum', nameAr: 'وادي رم', image: petraImage, description: 'وادي القمر، محمية طبيعية صحراوية ساحرة' },
        { name: 'Jerash', nameAr: 'جرش', image: petraImage, description: 'مدينة رومانية أثرية محفوظة بشكل رائع' }
      ],
      cuisine: ['المنسف', 'المقلوبة', 'الكنافة', 'المتبل', 'الفلافل'],
      rating: 4.7,
      visitTime: 'أفضل وقت: مارس - مايو، سبتمبر - نوفمبر'
    }
  };

  const currentCountryData = countryData[selectedCountry as keyof typeof countryData] || countryData.EG;

  return (
    <AnimatePresence>
      {sidebarOpen && country && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/30 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-card border-l border-border z-50 overflow-y-auto custom-scrollbar"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-arabic">
                  <h2 className="text-2xl font-bold text-secondary">
                    {country.name}
                  </h2>
                  <p className="text-foreground/70">{country.nameEn}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-lg p-4 mb-6 text-arabic"
              >
                <p className="text-secondary font-semibold mb-2">
                  🌟 أهلاً وسهلاً!
                </p>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  لقد اخترت {country.name}! استكشف معالمها الرائعة وتاريخها العريق.
                </p>
              </motion.div>

              {/* Country Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3 glass">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <div className="text-arabic">
                      <p className="text-xs text-foreground/70">العاصمة</p>
                      <p className="font-semibold text-sm">{currentCountryData.capital}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-3 glass">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary" />
                    <div className="text-arabic">
                      <p className="text-xs text-foreground/70">السكان</p>
                      <p className="font-semibold text-sm">{currentCountryData.population}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-3 glass">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <div className="text-arabic">
                      <p className="text-xs text-foreground/70">التقييم</p>
                      <p className="font-semibold text-sm">{currentCountryData.rating}/5</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-3 glass">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <div className="text-arabic">
                      <p className="text-xs text-foreground/70 leading-tight">{currentCountryData.visitTime.split(': ')[0]}</p>
                      <p className="font-semibold text-xs">{currentCountryData.visitTime.split(': ')[1]}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Historical Overview */}
              <Card className="p-4 glass mb-6">
                <h3 className="text-lg font-bold text-secondary mb-3 text-arabic flex items-center gap-2">
                  📜 نبذة تاريخية
                </h3>
                <p className="text-foreground/80 leading-relaxed text-arabic text-sm">
                  {currentCountryData.history}
                </p>
              </Card>

              {/* 3D Landmarks */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-secondary mb-4 text-arabic flex items-center gap-2">
                  <Landmark className="w-5 h-5" />
                  المعالم ثلاثية الأبعاد
                </h3>
                <div className="space-y-4">
                  {currentCountryData.landmarks.map((landmark, index) => (
                    <LandmarkCard
                      key={index}
                      name={landmark.name}
                      nameAr={landmark.nameAr}
                      image={landmark.image}
                      description={landmark.description}
                      index={index}
                      onExplore={() => {
                        // TODO: Implement 3D landmark exploration
                        console.log('Exploring:', landmark.name);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Cuisine */}
              <Card className="p-4 glass mb-6">
                <h3 className="text-lg font-bold text-secondary mb-3 text-arabic flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  المأكولات الشعبية
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentCountryData.cuisine.map((dish, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2 p-2 rounded bg-muted/30 text-arabic text-center"
                    >
                      <span className="text-secondary">🍽️</span>
                      <span className="text-xs font-medium">{dish}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-secondary text-secondary-foreground hover:scale-105 transition-all duration-300 font-arabic"
                >
                  🎯 استكشف المعالم ثلاثية الأبعاد
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-secondary/30 text-secondary hover:bg-secondary/10 font-arabic"
                >
                  📚 المزيد من المعلومات
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}