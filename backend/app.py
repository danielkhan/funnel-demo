import os
import sentry_sdk
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

load_dotenv()

sentry_sdk.init(
    dsn=os.getenv('PYTHON_APP_SENTRY_DSN'),
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    traces_sample_rate=1.0,
    _experiments={
        # Turns on the metrics module
        "enable_metrics": True,
        # Enables sending of code locations for metrics
        "metric_code_locations": True,
    },
)

app = Flask(__name__)
CORS(app)

@app.route('/complete-order', methods=['GET'])
def enable_metrics():
    try:  
        # To emulate a delay use: response = requests.get('http://127.0.0.1/delay/<delayInSeconds>')
        # To emulate a return status, like 500, use: requests.get('http://127.0.0.1/status/<HTTPstatusToReturn>')
        response = requests.get('http://127.0.0.1/delay/0')

        # Check the status code of the response
        if response.status_code == 200:
            return jsonify({'message': 'Third-party service called successfully.', 'status': response.status_code})
        else:
            # Log the unexpected status code before raising an error
            print(f"Unexpected status code: {response.status_code}")
            raise Exception(f"Unexpected response from third-party service: {response.status_code}")
    except Exception as e:
        # Capture the exception and send it to Sentry
        sentry_sdk.capture_exception(e)
        # Return a generic error response
        return jsonify({'error': 'An error occurred while processing your request.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
