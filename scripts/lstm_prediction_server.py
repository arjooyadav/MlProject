from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import sys

app = Flask(__name__)
CORS(app)

@app.route('/predict-lstm', methods=['POST'])
def predict_stock_lstm():
    try:
        data = request.get_json()
        stock_symbol = data.get('stock_symbol', '').strip().upper()
        days = min(int(data.get('days', 30)), 60)  # Limit to 60 days for LSTM
        
        if not stock_symbol:
            return jsonify({
                'success': False,
                'error': 'Stock symbol is required'
            }), 400
        
        # Execute the LSTM predictor script
        result = subprocess.run([
            sys.executable, 'lstm_stock_predictor.py', stock_symbol, str(days)
        ], capture_output=True, text=True, cwd=os.path.dirname(__file__), timeout=300)
        
        if result.returncode != 0:
            return jsonify({
                'success': False,
                'error': f'LSTM prediction failed: {result.stderr}'
            }), 500
        
        # Parse the result
        try:
            prediction_result = json.loads(result.stdout)
            return jsonify(prediction_result)
        except json.JSONDecodeError:
            return jsonify({
                'success': False,
                'error': 'Failed to parse LSTM prediction result'
            }), 500
            
    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False,
            'error': 'LSTM prediction timed out. Please try again.'
        }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model': 'LSTM+NLP'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
