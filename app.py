from flask import Flask, request, jsonify, render_template, redirect
import json
import os

app = Flask(__name__)

# Endpoint to collect fingerprints
@app.route('/collect', methods=['POST'])
def collect():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Get the client's IP address
        data['ip'] = request.remote_addr

        # Log the data
        with open('fingerprints.log', 'a') as f:
            json.dump(data, f)
            f.write('\n')

        return jsonify({'message': 'Fingerprint collected'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve the index page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
