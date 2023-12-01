from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS
from twilio.rest import Client
import time

app = Flask(__name__)
CORS(app)
model = keras.models.load_model('best_model.h5')

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0 
    return img

setofresult = []
@app.route('/classify', methods=['POST'])
def classify_image():
    try:
        phone_number = request.form['number']
        phone_number = "+91" + phone_number
        files = request.files.getlist('image')
        if not files:
            return jsonify({"error": "No files uploaded"})


        for num, file in enumerate(files):
            image_path = f'temp_image_{num}.jpg'
            file.save(image_path)
            processed_image = preprocess_image(image_path)
            predictions = model.predict(processed_image)
            predicted_class = np.argmax(predictions)
            class_labels = ["Cracked", "Normal"] 

            result = {
                "class": class_labels[predicted_class],
                "confidence": float(predictions[0][predicted_class])
            }

            setofresult.append(result)
        x = setofresult[0]["class"]
        currenttime = time.strftime("%Y-%m-%d %H:%M:%S")
        tobesent = f"Your tires are known to be {x} when uploaded on the website at {currenttime}."
        account_sid = 'ACcb5bb990f8c72d6e5daa6be5e767b4dc'
        auth_token = 'a6fbf2bf13d78d3016ee6c97d7e191e7'
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            from_='+13344782560',
            body=tobesent,
            to=phone_number
        )

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True,port=6000)
