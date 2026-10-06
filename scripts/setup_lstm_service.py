#!/usr/bin/env python3
"""
Setup script for the LSTM stock prediction service with NLP
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages for LSTM and NLP"""
    print("Installing LSTM and NLP requirements...")
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", "lstm_requirements.txt"
        ])
        print("✅ LSTM requirements installed successfully!")
        
        # Download NLTK data for TextBlob
        print("Downloading NLP models...")
        subprocess.check_call([
            sys.executable, "-c", 
            "import nltk; nltk.download('punkt'); nltk.download('brown')"
        ])
        print("✅ NLP models downloaded successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False

def create_directories():
    """Create necessary directories"""
    print("Creating directories...")
    try:
        os.makedirs("../public/static/predictions", exist_ok=True)
        print("✅ Directories created successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to create directories: {e}")
        return False

def test_lstm_prediction():
    """Test the LSTM prediction service"""
    print("Testing LSTM prediction service...")
    try:
        result = subprocess.run([
            sys.executable, "lstm_stock_predictor.py", "AAPL", "30"
        ], capture_output=True, text=True, timeout=300)
        
        if result.returncode == 0:
            print("✅ LSTM prediction service test passed!")
            return True
        else:
            print(f"❌ LSTM prediction service test failed: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print("❌ LSTM prediction service test timed out")
        return False
    except Exception as e:
        print(f"❌ LSTM prediction service test error: {e}")
        return False

def main():
    print("🚀 Setting up LSTM Stock Prediction Service with NLP...")
    print("=" * 60)
    
    success = True
    success &= create_directories()
    success &= install_requirements()
    success &= test_lstm_prediction()
    
    print("=" * 60)
    if success:
        print("✅ LSTM setup completed successfully!")
        print("\n🧠 Features enabled:")
        print("  • LSTM Neural Networks for time series prediction")
        print("  • NLP Sentiment Analysis using TextBlob")
        print("  • Technical Indicators (RSI, MACD, Moving Averages)")
        print("  • Advanced Visualizations with confidence intervals")
        print("  • Real-time news sentiment integration")
        print("\nTo start the LSTM prediction service:")
        print("1. cd scripts")
        print("2. python lstm_prediction_server.py")
        print("\nThe service will be available at http://localhost:8001")
    else:
        print("❌ Setup failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
