const url = 'https://api.openai.com/v1/chat/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ADD KEY HERE'
}

const body = {
    "model": "gpt-3.5-turbo-0125",
    "store": true,
    "messages": [
        {"role": "user", "content": "tell me a good spot for a hangout in gainesville, florida in 2 sentences and in 150 characters or less. include emojis!"}
    ]
}

const method = "POST"

const getRequest = () =>fetch(url, {method, headers, body: JSON.stringify(body)})

export default getRequest