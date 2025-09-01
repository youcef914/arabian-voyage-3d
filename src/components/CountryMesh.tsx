import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface CountryMeshProps {
  country: {
    id: string;
    name: string;
    nameEn: string;
    color: string;
  };
  position: [number, number, number];
  isHovered: boolean;
  isSelected: boolean;
}

export default function CountryMesh({ 
  country, 
  position, 
  isHovered, 
  isSelected 
}: CountryMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const { setHoveredCountry, setSelectedCountry, setSidebarOpen } = useAppStore();
  const { camera } = useThree();

  // Animation for hover and selection states
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Height animation
      const targetHeight = isSelected ? 0.8 : isHovered ? 0.4 : 0.2;
      meshRef.current.scale.y += (targetHeight - meshRef.current.scale.y) * 0.1;
      
      // Color animation
      const baseColor = isSelected ? '#FFD700' : isHovered ? '#F4D03F' : country.color;
      materialRef.current.color.lerp({ r: parseInt(baseColor.slice(1, 3), 16) / 255, g: parseInt(baseColor.slice(3, 5), 16) / 255, b: parseInt(baseColor.slice(5, 7), 16) / 255 } as any, 0.1);
      
      // Emissive glow for selected/hovered states
      const emissiveIntensity = isSelected ? 0.3 : isHovered ? 0.1 : 0;
      materialRef.current.emissiveIntensity += (emissiveIntensity - materialRef.current.emissiveIntensity) * 0.1;
      materialRef.current.emissive.copy(materialRef.current.color);
      
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  const handlePointerOver = () => {
    setHoveredCountry(country.id);
    setShowTooltip(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHoveredCountry(null);
    setShowTooltip(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    setSelectedCountry(country.id);
    setSidebarOpen(true);
    
    // Animate camera to focus on the country
    const targetPosition = [
      position[0] * 1.5,
      position[1] + 2,
      position[2] + 3
    ];
    
    // Simple camera animation (you might want to use a more sophisticated approach)
    camera.position.lerp({ x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] } as any, 0.1);
  };

  return (
    <group position={position}>
      {/* Country Mesh */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        {/* Simple box geometry representing the country */}
        <boxGeometry args={[0.8, 0.2, 0.6]} />
        <meshStandardMaterial
          ref={materialRef}
          color={country.color}
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Country Tooltip */}
      {showTooltip && (
        <Html
          position={[0, 1, 0]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass rounded-lg px-3 py-2 text-center min-w-max"
          >
            <div className="text-secondary font-bold text-lg font-arabic">
              {country.name}
            </div>
            <div className="text-foreground/70 text-sm">
              {country.nameEn}
            </div>
          </motion.div>
        </Html>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}