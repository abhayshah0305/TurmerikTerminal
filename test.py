from dotenv import load_dotenv
import os

# ✅ Load environment variables
load_dotenv()

# ✅ Check if API key is set
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("❌ ERROR: OPENAI_API_KEY is missing! Ensure the .env file is set up correctly.")

print("✅ OpenAI API Key Loaded Successfully!")

import os
print(os.getenv("OPENAI_API_KEY"))