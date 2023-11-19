const preview = document.querySelector('.preview-upload');
const convertedImage = document.querySelector('.converted-image');
const convertedImageUrl = document.querySelector('.converted-image-url');

preview.addEventListener('load', () => {
    convertedImage.style.display = 'none';
    convertedImageUrl.style.display = 'none';
    convertedImageWindow.close();
});

preview.addEventListener('error', () => {
    convertedImage.style.display = 'none';
    convertedImageUrl.style.display = 'none';
    convertedImageWindow.close();
});
