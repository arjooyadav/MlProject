"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import TradingViewWidget from "@/components/tradingview-widget"

export default function StockChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>RELIANCE</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                +2.4%
              </Badge>
            </CardTitle>
            <CardDescription>Reliance Industries Limited</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">₹2,456.30</p>
            <p className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +₹57.80 today
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <TradingViewWidget symbol="NSE:RELIANCE" height={400} theme="light" style="1" hide_top_toolbar={true} />
      </CardContent>
    </Card>
  )
}
