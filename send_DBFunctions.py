import openai
import os
from pdfminer.high_level import extract_text
import textract 
from sklearn.feature_extraction.text import CountVectorizer
from langdetect import detect


from pymongo import MongoClient
from gridfs import GridFS


# Set up OpenAI API credentials
# openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to generate txt if needed (ya no se usa)
def readFile(file_path):
    if file_path.endswith('.pdf'):
        text = extract_text(file_path)
        with open('new_file.txt', 'w',encoding='utf-8') as f:
            f.write(text)
        return text
    
    elif file_path.endswith('.txt'):
        text = open(file_path, 'r').read()
        return text


def sendDB(file_path):
    # Connect to MongoDB
    client = MongoClient('localhost', 3001)
    # Select the database
    db = client['ScrumMaster']
    # Select the collection
    collection = db['Pdfs']
    # Create a GridFS object
    fs = GridFS(db)

    # Read the file content
    with open(file_path, 'rb') as file:
        content = file.read()

    # If the file size is less than 16MB, store it as a regular document
    if len(content) < 16 * 1024 * 1024:  # 16MB in bytes
        document = {
            'id_curso': '1',
            'file_content': content
        }
        collection.insert_one(document)
    # If the file size is 16MB or more, store it in GridFS
    else:
        with open(file_path, 'rb') as file:
            fs.put(file, filename=file_path, id_curso='1')

# Example usage
file_path = r"tare/libros/Competitive programming handbook.pdf"
print("start")
# print("start")
# quiz_questions = readFile(file_path)
sendDB(file_path)
print("ending")
