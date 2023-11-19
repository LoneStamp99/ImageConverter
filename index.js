const form = document.querySelector('form');
const preview = document.querySelector('.preview-upload');
const selectImg = document.querySelector('#sel');
const conversions = document.querySelectorAll('.choose-conversion option');
const dimensions = document.querySelectorAll('.dimension input[type="checkbox"]');
const convertedImage = document.querySelector('.converted-image');
const convertedImageUrl = document.querySelector('.converted-image-url');
const convertedImageWindow = window.open('', 'Converted Image', 'width=800,height=600');

let selectedConversion = '';
let selectedDimensions = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    selectedConversion = conversions[conversions.value].innerHTML;
    selectedDimensions = [];
    dimensions.forEach((dimension, index) => {
        if (dimension.checked) {
            selectedDimensions.push(dimensions[index].value);
        }
    });
    previewImage();
});

selectImg.addEventListener('change', previewImage);

function previewImage() {
    const file = selectImg.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        preview.src = reader.result;
        preview.style.display = 'block';
        convertedImage.style.display = 'none';
        convertedImageUrl.style.display = 'none';
        convertedImageWindow.close();
    });
    reader.readAsDataURL(file);
}

function convertImage() {
    const formData = new FormData(form);
    formData.append('conversion', selectedConversion);
    formData.append('dimensions', selectedDimensions.join(','));
    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        convertedImage.src = data.image_url;
        convertedImage.style.display = 'block';
        convertedImageUrl.innerHTML = data.image_url;
        convertedImageUrl.style.display = 'block';
        convertedImageWindow.document.write(`<img src="${data.image_url}" style="width: 100%; height: 100%;">`);
        convertedImageWindow.document.title = 'Converted Image';
        convertedImageWindow.document.close();
        convertedImageWindow.focus();
    })
    .catch(error => console.error('Error:', error));
}

form.addEventListener('submit', convertImage);
