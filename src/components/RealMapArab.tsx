'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { arabCountriesGeoJSON } from '@/data/arabCountriesGeoJSON';
import MapControls from './MapControls';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function RealMapArab() {
  const mapRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const { setSelectedCountry, setHoveredCountry, setSidebarOpen, selectedCountry, hoveredCountry } = useAppStore();

  // Arab World bounds (from Morocco to Oman, from Syria to Sudan/Yemen)
  const arabWorldBounds: L.LatLngBoundsExpression = [
    [-17.1, 8.6], // Southwest (Mauritania/Sudan)
    [59.9, 37.4]   // Northeast (Oman/Syria)
  ];

  // Reset map view to show all Arab countries
  const resetMapView = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(arabWorldBounds, {
        padding: [20, 20],
        maxZoom: 5
      });
    }
  };

  // Style function for countries
  const getCountryStyle = (feature: any) => {
    const isSelected = selectedCountry === feature.properties.code;
    const isHovered = hoveredCountry === feature.properties.code;
    
    return {
      fillColor: isSelected ? '#FFD700' : isHovered ? '#F4D03F' : '#D4AF37',
      weight: isSelected ? 3 : isHovered ? 2 : 1,
      opacity: 1,
      color: isSelected ? '#FFD700' : '#2C3E50',
      dashArray: '',
      fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7
    };
  };

  // Event handlers for each country
  const onEachCountry = (feature: any, layer: L.Layer) => {
    const countryCode = feature.properties.code;
    const countryName = feature.properties.name;
    const countryNameEn = feature.properties.nameEn;

    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        const layer = e.target;
        setHoveredCountry(countryCode);
        
        // Highlight effect
        layer.setStyle({
          weight: 3,
          color: '#FFD700',
          fillOpacity: 0.8
        });
        
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        const layer = e.target;
        setHoveredCountry(null);
        
        // Reset style
        if (selectedCountry !== countryCode) {
          layer.setStyle(getCountryStyle(feature));
        }
      },
      click: (e: L.LeafletMouseEvent) => {
        setSelectedCountry(countryCode);
        setSidebarOpen(true);
        
        // Zoom to country
        if (mapRef.current && (layer as any).getBounds) {
          mapRef.current.fitBounds((layer as any).getBounds(), {
            padding: [20, 20],
            maxZoom: 6
          });
        }
      }
    });

    // Bind tooltip
    layer.bindTooltip(
      `<div class="text-center font-arabic">
        <div class="font-bold text-lg text-secondary">${countryName}</div>
        <div class="text-sm text-foreground/70">${countryNameEn}</div>
      </div>`,
      {
        permanent: false,
        sticky: true,
        className: 'custom-tooltip glass',
        direction: 'top'
      }
    );
  };

  // Initialize map
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-hero">
      {/* Map Container */}
      <div className="absolute inset-0">
        <MapContainer
          center={[24.0, 21.0]} // Center of Arab World
          zoom={4}
          minZoom={3}
          maxZoom={8}
          bounds={arabWorldBounds}
          className="w-full h-full"
          zoomControl={false}
          scrollWheelZoom={true}
          ref={mapRef}
          style={{ backgroundColor: 'hsl(220, 30%, 5%)' }}
        >
          {/* Dark tile layer for Arabian theme */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            opacity={0.6}
          />
          
          {/* Arab Countries GeoJSON Layer */}
          {isMapReady && (
            <GeoJSON
              data={arabCountriesGeoJSON as any}
              style={getCountryStyle}
              onEachFeature={onEachCountry}
            />
          )}
        </MapContainer>
      </div>

      {/* Map Controls */}
      <MapControls 
        onResetView={resetMapView}
        onToggleLayers={() => console.log('Toggle layers')}
        onToggleInfo={() => console.log('Toggle info')}
      />

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-secondary/20 transition-colors"
        >
          <span className="text-xl font-bold">+</span>
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center text-foreground hover:bg-secondary/20 transition-colors"
        >
          <span className="text-xl font-bold">−</span>
        </button>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-lg p-4 text-arabic max-w-xs"
        >
          <h2 className="text-xl font-bold text-secondary mb-2 flex items-center gap-2">
            🗺️ خريطة الوطن العربي
          </h2>
          <p className="text-foreground/70 text-sm leading-relaxed">
            انقر على أي دولة لاستكشافها واكتشاف معالمها وثقافتها
          </p>
        </motion.div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-3 text-arabic"
        >
          <div className="flex flex-col gap-2 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary/70 border border-secondary"></div>
              <span>دولة عربية</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500/70 border border-yellow-500"></div>
              <span>الدولة المحددة</span>
            </div>
            <div className="text-xs text-foreground/50 mt-1">
              🖱️ انقر واسحب للتنقل • 🔍 استخدم العجلة للتكبير
            </div>
          </div>
        </motion.div>
      </div>

      {/* Loading overlay */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center z-[2000]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-arabic"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-secondary/30 border-t-secondary rounded-full mx-auto mb-4"
            />
            <p className="text-secondary text-lg font-semibold">جاري تحميل خريطة الوطن العربي...</p>
            <p className="text-foreground/60 text-sm mt-2">الرجاء الانتظار</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}