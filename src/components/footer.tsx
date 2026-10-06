"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Heart, Code, Brain } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">stocKera</span>
            </div>
            <p className="text-sm text-gray-600">
              AI-Powered Stock Trading Platform with advanced LSTM predictions and comprehensive market analysis.
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Brain className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Stock GPT with LLM & NLP</li>
              <li>• LSTM Price Predictions</li>
              <li>• TradingView Integration</li>
              <li>• Real-time Market Data</li>
              <li>• Portfolio Management</li>
              <li>• Technical Analysis</li>
            </ul>
          </div>

          {/* AI Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">AI Tools</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Advanced Stock Predictor</li>
              <li>• Sentiment Analysis</li>
              <li>• Market Trend Analyzer</li>
              <li>• AI Stock Picker</li>
              <li>• Risk Assessment</li>
              <li>• Investment Advisor</li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Developer</h3>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">Made by Arunav</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Full-stack developer passionate about AI and financial technology
                </p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <span>Built with</span>
                  <Heart className="w-3 h-3 text-red-500" />
                  <span>using Next.js & AI</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Made by Arunav</span>
              <span>•</span>
              <span>© 2025 stocKera</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Powered by AI & Machine Learning</span>
              <Badge variant="outline" className="text-xs">
                v1.0.0
              </Badge>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              <strong>Disclaimer:</strong> This platform is for educational and demonstration purposes. All predictions
              and analysis are simulated. Please consult financial advisors for actual investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
