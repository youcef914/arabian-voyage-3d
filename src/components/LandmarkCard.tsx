import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Camera } from 'lucide-react';

interface LandmarkCardProps {
  name: string;
  nameAr: string;
  image: string;
  description: string;
  index: number;
  onExplore?: () => void;
}

export default function LandmarkCard({ 
  name, 
  nameAr, 
  image, 
  description, 
  index,
  onExplore 
}: LandmarkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden glass hover-lift">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Floating Arabic Name */}
          <div className="absolute bottom-3 right-3 text-arabic">
            <h3 className="text-lg font-bold text-secondary glow-text">
              {nameAr}
            </h3>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h4 className="text-md font-semibold text-foreground mb-2">
            {name}
          </h4>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4 text-arabic">
            {description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onExplore}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300"
            >
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-arabic">استكشف</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-secondary/30 text-secondary hover:bg-secondary/10"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}