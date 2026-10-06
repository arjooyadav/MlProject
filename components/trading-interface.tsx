"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, DollarSign, Clock, CheckCircle } from "lucide-react"

export default function TradingInterface() {
  const [orderType, setOrderType] = useState("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")

  const recentOrders = [
    { id: 1, symbol: "RELIANCE", type: "BUY", quantity: 10, price: 2456.3, status: "completed", time: "10:30 AM" },
    { id: 2, symbol: "TCS", type: "SELL", quantity: 5, price: 3890.15, status: "pending", time: "11:15 AM" },
    { id: 3, symbol: "HDFC", type: "BUY", quantity: 15, price: 1678.9, status: "completed", time: "12:45 PM" },
  ]

  const watchlist = [
    { symbol: "RELIANCE", price: 2456.3, change: +2.4 },
    { symbol: "TCS", price: 3890.15, change: +1.8 },
    { symbol: "HDFC", price: 1678.9, change: -0.5 },
    { symbol: "INFY", price: 1534.25, change: +3.2 },
    { symbol: "ICICIBANK", price: 945.6, change: +1.1 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">stocKera Trading</h1>
          <p className="text-gray-600">Execute trades with stocKera's advanced trading interface</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>Execute buy or sell orders for your selected stocks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={orderType} onValueChange={setOrderType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy</span>
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Sell</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock-symbol">Stock Symbol</Label>
                      <Select value={selectedStock} onValueChange={setSelectedStock}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stock" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RELIANCE">RELIANCE - ₹2456.30</SelectItem>
                          <SelectItem value="TCS">TCS - ₹3890.15</SelectItem>
                          <SelectItem value="HDFC">HDFC - ₹1678.90</SelectItem>
                          <SelectItem value="INFY">INFY - ₹1534.25</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order-type">Order Type</Label>
                      <Select defaultValue="market">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market Order</SelectItem>
                          <SelectItem value="limit">Limit Order</SelectItem>
                          <SelectItem value="stop-loss">Stop Loss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated Total:</span>
                      <span className="font-semibold text-lg">
                        ₹
                        {quantity && price
                          ? (Number.parseFloat(quantity) * Number.parseFloat(price)).toLocaleString()
                          : "0"}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Place Buy Order
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock-symbol-sell">Stock Symbol</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select from holdings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RELIANCE">RELIANCE (10 shares)</SelectItem>
                          <SelectItem value="TCS">TCS (5 shares)</SelectItem>
                          <SelectItem value="HDFC">HDFC (15 shares)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order-type-sell">Order Type</Label>
                      <Select defaultValue="market">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market Order</SelectItem>
                          <SelectItem value="limit">Limit Order</SelectItem>
                          <SelectItem value="stop-loss">Stop Loss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity-sell">Quantity</Label>
                      <Input id="quantity-sell" type="number" placeholder="Enter quantity" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price-sell">Price (₹)</Label>
                      <Input id="price-sell" type="number" placeholder="Enter price" />
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Place Sell Order
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${order.type === "BUY" ? "bg-green-500" : "bg-red-500"}`} />
                      <div>
                        <p className="font-medium">{order.symbol}</p>
                        <p className="text-sm text-gray-600">
                          {order.type} {order.quantity} shares @ ₹{order.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                        {order.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {order.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>Stocks you're tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {watchlist.map((stock, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-gray-600">₹{stock.price}</p>
                    </div>
                    <div className={`text-sm font-medium ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Market Status:</span>
                  <Badge className="bg-green-100 text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Open
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">NIFTY 50:</span>
                  <span className="font-medium text-green-600">19,674.25 (+0.8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SENSEX:</span>
                  <span className="font-medium text-green-600">66,598.91 (+0.6%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
