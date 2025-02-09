//const API = process.env.EXPO_PUBLIC_API_URL;
const url = 'https://api.openai.com/v1/chat/completions';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`
}

const body = {
    "model": "gpt-3.5-turbo-0125",
    "store": true,
    "messages": [
        {"role": "user", "content": "tell me a good spot for a hangout in gainesville, florida in 2 sentences and in 150 characters or less. include emojis!"}
    ]
}

const method = "POST"

const getRequest = async () => { 
    console.log("Headers: ", headers)

    const response = await fetch(url, {method, headers, body: JSON.stringify(body)})

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    return response.json();
 }

export default getRequest