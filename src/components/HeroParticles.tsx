'use client'

import { useCallback } from 'react'
import { Particles } from '@tsparticles/react'
import { loadFull } from 'tsparticles'
import type { Engine } from '@tsparticles/engine'

export function HeroParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      options={{
        background: {
          color: 'transparent'
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'bubble'
            }
          },
          modes: {
            bubble: {
              distance: 200,
              size: 15,
              duration: 2,
              opacity: 0.8,
              color: '#3b82f6'
            }
          }
        },
        particles: {
          color: {
            value: ['#3b82f6', '#60a5fa', '#93c5fd']
          },
          links: {
            color: '#60a5fa',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce'
            },
            random: false,
            speed: 3,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 100
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: ['circle', 'triangle', 'star']
          },
          size: {
            value: { min: 1, max: 5 }
          }
        },
        detectRetina: true
      }}
    />
  )
}