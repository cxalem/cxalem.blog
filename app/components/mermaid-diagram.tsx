'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    
    checkDarkMode()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode)
  }, [])

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        flowchart: {
          nodeSpacing: 30,
          rankSpacing: 40,
          curve: 'basis'
        },
        themeVariables: {
          // Custom theme colors to match your design
          primaryColor: isDark ? '#ea580c' : '#ea580c', // Orange accent
          primaryTextColor: isDark ? '#fafafa' : '#171717',
          primaryBorderColor: isDark ? '#525252' : '#d4d4d8',
          lineColor: isDark ? '#525252' : '#a1a1aa',
          secondaryColor: isDark ? '#404040' : '#f5f5f4',
          tertiaryColor: isDark ? '#262626' : '#ffffff',
          background: isDark ? '#2f2f2f' : '#fff8ef',
          mainBkg: isDark ? '#404040' : '#ffffff',
          secondBkg: isDark ? '#525252' : '#f5f5f4',
          tertiaryTextColor: isDark ? '#d4d4d8' : '#525252',
          // Make text smaller
          primaryTextSize: '14px',
          primaryTextWeight: '500',
        },
      })

      const renderChart = async () => {
        if (ref.current) {
          try {
            const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), chart)
            ref.current.innerHTML = svg
            
            // Apply additional styling to the SVG
            const svgElement = ref.current.querySelector('svg')
            if (svgElement) {
              svgElement.style.maxWidth = '100%'
              svgElement.style.height = 'auto'
            }
          } catch (error) {
            console.error('Mermaid rendering error:', error)
            ref.current.innerHTML = `<div class="text-red-500 dark:text-red-400 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">Error rendering diagram: ${error}</div>`
          }
        }
      }

      renderChart()
    }
  }, [chart, isDark])

  return (
    <div className="my-6">
      <div className="bg-neutral-50/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl shadow-sm p-4">
        <div 
          ref={ref} 
          className={`flex justify-center items-center min-h-[150px] ${className}`}
          style={{ fontSize: '0.875rem' }}
        />
      </div>
    </div>
  )
}
