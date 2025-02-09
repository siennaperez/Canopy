const url = 'https://api.openai.com/v1/chat/completions';

const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer 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'
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