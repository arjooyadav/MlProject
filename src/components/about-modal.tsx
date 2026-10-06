"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Brain, Code, Heart, Zap, BarChart3, Target, Globe, Shield, Sparkles, Info } from "lucide-react"

export default function AboutModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Info className="w-4 h-4 mr-2" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span>About stocKera</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Advanced AI-powered stock trading platform with LSTM predictions and comprehensive market analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Developer Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Made by Arunav</h3>
                  <p className="text-sm text-gray-600">Full-stack Developer & AI Enthusiast</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Passionate about creating innovative financial technology solutions that combine artificial intelligence
                with modern web development. This platform showcases advanced AI capabilities in stock market analysis
                and prediction.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>using Next.js, TypeScript, AI & Machine Learning</span>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Stock GPT</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Advanced LLM & NLP powered AI assistant for comprehensive stock analysis and market insights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">LSTM Predictions</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Deep learning neural networks with sentiment analysis for accurate stock price predictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">TradingView Integration</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Professional charting tools with real-time market data and technical analysis indicators.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold">AI Stock Picker</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Intelligent stock recommendations based on fundamental and technical analysis algorithms.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">Technology Stack</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Badge variant="outline">Next.js 14</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">React 18</Badge>
                <Badge variant="outline">TradingView</Badge>
                <Badge variant="outline">LSTM Networks</Badge>
                <Badge variant="outline">NLP Processing</Badge>
                <Badge variant="outline">AI/ML Models</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Important Disclaimer</h3>
              </div>
              <p className="text-sm text-yellow-700">
                This platform is designed for educational and demonstration purposes. All AI predictions, stock
                analysis, and market data are simulated or for illustrative purposes only. Please consult with qualified
                financial advisors before making any investment decisions.
              </p>
            </CardContent>
          </Card>

          {/* Copyright */}
          <div className="text-center py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Made by Arunav</strong> | © 2025 stocKera Platform
            </p>
            <p className="text-xs text-gray-500">
              All rights reserved. This project showcases advanced AI and web development capabilities.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
