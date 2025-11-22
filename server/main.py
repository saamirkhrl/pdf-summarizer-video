from flask import Flask, jsonify, request
from ollama import ChatResponse, chat

app = Flask(__name__)

@app.route("/api", methods=["GET", "POST"])
def api():
    return jsonify({"hello": "test"})

if __name__ == "__main__":
    app.run(debug=True)