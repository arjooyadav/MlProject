"use client"

import { useEffect, useRef } from "react"

interface TradingViewScreenerProps {
  width?: string | number
  height?: string | number
  defaultColumn?: string
  defaultScreen?: string
  market?: string
  showToolbar?: boolean
  colorTheme?: "light" | "dark"
  locale?: string
}

export default function TradingViewScreener({
  width = "100%",
  height = 400,
  defaultColumn = "overview",
  defaultScreen = "most_capitalized",
  market = "india",
  showToolbar = true,
  colorTheme = "light",
  locale = "en",
}: TradingViewScreenerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Create a unique container ID
    const uniqueId = `screener_${Math.random().toString(36).substr(2, 9)}`

    // Create the container div
    const widgetContainer = document.createElement("div")
    widgetContainer.id = uniqueId
    widgetContainer.style.width = typeof width === "number" ? `${width}px` : width.toString()
    widgetContainer.style.height = typeof height === "number" ? `${height}px` : height.toString()

    containerRef.current.appendChild(widgetContainer)

    // Add delay for proper initialization
    const timer = setTimeout(() => {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: defaultColumn,
        defaultScreen: defaultScreen,
        market: market,
        showToolbar: showToolbar,
        colorTheme: colorTheme,
        locale: locale,
      })

      widgetContainer.appendChild(script)
    }, 300)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [width, height, defaultColumn, defaultScreen, market, showToolbar, colorTheme, locale])

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
