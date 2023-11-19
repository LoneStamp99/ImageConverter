from flask import Flask, request, send_file, render_template
from werkzeug.utils import secure_filename
import os
import img_convert
from werkzeug.utils import secure_filename
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import secrets

app = Flask("Image Converter")
app.config['SECRET_KEY'] = 'secret_key'
app.config['UPLOADED_IMAGES_DEST'] = 'uploads'
socketio = SocketIO(app)
CORS(app)

@app.route('/convert', methods=['GET', 'POST'])
def convert():
    if request.method == 'POST':
        # Get selected conversion and dimensions
        conversion = request.form['conversion']
        dimensions = []
        for checkbox in request.form:
            if 'dimension' in checkbox:
                dimensions.append(checkbox[10:])

        # Save uploaded file and convert it
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOADED_IMAGES_DEST'], filename))
        converted_file = convert_image(filename, conversion, dimensions)

        # Display converted image in pop-up window
        return render_template('pop-up_output_window.html', image_url=converted_file)

    return render_template('index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.css')
def css():
    return send_file('index.css')

@app.route('/index.js')
def js():
    return send_file('index.js')

@app.route('/indexapp.cache')
def cache():
    return send_file('indexapp.cache')

@app.route('/pop-up_output_window.js')
def javas():
    return send_file('pop-up_output_window.js')

@app.route('/img_convert.js')
def conjs():
    return send_from_directory('static', 'img_convert.js')

@app.route('/preview.js')
def previeweds():
    return send_from_directory('static', 'preview.js')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

@app.route('/README.md')
def md():
    return send_file('README.md')

@app.route('/requirements.txt')
def txt():
    return send_file('requirements.txt')

@app.route('/img_convert.py')
def py():
    return send_file('img_convert.py')

@app.route('/.vscode/setting.json')
def json():
    return send_file('.vscode/setting.json')

@app.route('/src/bg.png')
def png():
    return send_file('src/bg.png')

@app.route('/src/bg1.0.jpg')
def jpg():
    return send_file('src/bg1.0.jpg')

@app.route('/src/icon.jpg')
def jpg2():
    return send_file('src/icon.jpg')

@app.route('/src/sample_preview.png')
def png2():
    return send_file('src/sample_preview.png')

@app.route('/converted/ai')
def folai():
    return send_file('converted/ai')

@app.route('/converted/apng')
def folapng():
    return send_file('converted/apng')

@app.route('/converted/bmp')
def folbmp():
    return send_file('converted/bmp')

@app.route('/converted/bmp ico')
def folbmpico():
    return send_file('converted/bmp ico')

@app.route('/converted/eps')
def foleps():
    return send_file('converted/eps')

@app.route('/converted/gif')
def folgif():
    return send_file('converted/gif')

@app.route('/converted/ico')
def folico():
    return send_file('converted/ico')

@app.route('/converted/indd')
def folindd():
    return send_file('converted/indd')

@app.route('/converted/jpeg')
def foljpeg():
    return send_file('converted/jpeg')

@app.route('/converted/pdf')
def folpdf():
    return send_file('converted/pdf')

@app.route('/converted/png')
def folpng():
    return send_file('converted/png')

@app.route('/converted/psd')
def folpsd():
    return send_file('converted/psd')

@app.route('/converted/raw')
def folraw():
    return send_file('converted/raw')

@app.route('/converted/svg')
def folsvg():
    return send_file('converted/svg')

@app.route('/converted/tiff')
def foltiff():
    return send_file('converted/tiff')

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
