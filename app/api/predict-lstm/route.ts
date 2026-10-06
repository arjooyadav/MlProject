import { type NextRequest, NextResponse } from "next/server"

// Simulate LSTM prediction with realistic data
function simulateLSTMPrediction(stockSymbol: string, days: number) {
  // Generate realistic stock data simulation
  const basePrice = Math.random() * 2000 + 500 // Random base price between 500-2500
  const volatility = 0.02 + Math.random() * 0.03 // 2-5% volatility

  // Simulate technical indicators
  const rsi = 30 + Math.random() * 40 // RSI between 30-70
  const macd = (Math.random() - 0.5) * 10 // MACD between -5 to 5
  const sentiment = (Math.random() - 0.5) * 2 // Sentiment between -1 to 1

  // Generate price predictions
  const predictions = []
  let currentPrice = basePrice
  let positiveDays = 0

  for (let i = 0; i < days; i++) {
    const randomChange = (Math.random() - 0.5) * volatility * 2
    const sentimentInfluence = sentiment * 0.01
    const trendInfluence = Math.sin(i / 10) * 0.005 // Add some trend

    currentPrice = currentPrice * (1 + randomChange + sentimentInfluence + trendInfluence)
    predictions.push(currentPrice)

    if (i > 0 && predictions[i] > predictions[i - 1]) {
      positiveDays++
    }
  }

  const avgPredictedPrice = predictions.reduce((a, b) => a + b, 0) / predictions.length
  const priceChange = ((avgPredictedPrice - basePrice) / basePrice) * 100
  const trend = priceChange > 0 ? "bullish" : "bearish"

  // Simulate model performance metrics
  const modelAccuracy = 75 + Math.random() * 20 // 75-95% accuracy
  const rmse = basePrice * (0.02 + Math.random() * 0.03) // 2-5% RMSE
  const mae = rmse * 0.8

  return {
    stock: stockSymbol,
    current_price: basePrice,
    predicted_avg_price: avgPredictedPrice,
    price_change_percent: priceChange,
    trend: trend,
    positive_days: positiveDays,
    negative_days: days - positiveDays - 1,
    prediction_period: days,
    sentiment_score: sentiment,
    model_accuracy: modelAccuracy,
    rmse: rmse,
    mae: mae,
    plot_filename: `static/predictions/${stockSymbol}_lstm_prediction.png`,
    last_data_date: new Date().toISOString().split("T")[0],
    data_points_used: 500 + Math.floor(Math.random() * 200),
    predictions: predictions,
    confidence: 80 + Math.random() * 15,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { stock_symbol, days = 30 } = await request.json()

    if (!stock_symbol) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock symbol is required",
        },
        { status: 400 },
      )
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate simulated LSTM prediction
    const predictionData = simulateLSTMPrediction(stock_symbol.toUpperCase(), Math.min(days, 60))

    return NextResponse.json({
      success: true,
      data: predictionData,
      error: null,
    })
  } catch (error) {
    console.error("LSTM prediction error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate LSTM prediction. Please try again later.",
      },
      { status: 500 },
    )
  }
}
