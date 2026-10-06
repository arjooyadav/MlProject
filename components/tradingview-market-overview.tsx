"use client"

import { useEffect, useRef } from "react"

interface TradingViewMarketOverviewProps {
  colorTheme?: "light" | "dark"
  dateRange?: "1D" | "1M" | "3M" | "12M" | "60M"
  showChart?: boolean
  locale?: string
  width?: string | number
  height?: string | number
}

export default function TradingViewMarketOverview({
  colorTheme = "light",
  dateRange = "12M",
  showChart = true,
  locale = "en",
  width = "100%",
  height = 400,
}: TradingViewMarketOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Create a unique container ID
    const uniqueId = `market_overview_${Math.random().toString(36).substr(2, 9)}`

    // Create the container div
    const widgetContainer = document.createElement("div")
    widgetContainer.id = uniqueId
    widgetContainer.style.width = typeof width === "number" ? `${width}px` : width.toString()
    widgetContainer.style.height = typeof height === "number" ? `${height}px` : height.toString()

    containerRef.current.appendChild(widgetContainer)

    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        colorTheme: colorTheme,
        dateRange: dateRange,
        showChart: showChart,
        locale: locale,
        width: "100%",
        height: "100%",
        largeChartUrl: "",
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: false,
        plotLineColorGrowing: "rgba(41, 98, 255, 1)",
        plotLineColorFalling: "rgba(255, 67, 67, 1)",
        gridLineColor: "rgba(240, 243, 250, 0)",
        scaleFontColor: "rgba(106, 109, 120, 1)",
        belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
        belowLineFillColorFalling: "rgba(255, 67, 67, 0.12)",
        belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
        belowLineFillColorFallingBottom: "rgba(255, 67, 67, 0)",
        symbolActiveColor: "rgba(41, 98, 255, 0.12)",
        tabs: [
          {
            title: "Indices",
            symbols: [
              { s: "BSE:SENSEX", d: "Sensex" },
              { s: "NSE:NIFTY", d: "Nifty 50" },
              { s: "NSE:NIFTYBANK", d: "Nifty Bank" },
              { s: "NSE:NIFTYIT", d: "Nifty IT" },
            ],
            originalTitle: "Indices",
          },
          {
            title: "Top Stocks",
            symbols: [
              { s: "NSE:RELIANCE", d: "Reliance" },
              { s: "NSE:TCS", d: "TCS" },
              { s: "NSE:HDFCBANK", d: "HDFC Bank" },
              { s: "NSE:INFY", d: "Infosys" },
              { s: "NSE:ICICIBANK", d: "ICICI Bank" },
              { s: "NSE:HINDUNILVR", d: "Hindustan Unilever" },
            ],
            originalTitle: "Top Stocks",
          },
        ],
      })

      widgetContainer.appendChild(script)
    }, 200)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [colorTheme, dateRange, showChart, locale, width, height])

  return (
    <div className="tradingview-widget-container bg-white rounded-lg border overflow-hidden">
      <div ref={containerRef} style={{ width, height }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank">
          <span className="text-xs text-gray-500">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}
