import React from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const HeroParticles = () => {
  const particlesInit = async (engine: Engine) => {
    // This is where you load features into the engine
    await loadSlim(engine);
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
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
          number: {
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
