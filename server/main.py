from flask import Flask, jsonify, request
from PyPDF2 import PdfReader
import io
from flask_cors import CORS, cross_origin
from ollama import chat, ChatResponse

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["POST", "OPTIONS"])
@cross_origin()
def api():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    
    if "pdf" not in request.files:
        return jsonify({"error": "no file sent"}), 400

    pdf_file = request.files["pdf"]
    pdf_bytes = pdf_file.read()
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

    response: ChatResponse = chat(model='llama3', messages=[
                {
                    'role': 'user',
                    'content': "Summarize this PDF: " + text
                }
            ])
    return jsonify({"message": response.message.content})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
