from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = keras.models.load_model('best_model.h5')

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0 
    return img


@app.route('/classify', methods=['GET','POST'])
def classify_image():
    try:
        file = request.files['image']
        # print(file)
        if(file):
            image_path = 'temp_image.jpg'
            file.save(image_path)
            processed_image = preprocess_image(image_path)
            predictions = model.predict(processed_image)
            predicted_class = np.argmax(predictions)
            class_labels = ["Cracked", "Normal"] 

            result = {
                "class": class_labels[predicted_class],
                "confidence": float(predictions[0][predicted_class])
            }

            return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
