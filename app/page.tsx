"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { TrendingUp, ShoppingCart, DollarSign, Eye, ArrowUpRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Portfolio from "@/components/portfolio"
import AITools from "@/components/ai-tools"
import TradingInterface from "@/components/trading-interface"
import MarketOverview from "@/components/market-overview"
import TradingViewWidget from "@/components/tradingview-widget"
import TradingViewMarketOverview from "@/components/tradingview-market-overview"
import TradingViewTicker from "@/components/tradingview-ticker"
import TradingViewScreener from "@/components/tradingview-screener"
import LoginForm from "@/components/login-form"

export default function StockTradingPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [widgetsLoaded, setWidgetsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("stocKera_user")
    if (user) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidgetsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Store login state
    localStorage.setItem(
      "stocKera_user",
      JSON.stringify({
        email: credentials.email,
        loginTime: new Date().toISOString(),
      }),
    )

    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("stocKera_user")
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600">Loading stocKera...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            {/* Market Ticker */}
            {widgetsLoaded ? (
              <TradingViewTicker />
            ) : (
              <div className="bg-white rounded-lg border p-4 mb-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Header Section - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">stocKera Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Welcome to stocKera! Here's your portfolio overview with live market data.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent flex-1 sm:flex-none"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sell
                </Button>
              </div>
            </div>

            {/* Stats Cards - Mobile Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Portfolio Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">₹2,45,680</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Today's P&L</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold text-green-600">+₹3,240</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +1.32%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Available Funds</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">₹45,320</div>
                  <p className="text-xs text-gray-600">Ready to invest</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total Positions</CardTitle>
                  <Eye className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg sm:text-2xl font-bold">24</div>
                  <p className="text-xs text-gray-600">Active holdings</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Main TradingView Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>Live Market Chart</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {widgetsLoaded ? (
                      <TradingViewWidget
                        symbol="NSE:RELIANCE"
                        height={400}
                        theme="light"
                        style="1"
                        hide_top_toolbar={false}
                        save_image={true}
                      />
                    ) : (
                      <div className="bg-white rounded-lg border p-8">
                        <div className="animate-pulse">
                          <div className="h-64 sm:h-96 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Market Overview Widget */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Eye className="w-5 h-5 text-green-600" />
                      <span>Market Overview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {widgetsLoaded ? (
                      <TradingViewMarketOverview height={350} colorTheme="light" showChart={true} />
                    ) : (
                      <div className="bg-white rounded-lg border p-8">
                        <div className="animate-pulse">
                          <div className="h-64 sm:h-96 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <MarketOverview />

                {/* Stock Screener */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      <span>Stock Screener</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {widgetsLoaded ? (
                      <TradingViewScreener height={350} defaultScreen="top_gainers" market="india" showToolbar={true} />
                    ) : (
                      <div className="bg-white rounded-lg border p-8">
                        <div className="animate-pulse">
                          <div className="h-64 sm:h-96 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Portfolio />
          </TabsContent>

          <TabsContent value="ai-tools">
            <AITools />
          </TabsContent>

          <TabsContent value="trading">
            <TradingInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
