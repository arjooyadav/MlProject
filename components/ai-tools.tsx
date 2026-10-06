"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BarChart3, Zap, Target, TrendingUp, Sparkles, Code, Heart, User } from "lucide-react"
import LSTMChart from "@/components/lstm-chart"
import StockGPT from "@/components/stock-gpt"

export default function AITools() {
  const [selectedStock, setSelectedStock] = useState("")
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleStockPrediction = async () => {
    if (!selectedStock) return
    setLoading(true)

    try {
      // Call the LSTM prediction API
      const response = await fetch("/api/predict-lstm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock_symbol: selectedStock.toUpperCase(),
          days: 30,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setPrediction({
          symbol: selectedStock.toUpperCase(),
          currentPrice: result.data.current_price,
          predictedPrice: result.data.predicted_avg_price,
          priceChange: result.data.price_change_percent,
          trend: result.data.trend,
          positiveDays: result.data.positive_days,
          negativeDays: result.data.negative_days,
          confidence: Math.round(result.data.confidence),
          modelAccuracy: Math.round(result.data.model_accuracy),
          sentimentScore: result.data.sentiment_score,
          rmse: result.data.rmse.toFixed(2),
          timeframe: `${result.data.prediction_period} days`,
          lastDataDate: result.data.last_data_date,
          dataPoints: result.data.data_points_used,
          plotUrl: result.data.plot_filename,
          predictions: result.data.predictions,
        })
      } else {
        setPrediction({
          error: result.error || "Failed to generate LSTM prediction",
        })
      }
    } catch (error) {
      console.error("Prediction error:", error)
      setPrediction({
        error: "Unable to connect to prediction service. Using demo mode.",
      })
    } finally {
      setLoading(false)
    }
  }

  const aiPicks = [
    { symbol: "RELIANCE", price: 2456.3, change: +2.4, confidence: 92, reason: "Strong fundamentals" },
    { symbol: "TCS", price: 3890.15, change: +1.8, confidence: 89, reason: "Tech sector growth" },
    { symbol: "HDFC", price: 1678.9, change: -0.5, confidence: 85, reason: "Banking recovery" },
    { symbol: "INFY", price: 1534.25, change: +3.2, confidence: 91, reason: "AI adoption boost" },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Developer Attribution */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">stocKera AI Tools</h1>
          <p className="text-gray-600">Advanced analytics and predictions powered by stocKera's AI engine</p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Code className="w-3 h-3 mr-1" />
              Made by Arunav
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
            <User className="w-3 h-3 mr-1" />© 2025 Arunav
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="gpt" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gpt" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Stock GPT</span>
          </TabsTrigger>
          <TabsTrigger value="predictor" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Stock Predictor</span>
          </TabsTrigger>
          <TabsTrigger value="analyzer" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Trend Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="picker" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>AI Picker</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gpt" className="space-y-6">
          <StockGPT />
        </TabsContent>

        <TabsContent value="predictor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Stock Price Predictor</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Code className="w-3 h-3 mr-1" />
                  By Arunav
                </Badge>
              </CardTitle>
              <CardDescription>
                Advanced LSTM neural networks with NLP sentiment analysis for accurate stock predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter stock symbol (e.g., RELIANCE, TCS)"
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleStockPrediction} disabled={loading || !selectedStock}>
                  {loading ? "Analyzing..." : "Predict"}
                </Button>
              </div>

              {prediction && !prediction.error && (
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg flex items-center">
                          {prediction.symbol}
                          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                            LSTM + NLP
                          </Badge>
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Price:</span>
                            <span className="font-medium">₹{prediction.currentPrice?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Predicted Avg Price:</span>
                            <span
                              className={`font-medium ${prediction.priceChange > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              ₹{prediction.predictedPrice?.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price Change:</span>
                            <span
                              className={`font-medium ${prediction.priceChange > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {prediction.priceChange > 0 ? "+" : ""}
                              {prediction.priceChange?.toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Trend Direction:</span>
                            <Badge
                              variant="secondary"
                              className={
                                prediction.trend === "bullish"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            >
                              {prediction.trend?.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sentiment Score:</span>
                            <span
                              className={`font-medium ${prediction.sentimentScore > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {prediction.sentimentScore?.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">LSTM Model Performance:</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Model Accuracy:</span>
                            <span className="font-medium">{prediction.modelAccuracy}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">RMSE:</span>
                            <span className="font-medium">{prediction.rmse}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Positive Days:</span>
                            <span className="font-medium text-green-600">{prediction.positiveDays}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Negative Days:</span>
                            <span className="font-medium text-red-600">{prediction.negativeDays}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Data Points:</span>
                            <span className="font-medium">{prediction.dataPoints}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Last Data:</span>
                            <span className="font-medium">{prediction.lastDataDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {prediction.predictions && prediction.predictions.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">LSTM Prediction Analysis:</h4>
                        <LSTMChart
                          predictions={prediction.predictions}
                          currentPrice={prediction.currentPrice}
                          symbol={prediction.symbol}
                        />
                      </div>
                    )}

                    {/* Developer Attribution in Prediction Results */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>AI Model developed by Arunav</span>
                        <span>© 2025 stocKera Platform</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyzer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Trend Analyzer</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Code className="w-3 h-3 mr-1" />
                  By Arunav
                </Badge>
              </CardTitle>
              <CardDescription>Advanced technical analysis and trend identification powered by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Market Trend</h3>
                        <p className="text-2xl font-bold text-green-600">Bullish</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="mt-2 text-xs text-gray-600">AI Analysis by Arunav's Algorithm</div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Volatility</h3>
                        <p className="text-2xl font-bold text-blue-600">Medium</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="mt-2 text-xs text-gray-600">Risk Assessment Model</div>
                  </CardContent>
                </Card>
              </div>

              {/* Developer Attribution */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Advanced AI Analytics</h4>
                      <p className="text-sm text-gray-600">Powered by machine learning algorithms</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    <User className="w-3 h-3 mr-1" />
                    Created by Arunav
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>AI Stock Picker</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Code className="w-3 h-3 mr-1" />
                  By Arunav
                </Badge>
              </CardTitle>
              <CardDescription>Curated stock recommendations based on AI analysis and machine learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPicks.map((stock, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">{stock.symbol}</h3>
                            <p className="text-sm text-gray-600">{stock.reason}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{stock.price}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                              {stock.change > 0 ? "+" : ""}
                              {stock.change}%
                            </span>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                              {stock.confidence}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* AI Model Attribution */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">AI Stock Selection Algorithm</h4>
                      <p className="text-sm text-gray-600">Advanced machine learning model for stock recommendations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-white mb-1">
                      <User className="w-3 h-3 mr-1" />
                      Developed by Arunav
                    </Badge>
                    <div className="text-xs text-gray-500">© 2025 All Rights Reserved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Attribution for AI Tools */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Brain className="w-6 h-6" />
              <h3 className="text-xl font-bold">stocKera AI Platform</h3>
            </div>
            <p className="text-blue-100">
              Advanced artificial intelligence and machine learning platform for stock market analysis
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-300" />
                <span>by</span>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Arunav
                </Badge>
              </div>
              <span>•</span>
              <span>© 2025 All Rights Reserved</span>
            </div>
            <div className="text-xs text-blue-200">
              Powered by LSTM Neural Networks, NLP Processing & Advanced AI Algorithms
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
