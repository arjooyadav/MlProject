"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Code } from "lucide-react"

interface LSTMChartProps {
  predictions: number[]
  currentPrice: number
  symbol: string
}

export default function LSTMChart({ predictions, currentPrice, symbol }: LSTMChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !predictions.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 400

    // Clear canvas
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const padding = 60
    const chartWidth = canvas.width - 2 * padding
    const chartHeight = canvas.height - 2 * padding

    // Find min and max values
    const allPrices = [currentPrice, ...predictions]
    const minPrice = Math.min(...allPrices) * 0.98
    const maxPrice = Math.max(...allPrices) * 1.02

    // Helper function to convert data to canvas coordinates
    const getX = (index: number) => padding + (index / (predictions.length + 1)) * chartWidth
    const getY = (price: number) => padding + ((maxPrice - price) / (maxPrice - minPrice)) * chartHeight

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i / 10) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
    }

    // Draw historical price point
    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(getX(0), getY(currentPrice), 6, 0, 2 * Math.PI)
    ctx.fill()

    // Draw prediction line
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(getX(0), getY(currentPrice))

    predictions.forEach((price, index) => {
      ctx.lineTo(getX(index + 1), getY(price))
    })
    ctx.stroke()

    // Draw prediction points
    ctx.fillStyle = "#ef4444"
    predictions.forEach((price, index) => {
      ctx.beginPath()
      ctx.arc(getX(index + 1), getY(price), 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = "#374151"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"

    // Title with attribution
    ctx.font = "16px sans-serif"
    ctx.fillText(`${symbol} - stocKera LSTM Prediction by Arunav`, canvas.width / 2, 30)

    // Y-axis labels
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + ((maxPrice - minPrice) * i) / 5
      const y = padding + ((5 - i) / 5) * chartHeight
      ctx.fillText(`₹${price.toFixed(0)}`, padding - 10, y + 4)
    }

    // Legend
    ctx.textAlign = "left"
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(padding, canvas.height - 40, 15, 15)
    ctx.fillStyle = "#374151"
    ctx.fillText("Current Price", padding + 20, canvas.height - 28)

    ctx.fillStyle = "#ef4444"
    ctx.fillRect(padding + 120, canvas.height - 40, 15, 15)
    ctx.fillStyle = "#374151"
    ctx.fillText("LSTM Predictions", padding + 140, canvas.height - 28)

    // Attribution
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "right"
    ctx.fillText("© 2025 Arunav | stocKera AI", canvas.width - padding, canvas.height - 10)
  }, [predictions, currentPrice, symbol])

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">LSTM Neural Network Prediction</h4>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Code className="w-3 h-3 mr-1" />
            AI Model by Arunav
          </Badge>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-auto max-w-full" style={{ maxHeight: "400px" }} />
      <div className="mt-2 text-xs text-gray-500 text-center">
        Advanced LSTM Neural Network with NLP Sentiment Analysis | Developed by Arunav © 2025
      </div>
    </div>
  )
}
