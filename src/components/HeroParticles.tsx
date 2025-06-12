'use client'

import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, Engine } from '@tsparticles/engine'
import type { ISourceOptions } from '@tsparticles/engine'

export function HeroParticles() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      console.log(container)
    }
  }, [])

  const options: ISourceOptions = {
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
          enable: true
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
  }

  return (
    <div className="fixed inset-0 bg-transparent z-[1]">
      {init && (
        <Particles
          id="hero-particles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </div>
  )
}