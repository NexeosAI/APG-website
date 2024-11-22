import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { format } from 'date-fns'
import { BookingStatus } from '@/types/booking'

Chart.register(...registerables)

interface BookingChartProps {
  data: {
    date: string
    count: number
    status: BookingStatus
  }[]
}

export function BookingChart({ data }: BookingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const chartData = data.reduce((acc, curr) => {
      const date = format(new Date(curr.date), 'MMM d')
      if (!acc[date]) {
        acc[date] = {
          total: 0,
          PENDING: 0,
          CONFIRMED: 0,
          IN_PROGRESS: 0,
          COMPLETED: 0,
          CANCELLED: 0,
        }
      }
      acc[date][curr.status] = curr.count
      acc[date].total += curr.count
      return acc
    }, {} as Record<string, Record<string, number>>)

    const labels = Object.keys(chartData)

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total',
            data: labels.map(label => chartData[label].total),
            borderColor: 'hsl(var(--chart-1))',
            tension: 0.1,
          },
          {
            label: 'Pending',
            data: labels.map(label => chartData[label].PENDING),
            borderColor: 'hsl(var(--chart-2))',
            tension: 0.1,
          },
          {
            label: 'Completed',
            data: labels.map(label => chartData[label].COMPLETED),
            borderColor: 'hsl(var(--chart-3))',
            tension: 0.1,
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
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    })
  }, [data])

  return <canvas ref={chartRef} className="h-[300px]" />
} 