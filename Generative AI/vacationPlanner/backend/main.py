from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import requests, os
from fastapi.responses import JSONResponse
import json

AUTH0_DOMAIN = "dev-3m5xb601yhqbwgz2.us.auth0.com"
API_IDENTIFIER = "http://vacationPlanner/api"
ALGORITHMS = ["RS256"]

token_auth_scheme = HTTPBearer()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # use specific origin for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

generator = pipeline("text-generation", model="gpt2")  # change to any LLM

class TravelForm(BaseModel):
    name: str
    place: str
    travellers: int
    departure: str
    arrival: str
    question: str



def get_jwks():
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    return requests.get(url).json()["keys"]

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    token = credentials.credentials
    unverified_header = jwt.get_unverified_header(token)
    jwks = get_jwks()

    rsa_key = {}
    for key in jwks:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }
            break

    if not rsa_key:
        raise HTTPException(status_code=401, detail="Token invalid")

    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_IDENTIFIER,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )
        return payload
    except Exception as e:
        raise HTTPException(status_code=403, detail=f"Token decode failed: {str(e)}")



# @app.post("/travelform")
# async def chat_with_form(data: TravelForm):
#     print(type(data))
#     context = (
#         f"{data.name} is planning to travel to {data.place} with {data.travellers} people "
#         f"from {data.departure} to {data.arrival}. They asked: {data.question}"
#     )
#     result = generator(context, max_length=100, num_return_sequences=1)
#     return {"response": result[0]["generated_text"]}


@app.post("/chat")
async def chatQuery(data:ChatRequest,  user=Depends(verify_token)):
    print(data.message)
    # context = (
    #     f"{data.message}"
    # )
    # result = generator(context, max_length=100, num_return_sequences=1)
    # return {"response": result[0]["generated_text"]}

    file_path = "flight_response.json"  # adjust if saved elsewhere

    if not os.path.exists(file_path):
        print("here")
        return JSONResponse(content={"error": "Flight data not found"}, status_code=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # print(type(data))

    # print(data)

    return JSONResponse(content={"response": data})


# @app.post("/chat")
# async def chat(input: ChatInput):
#     try:
#         result = agent_executor.invoke({"input": input.message})
#         return {"response": result["output"]}
#     except Exception as e:
#         return {"error": str(e)}



