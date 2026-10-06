"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function MarketOverview() {
  const marketData = [
    { name: "NIFTY 50", value: "19,674.25", change: "+0.8%", positive: true },
    { name: "SENSEX", value: "66,598.91", change: "+0.6%", positive: true },
    { name: "NIFTY BANK", value: "44,892.35", change: "-0.2%", positive: false },
    { name: "NIFTY IT", value: "31,245.80", change: "+1.2%", positive: true },
  ]

  const topGainers = [
    { symbol: "ADANIPORTS", change: "+5.2%" },
    { symbol: "TATAMOTORS", change: "+4.8%" },
    { symbol: "BAJFINANCE", change: "+3.9%" },
  ]

  const topLosers = [
    { symbol: "DRREDDY", change: "-2.1%" },
    { symbol: "CIPLA", change: "-1.8%" },
    { symbol: "SUNPHARMA", change: "-1.5%" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>Live market indices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketData.map((market, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{market.name}</p>
                  <p className="text-sm text-gray-600">{market.value}</p>
                </div>
                <Badge
                  variant={market.positive ? "default" : "destructive"}
                  className={market.positive ? "bg-green-100 text-green-700" : ""}
                >
                  {market.positive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {market.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Top Gainers</h4>
              <div className="space-y-2">
                {topGainers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{stock.symbol}</span>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stock.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-red-600 mb-2">Top Losers</h4>
              <div className="space-y-2">
                {topLosers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{stock.symbol}</span>
                    <Badge variant="destructive">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {stock.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
