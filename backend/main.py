from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Groq client with API key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body schema
class QueryRequest(BaseModel):
    query: str

# Root endpoint
@app.get("/")
def home():
    return {"message": "🚀 AI Study Assistant (Groq) is running"}

# AI query endpoint
@app.post("/ask")
def ask_ai(request: QueryRequest):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",  # ✅ Correct Groq model
        messages=[
            {"role": "system", "content": "You are a helpful AI Study Assistant."},
            {"role": "user", "content": request.query},
        ],
    )
    return {"response": response.choices[0].message.content}
