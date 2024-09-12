from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Clean the CSV by removing rows with missing values
    df = pd.read_csv(file_path)
    cleaned_df = df.dropna()
    
    # Return the cleaned CSV as a string
    cleaned_csv = cleaned_df.to_csv(index=False)

    return cleaned_csv

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Use a different port, e.g., 5001

