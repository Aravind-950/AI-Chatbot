from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

# Configure Gemini API
client = genai.Client(api_key="AIzaSyAevxFyIUbFJZVDGd8YwM4kZykXM4NfQ3k")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    try:
        user_message = request.json["message"]

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_message
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:

        return jsonify({
            "reply": str(e)
        })

if __name__ == "__main__":
    app.run(debug=True)
