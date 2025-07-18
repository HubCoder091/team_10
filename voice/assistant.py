import os
import speech_recognition as sr
import pyttsx3
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Use valid Gemini mod
model = genai.GenerativeModel(model_name="models/gemini-2.5-flash")

# Initialize speech engine
engine = pyttsx3.init()

def speak(text):
    print(f"Assistant: {text}")
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.WaitTimeoutError:
            speak("Sorry, I didn't catch that.")
            return None
        except sr.UnknownValueError:
            speak("Sorry, I couldn't understand that.")
            return None
        except sr.RequestError:
            speak("Sorry, speech recognition service is unavailable.")
            return None

def ask_gemini(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error: {e}")
        return "Sorry, something went wrong."

# Main loop
if __name__ == "__main__":
    speak("Hi, I'm your Gemini assistant. Ask me anything.")
    while True:
        query = listen()
        if query:
            answer = ask_gemini(query)
            speak(answer)











