"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"

export default function Portfolio() {
  const holdings = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      quantity: 10,
      avgPrice: 2340.5,
      currentPrice: 2456.3,
      change: 4.95,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 5,
      avgPrice: 3750.2,
      currentPrice: 3890.15,
      change: 3.73,
    },
    { symbol: "HDFC", name: "HDFC Bank", quantity: 15, avgPrice: 1720.8, currentPrice: 1678.9, change: -2.43 },
    { symbol: "INFY", name: "Infosys Limited", quantity: 8, avgPrice: 1480.3, currentPrice: 1534.25, change: 3.64 },
    { symbol: "ICICIBANK", name: "ICICI Bank", quantity: 12, avgPrice: 920.4, currentPrice: 945.6, change: 2.74 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Portfolio</CardTitle>
        <CardDescription>Current holdings and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.map((stock, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold">{stock.symbol}</h3>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                  <p className="text-xs text-gray-500">{stock.quantity} shares</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">₹{stock.currentPrice}</p>
                <p className="text-sm text-gray-600">Avg: ₹{stock.avgPrice}</p>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={stock.change > 0 ? "default" : "destructive"}
                    className={stock.change > 0 ? "bg-green-100 text-green-700" : ""}
                  >
                    {stock.change > 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
