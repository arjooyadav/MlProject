"use client"

import { useEffect, useRef } from "react"

interface TradingViewTickerProps {
  symbols?: Array<{
    proName: string
    title: string
  }>
  showSymbolLogo?: boolean
  colorTheme?: "light" | "dark"
  isTransparent?: boolean
  displayMode?: "adaptive" | "compact" | "regular"
  locale?: string
}

export default function TradingViewTicker({
  symbols = [
    { proName: "BSE:SENSEX", title: "Sensex" },
    { proName: "NSE:NIFTY", title: "Nifty 50" },
    { proName: "NSE:RELIANCE", title: "Reliance" },
    { proName: "NSE:TCS", title: "TCS" },
    { proName: "NSE:HDFCBANK", title: "HDFC Bank" },
    { proName: "NSE:INFY", title: "Infosys" },
    { proName: "NSE:ICICIBANK", title: "ICICI Bank" },
  ],
  showSymbolLogo = true,
  colorTheme = "light",
  isTransparent = false,
  displayMode = "adaptive",
  locale = "en",
}: TradingViewTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Create a unique container ID
    const uniqueId = `ticker_${Math.random().toString(36).substr(2, 9)}`

    // Create the container div
    const widgetContainer = document.createElement("div")
    widgetContainer.id = uniqueId
    widgetContainer.style.width = "100%"
    widgetContainer.style.height = "46px"

    containerRef.current.appendChild(widgetContainer)

    // Add delay for DOM readiness
    const timer = setTimeout(() => {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: symbols,
        showSymbolLogo: showSymbolLogo,
        colorTheme: colorTheme,
        isTransparent: isTransparent,
        displayMode: displayMode,
        locale: locale,
      })

      widgetContainer.appendChild(script)
    }, 150)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [symbols, showSymbolLogo, colorTheme, isTransparent, displayMode, locale])

  return (
    <div className="tradingview-widget-container bg-white rounded-lg border overflow-hidden mb-4">
      <div ref={containerRef} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noreferrer noopener nofollow" target="_blank">
          <span className="text-xs text-gray-500">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}
