import urllib.request
import json

api_key = "AQ.Ab8RN6IUDzadWcQX61hLp" + "6XoigDsHIwx5zF0iqO9IPy6I9lcSA"
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

payload = {
    "contents": [{
        "role": "user",
        "parts": [{"text": "Hello, this is a test."}]
    }]
}

req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
    print(e.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
