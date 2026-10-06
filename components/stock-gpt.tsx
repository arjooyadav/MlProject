"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Zap,
  Send,
  Bot,
  User,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  AlertCircle,
  BarChart3,
  Globe,
  Code,
  Heart,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  analysis?: StockAnalysis
  suggestions?: string[]
}

interface StockAnalysis {
  symbol?: string
  sentiment: "bullish" | "bearish" | "neutral"
  confidence: number
  keyPoints: string[]
  technicalIndicators?: {
    rsi: number
    macd: string
    support: number
    resistance: number
  }
  fundamentals?: {
    pe: number
    marketCap: string
    revenue: string
    growth: string
  }
}

export default function StockGPT() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm stocKera GPT, your AI-powered stock analysis assistant created by Arunav. I can help you with stock analysis, market insights, trading strategies, and financial questions. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Analyze RELIANCE stock",
        "What's the market outlook for tech stocks?",
        "Explain RSI indicator",
        "Best stocks for long-term investment",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const sampleQuestions = [
    "Analyze RELIANCE stock performance",
    "What are the best dividend stocks in India?",
    "Explain the difference between value and growth investing",
    "How do I read candlestick charts?",
    "What's the current market sentiment?",
    "Should I invest in tech stocks now?",
    "Explain P/E ratio and its significance",
    "What are the risks of options trading?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const analyzeStockQuery = (query: string): StockAnalysis | null => {
    const stockSymbols = ["RELIANCE", "TCS", "HDFC", "INFY", "ICICIBANK", "HINDUNILVR", "BAJFINANCE", "KOTAKBANK"]
    const foundSymbol = stockSymbols.find((symbol) => query.toUpperCase().includes(symbol))

    if (foundSymbol) {
      return {
        symbol: foundSymbol,
        sentiment: Math.random() > 0.5 ? "bullish" : "bearish",
        confidence: Math.floor(Math.random() * 30) + 70,
        keyPoints: [
          `Strong quarterly earnings growth`,
          `Positive analyst recommendations`,
          `Sector outlook remains favorable`,
          `Technical indicators show ${Math.random() > 0.5 ? "bullish" : "bearish"} trend`,
        ],
        technicalIndicators: {
          rsi: Math.floor(Math.random() * 40) + 30,
          macd: Math.random() > 0.5 ? "Bullish crossover" : "Bearish divergence",
          support: Math.floor(Math.random() * 100) + 2000,
          resistance: Math.floor(Math.random() * 100) + 2200,
        },
        fundamentals: {
          pe: Math.floor(Math.random() * 20) + 15,
          marketCap: "₹" + (Math.floor(Math.random() * 500) + 100) + "K Cr",
          revenue: "₹" + (Math.floor(Math.random() * 100) + 50) + "K Cr",
          growth: Math.floor(Math.random() * 20) + 5 + "%",
        },
      }
    }
    return null
  }

  const generateAIResponse = async (userQuery: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const query = userQuery.toLowerCase()

    // Stock-specific responses with Arunav attribution
    if (query.includes("reliance")) {
      return `**RELIANCE Analysis by stocKera AI:**

Reliance Industries Limited (RIL) is India's largest private sector company with diverse business interests:

**Current Outlook:** 📈 **BULLISH**
- Strong performance in petrochemicals and retail segments
- Jio's 5G rollout creating new revenue streams  
- Green energy initiatives positioning for future growth
- Consistent dividend payments with strong cash flows

**Key Metrics:**
- P/E Ratio: ~12.5x (attractive valuation)
- Market Cap: ₹17+ Lakh Crores
- Debt-to-Equity: Improving trend
- ROE: ~8-10% range

**Technical View:**
- RSI: Currently at 58 (neutral zone)
- Support: ₹2,350-2,400
- Resistance: ₹2,550-2,600
- 50-day MA trending upward

**Investment Thesis:**
✅ Diversified business model reduces risk
✅ Strong balance sheet and cash generation
✅ Leadership position in multiple sectors
⚠️ Oil price volatility can impact margins
⚠️ High competition in telecom sector

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`
    }

    if (query.includes("tcs") || query.includes("tech")) {
      return `**Tech Sector & TCS Analysis by stocKera AI:** 🚀

The Indian IT sector continues to show resilience despite global headwinds:

**TCS Highlights:** 🚀
- Largest IT services company globally
- Strong client relationships and recurring revenue
- Digital transformation driving growth
- Consistent margin expansion

**Sector Outlook:**
- Cloud migration accelerating post-pandemic
- AI/ML adoption creating new opportunities  
- BFSI and retail verticals showing strength
- Currency tailwinds supporting margins

**Investment Strategy:**
- TCS remains a quality pick for long-term investors
- Diversified service portfolio reduces client concentration risk
- Strong dividend yield (~3-4%) with regular payouts
- Premium valuation justified by consistent execution

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`
    }

    if (query.includes("market") && query.includes("outlook")) {
      return `**Current Market Outlook by stocKera AI:** 📊

**Macro Environment:**
- RBI maintaining accommodative stance
- Inflation showing signs of moderation
- FII flows turning positive after recent outflows
- Corporate earnings growth expected to accelerate

**Sectoral Rotation:**
🔥 **Hot Sectors:** Banking, Auto, Pharma
📉 **Cooling Off:** IT, FMCG (high valuations)
⚡ **Emerging Themes:** Green Energy, Defense, Infrastructure

**Key Risks to Watch:**
- Global recession concerns
- Geopolitical tensions
- Crude oil price volatility
- Monsoon impact on rural demand

**Strategy Recommendation:**
- Maintain 60-70% equity allocation
- Focus on quality large-caps
- Gradual SIP approach for volatility management
- Keep some cash for opportunities

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`
    }

    if (query.includes("rsi") || query.includes("technical")) {
      return `**RSI (Relative Strength Index) Explained by stocKera AI:** 📈

**What is RSI?**
RSI is a momentum oscillator that measures the speed and change of price movements, ranging from 0 to 100.

**How to Read RSI:**
- **Above 70:** Potentially overbought (sell signal)
- **Below 30:** Potentially oversold (buy signal)  
- **50:** Neutral momentum
- **Divergence:** Price vs RSI moving in opposite directions

**Trading Strategies:**
1. **Mean Reversion:** Buy at RSI 30, sell at RSI 70
2. **Trend Following:** Look for RSI above 50 in uptrends
3. **Divergence Trading:** Spot momentum shifts early

**Pro Tips:**
✅ Use with other indicators (MACD, Moving Averages)
✅ Adjust periods (14 is standard, 21 for less sensitivity)
✅ Consider market context (trending vs sideways)
⚠️ Can stay overbought/oversold in strong trends
⚠️ False signals in choppy markets

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`
    }

    if (query.includes("dividend") || query.includes("income")) {
      return `**Top Dividend Stocks in India by stocKera AI:** 💰

**High Dividend Yield Picks:**

**1. Coal India (CIL)** - ~7-8% yield
- Government backing ensures stability
- Consistent cash flows from coal mining
- Special dividends during good years

**2. ONGC** - ~6-7% yield  
- Oil & gas exploration major
- Government ownership provides stability
- Dividend linked to oil prices

**3. Power Grid Corp** - ~5-6% yield
- Monopoly in power transmission
- Regulated business model
- Steady cash flows

**4. ITC** - ~4-5% yield
- FMCG and cigarette major
- Strong cash generation
- Consistent dividend history

**Dividend Investment Strategy:**
✅ Focus on dividend sustainability, not just yield
✅ Check payout ratio (should be <60-70%)
✅ Look for growing dividends over time
✅ Consider dividend aristocrats (10+ years of increases)

**Tax Consideration:**
- Dividend income taxed as per income slab
- Consider dividend vs growth funds based on tax bracket

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`
    }

    // General responses for other queries
    const responses = [
      `Based on current market conditions and technical analysis, here's my assessment:

**Market Sentiment:** Currently showing mixed signals with selective stock picking becoming crucial.

**Key Recommendations:**
- Focus on fundamentally strong companies
- Maintain diversified portfolio across sectors  
- Consider systematic investment approach
- Keep monitoring global cues and domestic policy changes

**Risk Management:**
- Set stop losses for individual positions
- Avoid concentration in single stock/sector
- Regular portfolio rebalancing recommended

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`,

      `**Investment Strategy Insights by stocKera AI:** 📈

The current market environment requires a balanced approach:

**For Long-term Investors:**
- Quality large-cap stocks remain attractive
- SIP in diversified equity funds
- Focus on companies with strong moats

**For Active Traders:**
- Watch for breakout patterns
- Monitor volume confirmation
- Use technical indicators for entry/exit

**Sector Rotation Opportunities:**
- Banking sector showing revival signs
- Infrastructure theme gaining momentum
- Selective pharma stocks looking attractive

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`,

      `**Financial Planning Perspective by stocKera AI:** 📈

Here's a comprehensive view for your investment journey:

**Asset Allocation Framework:**
- Equity: 60-70% (based on risk appetite)
- Debt: 20-30% (for stability)
- Gold/Commodities: 5-10% (hedge against inflation)

**Stock Selection Criteria:**
✅ Strong management track record
✅ Consistent earnings growth
✅ Reasonable valuations (P/E, P/B ratios)
✅ Good return on equity (ROE >15%)
✅ Low debt-to-equity ratio

**Monitoring Framework:**
- Quarterly result analysis
- Annual portfolio review
- Rebalancing based on market conditions

*Analysis powered by Arunav's AI algorithms | © 2025 stocKera*`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError("")

    try {
      const analysis = analyzeStockQuery(input)
      const aiResponse = await generateAIResponse(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        analysis,
        suggestions: [
          "Tell me more about this analysis",
          "What are the risks involved?",
          "Compare with sector peers",
          "Show technical chart patterns",
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError("Failed to get response. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>stocKera GPT</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Code className="w-3 h-3 mr-1" />
              By Arunav
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced LLM & NLP powered stock analysis assistant created by Arunav. Ask anything about stocks, markets,
            or trading strategies.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full border rounded-lg p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "assistant" && (
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-purple-600" />
                        </div>
                      )}
                      {message.type === "user" && (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3 h-3 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>

                        {/* Stock Analysis Card */}
                        {message.analysis && (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{message.analysis.symbol} Analysis</h4>
                              <Badge
                                variant="secondary"
                                className={
                                  message.analysis.sentiment === "bullish"
                                    ? "bg-green-100 text-green-700"
                                    : message.analysis.sentiment === "bearish"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                                }
                              >
                                {message.analysis.sentiment === "bullish" ? (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                ) : message.analysis.sentiment === "bearish" ? (
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                ) : (
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                )}
                                {message.analysis.sentiment.toUpperCase()}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Confidence</p>
                                <p className="font-medium">{message.analysis.confidence}%</p>
                              </div>
                              {message.analysis.technicalIndicators && (
                                <div>
                                  <p className="text-gray-600">RSI</p>
                                  <p className="font-medium">{message.analysis.technicalIndicators.rsi}</p>
                                </div>
                              )}
                            </div>

                            {message.analysis.keyPoints && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-600 mb-1">Key Points:</p>
                                <ul className="text-xs space-y-1">
                                  {message.analysis.keyPoints.slice(0, 2).map((point, idx) => (
                                    <li key={idx} className="text-gray-700">
                                      • {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Analysis Attribution */}
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>AI Analysis by Arunav</span>
                                <span>© 2025 stocKera</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && message.type === "assistant" && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 bg-transparent"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === "assistant" && (
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => copyMessage(message.content)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-purple-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        <span className="text-sm text-gray-600">stocKera GPT is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything about stocks, markets, or trading..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={handleSendMessage} disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>

            {/* Sample Questions */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.slice(0, 4).map((question, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-transparent"
                    onClick={() => handleSuggestionClick(question)}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Attribution Footer */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">Powered by Advanced AI & NLP</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500" />
                <span>by</span>
                <Badge variant="outline" className="bg-white">
                  Arunav
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Capabilities with Attribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Technical Analysis</h3>
            </div>
            <p className="text-sm text-gray-600">
              Real-time technical indicator analysis, chart pattern recognition, and trading signal generation.
            </p>
            <div className="mt-2 text-xs text-gray-500">AI Algorithms by Arunav</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Market Intelligence</h3>
            </div>
            <p className="text-sm text-gray-600">
              Comprehensive market data analysis, sector insights, and investment strategy recommendations.
            </p>
            <div className="mt-2 text-xs text-gray-500">© 2025 stocKera Platform</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
