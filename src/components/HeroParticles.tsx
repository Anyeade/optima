import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const HeroParticles = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'bubble',
            },
          },
          modes: {
            bubble: {
              distance: 200,
              size: 15,
              duration: 2,
              opacity: 0.8,
              color: '#3b82f6',
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'bottom',
            outModes: {
              default: 'out',
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default HeroParticles;