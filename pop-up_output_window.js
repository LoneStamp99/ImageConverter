const outputWindow = document.querySelector('.output-window');
const outputWindowClose = document.querySelector('.output-window-close');
const outputWindowTitle = document.querySelector('.output-window-title');

outputWindowClose.addEventListener('click', () => {
  outputWindow.classList.remove('active');
});

outputWindowTitle.textContent = 'Converted Image';

// Call img_convert.py to generate converted image and display it in outputWindow
