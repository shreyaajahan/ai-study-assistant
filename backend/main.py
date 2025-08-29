from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request & Response models
class ChatMessage(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

@app.get("/")
def root():
    return {"message": "AI Study Assistant Backend is running 🚀"}

@app.post("/ask")
def ask_ai(chat: ChatRequest):
    # System prompt for Markdown formatting
    groq_messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful AI Study Assistant. "
                "Always return answers in **structured Markdown** format "
                "with headings, bullet points, and line breaks for readability."
            ),
        }
    ]

    # Append user/AI messages
    for msg in chat.messages:
        role = "user" if msg.sender == "user" else "assistant"
        groq_messages.append({"role": role, "content": msg.text})

    # Call Groq API
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=groq_messages,
    )

    return {"response": response.choices[0].message.content}
