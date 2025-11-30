
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Equalizer3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

   
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.set(0, 12, 28);
    camera.lookAt(0, 0, 0);

 
    const barCount = 48;
    const radius = 10;
    const bars = [];
    
  
    const colors = [
      0xff6b00, 
      0xff8533, 
      0x3b82f6,
      0x60a5fa, 
      0x10b981, 
      0x34d399, 
    ];

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
  
      const geometry = new THREE.BoxGeometry(0.4, 1, 0.4);
      
    
      const colorIndex = Math.floor(Math.random() * colors.length);
      const material = new THREE.MeshPhongMaterial({
        color: colors[colorIndex],
        emissive: colors[colorIndex],
        emissiveIntensity: 0.4,
        shininess: 100,
        transparent: true,
        opacity: 0.95
      });
      
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(x, 0, z);
      bar.rotation.y = -angle;
      
    
      bar.userData = {
        targetHeight: Math.random() * 6 + 1.5,
        currentHeight: 1,
        velocity: 0,
        originalColor: colors[colorIndex]
      };
      
      scene.add(bar);
      bars.push(bar);
    }
    
    barsRef.current = bars;

    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0xff6b00, 1.2, 40);
    pointLight1.position.set(0, 8, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3b82f6, 1, 40);
    pointLight2.position.set(8, 4, 8);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x10b981, 1, 40);
    pointLight3.position.set(-8, 4, -8);
    scene.add(pointLight3);

   
    const ringGeometry = new THREE.TorusGeometry(radius, 0.15, 16, 100);
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b00,
      emissive: 0xff6b00,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.3;
    scene.add(ring);

   
    let time = 0;

 
    function animate() {
      requestAnimationFrame(animate);
      time += 0.016;

     
      bars.forEach((bar, i) => {
        const spring = 0.02;
        const damping = 0.9;
        
        
        const force = (bar.userData.targetHeight - bar.userData.currentHeight) * spring;
        bar.userData.velocity = (bar.userData.velocity + force) * damping;
        bar.userData.currentHeight += bar.userData.velocity;
    

        if (Math.random() < 0.04) {
          bar.userData.targetHeight = Math.random() * 8 + 1.5;
        }
        
    
        bar.scale.y = bar.userData.currentHeight;
        bar.position.y = bar.userData.currentHeight / 2;
        
     
        const intensity = bar.userData.currentHeight / 10;
        bar.material.emissiveIntensity = 0.3 + intensity * 0.5;
        
      
        bar.rotation.x = Math.sin(time * 2 + i * 0.1) * 0.08;
      });

     
      scene.rotation.y = time * 0.15;
      
      
      ring.rotation.z = time * 0.4;
      
    
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      ring.scale.set(pulse, pulse, pulse);

      
      pointLight1.intensity = 1 + Math.sin(time * 3) * 0.3;
      pointLight2.intensity = 0.8 + Math.sin(time * 2.5) * 0.3;
      pointLight3.intensity = 0.8 + Math.sin(time * 2) * 0.3;

      renderer.render(scene, camera);
    }

    animate();

    
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      bars.forEach(bar => {
        bar.geometry.dispose();
        bar.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-64 mb-16 rounded-2xl overflow-hidden">
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />
      
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}