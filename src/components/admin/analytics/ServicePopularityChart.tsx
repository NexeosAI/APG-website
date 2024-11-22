import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface ServicePopularityChartProps {
  data: {
    name: string
    count: number
  }[]
}

export function ServicePopularityChart({ data }: ServicePopularityChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.name),
        datasets: [
          {
            data: data.map(d => d.count),
            backgroundColor: [
              'hsl(var(--chart-1))',
              'hsl(var(--chart-2))',
              'hsl(var(--chart-3))',
              'hsl(var(--chart-4))',
              'hsl(var(--chart-5))',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    })
  }, [data])

  return <canvas ref={chartRef} className="h-[300px]" />
} 