import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { format } from 'date-fns'

Chart.register(...registerables)

interface RevenueChartProps {
  data: {
    date: string
    amount: number
  }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => format(new Date(d.date), 'MMM d')),
        datasets: [
          {
            label: 'Revenue',
            data: data.map(d => d.amount),
            backgroundColor: 'hsl(var(--chart-1))',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `£${value}`,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  }, [data])

  return <canvas ref={chartRef} className="h-[300px]" />
} 