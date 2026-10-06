import { Card, CardContent } from "@/components/ui/card"
import { Brain } from "lucide-react"

const StockGPT = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Stock Analysis with AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Advanced NLP</h3>
            </div>
            <p className="text-sm text-gray-600">
              Natural language processing for understanding complex financial queries and market sentiment analysis.
            </p>
            <div className="mt-2 text-xs text-gray-500">Developed by Arunav</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Predictive Analytics</h3>
            </div>
            <p className="text-sm text-gray-600">
              Leveraging machine learning to forecast stock prices and market trends with high accuracy.
            </p>
            <div className="mt-2 text-xs text-gray-500">Powered by cutting-edge algorithms</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Real-time Data Integration</h3>
            </div>
            <p className="text-sm text-gray-600">
              Accessing and processing real-time stock data from various sources for up-to-the-minute analysis.
            </p>
            <div className="mt-2 text-xs text-gray-500">Constantly updated for maximum relevance</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StockGPT
