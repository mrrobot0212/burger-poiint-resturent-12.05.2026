from flask import Flask, request
import requests

app = Flask(__name__)

BOT_TOKEN = "YOUR_BOT_TOKEN"
CHAT_ID = "YOUR_CHAT_ID"

@app.route("/order", methods=["POST"])
def order():
    data = request.json

    text = "🍔 NEW ORDER\n\n"

    for i in data["items"]:
        text += f"{i['name']} - {i['price']} TK\n"

    text += f"""
----------------
Total: {data['total']} TK
Name: {data['name']}
Phone: {data['phone']}
Address: {data['address']}
"""

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    requests.post(url, data={"chat_id":CHAT_ID,"text":text})

    print("ORDER SENT ✔")

    return {"status":"ok"}

if __name__ == "__main__":
    app.run(debug=True)