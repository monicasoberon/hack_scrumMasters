import os
# from pdfminer.high_level import extract_text
# import textract 

from pymongo import MongoClient
from gridfs import GridFS

def mongo_connect():
    try:
        conn = MongoClient("mongodb+srv://fermoran:fermoran@scrummasters.zm1sl.mongodb.net",port=27017)
        print("Connected successfully!!!")
        db=conn['HackathonSM']
        return db
    except Exception as e:
            print("Could not connect to MongoDB {e}")

def upload_file(file_loc, file_name, fs):
    try:
        with open(file_loc, 'rb') as f:
            fs.put(f, filename=file_name)
        print("File uploaded successfully")
    except Exception as e:
        print(f"Error uploading file: {e}")


def download_file(file_name,fs, download_loc):
     data = fs.files.find_one({"filename": file_name})
     fs_id=data["_id"]
     out_data = fs.get(fs_id).read()

     with open(download_loc, 'wb') as output:
          output.write(out_data)

# Example usage
print("start")
file_path = "/Users/fermo/OneDrive/Documents\GitHub/hack_scrumMasters/tare/libros/Diles que no me maten.pdf"
file_name="Diles que no me maten.pdf"
download_loc=os.path.join(os.getcwd()+ "/downloads/" ,file_name)
db=mongo_connect()
fs =GridFS(db,collection="pdfdetails")
print("debug")
upload_file(file_loc=file_path,file_name=file_name,fs=fs)


# sendDB(file_path)
print("ending")
