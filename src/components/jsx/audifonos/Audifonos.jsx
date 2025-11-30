
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Headphones3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff6b00, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff8c42, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const headphonesGroup = new THREE.Group();

    // Headband (arco superior)
    const headbandGeometry = new THREE.TorusGeometry(1.5, 0.15, 16, 100, Math.PI);
    const headbandMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff8533,
      metalness: 0.8,
      roughness: 0.2
    });
    const headband = new THREE.Mesh(headbandGeometry, headbandMaterial);
    headband.rotation.x = Math.PI / 2;
    headphonesGroup.add(headband);

    // Padding del headband
    const paddingGeometry = new THREE.CylinderGeometry(0.18, 0.18, 2.5, 32);
    const paddingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffa366,
      metalness: 0.3,
      roughness: 0.7
    });
    const padding = new THREE.Mesh(paddingGeometry, paddingMaterial);
    padding.rotation.z = Math.PI / 2;
    padding.position.y = 1.5;
    headphonesGroup.add(padding);

    // Función para crear cada auricular
    function createEarCup(side) {
      const earGroup = new THREE.Group();

      // Cup principal
      const cupGeometry = new THREE.CylinderGeometry(0.8, 0.9, 0.4, 32);
      const cupMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff6b00,
        metalness: 0.9,
        roughness: 0.1
      });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.rotation.x = Math.PI / 2;
      earGroup.add(cup);

      // Detalle naranja brillante
      const detailGeometry = new THREE.TorusGeometry(0.7, 0.05, 16, 100);
      const detailMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff6b00,
        emissive: 0xff6b00,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
      });
      const detail = new THREE.Mesh(detailGeometry, detailMaterial);
      detail.position.z = 0.15;
      earGroup.add(detail);

      // Almohadilla
      const cushionGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.2, 32);
      const cushionMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffb380,
        metalness: 0.2,
        roughness: 0.9
      });
      const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
      cushion.rotation.x = Math.PI / 2;
      cushion.position.z = 0.3;
      earGroup.add(cushion);

      // Brazo conector
      const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
      const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff8533,
        metalness: 0.8,
        roughness: 0.2
      });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.y = 1.1;
      arm.position.z = -0.2;
      earGroup.add(arm);

      earGroup.position.x = side * 1.5;
      return earGroup;
    }

  
    headphonesGroup.add(createEarCup(-1));
    headphonesGroup.add(createEarCup(1));


    headphonesGroup.rotation.y = Math.PI / 3;
    headphonesGroup.rotation.z = -Math.PI / 12;
    headphonesGroup.position.y = -0.3;

    scene.add(headphonesGroup);
    camera.position.z = 5;

   
    let time = 0;
    let animationId;
    
    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotación suave
      headphonesGroup.rotation.y = Math.PI / 3 + Math.sin(time * 0.5) * 0.3;
      headphonesGroup.position.y = -0.3 + Math.sin(time * 0.8) * 0.1;

   
      pointLight1.position.x = Math.sin(time) * 5;
      pointLight1.position.y = Math.cos(time) * 5;
      
      pointLight2.position.x = Math.cos(time * 0.7) * 5;
      pointLight2.position.z = Math.sin(time * 0.7) * 5;

      renderer.render(scene, camera);
    }
    animate();

 
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '300px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative'
      }} 
    />
  );
}