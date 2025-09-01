import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Search, Layers, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapControlsProps {
  onResetView?: () => void;
  onToggleLayers?: () => void;
  onToggleInfo?: () => void;
}

export default function MapControls({ 
  onResetView, 
  onToggleLayers, 
  onToggleInfo 
}: MapControlsProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const controls = [
    {
      icon: Home,
      label: 'العودة للعرض الكامل',
      action: onResetView,
      id: 'home'
    },
    {
      icon: Search,
      label: 'البحث عن دولة',
      action: () => console.log('Search clicked'),
      id: 'search'
    },
    {
      icon: Layers,
      label: 'طبقات الخريطة',
      action: onToggleLayers,
      id: 'layers'
    },
    {
      icon: Info,
      label: 'معلومات الخريطة',
      action: onToggleInfo,
      id: 'info'
    }
  ];

  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      <Card className="glass p-2">
        <div className="flex flex-col gap-2">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <div
                key={control.id}
                className="relative"
                onMouseEnter={() => setShowTooltip(control.id)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={control.action}
                  className="w-10 h-10 p-0 hover:bg-secondary/20 hover:text-secondary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </Button>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltip === control.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.9 }}
                      className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap"
                    >
                      <div className="glass rounded-lg px-3 py-2 text-sm font-arabic">
                        {control.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}