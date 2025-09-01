'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useAppStore, arabCountries } from '@/lib/store';
import CountryMesh from './CountryMesh';
import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <Html center>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full"
      />
    </Html>
  );
}

function ArabWorldMap() {
  const { hoveredCountry, selectedCountry } = useAppStore();
  
  return (
    <group>
      {arabCountries.map((country) => (
        <CountryMesh
          key={country.id}
          country={country}
          position={[
            (country.position[0] - 25) * 0.1, // Normalize longitude
            0,
            (country.position[1] - 25) * 0.1  // Normalize latitude
          ]}
          isHovered={hoveredCountry === country.id}
          isSelected={selectedCountry === country.id}
        />
      ))}
    </group>
  );
}

export default function Map3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="relative w-full h-full bg-gradient-hero">
      <Canvas
        ref={canvasRef}
        camera={{
          position: [0, 3, 8],
          fov: 50,
        }}
        className="w-full h-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#D4AF37" />
        
        {/* Stars Background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        {/* 3D Map */}
        <Suspense fallback={<LoadingSpinner />}>
          <ArabWorldMap />
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-lg p-4 text-arabic"
        >
          <h2 className="text-xl font-bold text-secondary mb-2">
            🗺️ خريطة الوطن العربي
          </h2>
          <p className="text-foreground/70 text-sm">
            انقر على أي دولة لاستكشافها
          </p>
        </motion.div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-3 text-arabic"
        >
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-secondary/50"></div>
              <span>دولة عربية</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}