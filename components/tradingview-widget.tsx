"use client"

import { useEffect, useRef } from "react"

interface TradingViewWidgetProps {
  symbol?: string
  width?: string | number
  height?: string | number
  theme?: "light" | "dark"
  style?: "1" | "2" | "3"
  locale?: string
  toolbar_bg?: string
  enable_publishing?: boolean
  hide_top_toolbar?: boolean
  hide_legend?: boolean
  save_image?: boolean
  container_id?: string
}

export default function TradingViewWidget({
  symbol = "NSE:RELIANCE",
  width = "100%",
  height = 400,
  theme = "light",
  style = "1",
  locale = "en",
  toolbar_bg = "#f1f3f6",
  enable_publishing = false,
  hide_top_toolbar = false,
  hide_legend = false,
  save_image = false,
  container_id = "tradingview_widget",
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Create a unique container ID to avoid conflicts
    const uniqueId = `tradingview_${Math.random().toString(36).substr(2, 9)}`

    // Create the container div
    const widgetContainer = document.createElement("div")
    widgetContainer.id = uniqueId
    widgetContainer.style.width = typeof width === "number" ? `${width}px` : width.toString()
    widgetContainer.style.height = typeof height === "number" ? `${height}px` : height.toString()

    containerRef.current.appendChild(widgetContainer)

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: theme,
        style: style,
        locale: locale,
        toolbar_bg: toolbar_bg,
        enable_publishing: enable_publishing,
        allow_symbol_change: true,
        container_id: uniqueId,
        hide_top_toolbar: hide_top_toolbar,
        hide_legend: hide_legend,
        save_image: save_image,
        studies: ["STD;SMA", "STD;EMA", "STD;RSI", "STD;MACD"],
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        withdateranges: true,
        hide_side_toolbar: false,
        calendar: false,
      })

      widgetContainer.appendChild(script)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [
    symbol,
    width,
    height,
    theme,
    style,
    locale,
    toolbar_bg,
    enable_publishing,
    hide_top_toolbar,
    hide_legend,
    save_image,
  ])

  return (
    <div className="tradingview-widget-container bg-white rounded-lg border overflow-hidden">
      <div ref={containerRef} id={container_id} style={{ width, height }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank">
          <span className="text-xs text-gray-500">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}
