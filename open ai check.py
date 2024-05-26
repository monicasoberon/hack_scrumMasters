from openai import OpenAI
import requests
from dotenv import load_dotenv
import os
load_dotenv(r'C:\Users\fermo\OneDrive\Documents\GitHub\hack_scrumMasters\API_KEY.env')  # take needed variables from .env.
api_key = os.getenv("OPENAI_API_KEY")
assistance_id = 'asst_LDxuM37PsL5bLfR5PANDmhos'
client = OpenAI(api_key=api_key)


response = requests.get(f'https://api.openai.com/v1/assistants/{assistance_id}', 
                        headers={
                            'Authorization': f'Bearer {api_key}',
                            'OpenAI-Beta': 'assistants=v1'
                        })

print(response.json())

