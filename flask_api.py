import os
from flask import Flask, request, jsonify,render_template
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Load your machine learning model
model = tf.keras.models.load_model('best_model.h5')

# Define a function to process the uploaded image and make predictions
def process_image(image):
    img = tf.image.decode_image(image.read(), channels=3)
    img = tf.image.resize(img, [64,64])
    img = img / 255.0
    img = tf.expand_dims(img, axis=0)
    prediction = model.predict(img)
    class_id = np.argmax(prediction)
    return class_id


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")
@app.route('/upload', methods=['POST'])
def index():
    result = None

    if request.method == 'POST':
        if 'image' in request.files:
            image = request.files['image']
            if image.filename != '':
                class_id = process_image(image)
                if class_id == 0:
                    result = 'Cracked'
                else:
                    result = 'Normal'

    return render_template("result.html",result=result)

if __name__ == '__main__':
    app.run(debug=True)
