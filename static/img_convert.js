const images = [];

const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.width = '800px';
popup.style.height = '600px';
popup.style.backgroundColor = 'white';
popup.style.padding = '20px';
popup.style.border = '2px solid gray';
popup.style.display = 'none';

const imagesContainer = document.createElement('div');
imagesContainer.style.display = 'flex';
imagesContainer.style.flexWrap = 'wrap';
imagesContainer.style.justifyContent = 'space-between';

const closeButton = document.createElement('button');
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '10px';
closeButton.style.backgroundColor = 'white';
closeButton.style.border = 'none';
closeButton.style.cursor = 'pointer';
closeButton.style.fontSize = '20px';
closeButton.innerHTML = '&times;';

const previewContainer = document.createElement('div');
previewContainer.style.width = '100%';
previewContainer.style.height = '50%';
previewContainer.style.display = 'flex';
previewContainer.style.flexWrap = 'wrap';
previewContainer.style.justifyContent = 'space-between';

const preview = document.createElement('img');
preview.style.width = '400px';
preview.style.height = '400px';
preview.style.objectFit = 'cover';
preview.style.objectPosition = 'center';

const previewTitle = document.createElement('h3');
previewTitle.style.marginTop = '10px';
previewTitle.style.marginBottom = '0';
previewTitle.style.fontSize = '24px';

const previewDescription = document.createElement('p');
previewDescription.style.marginTop = '0';
previewDescription.style.fontSize = '18px';

const previewCloseButton = document.createElement('button');
previewCloseButton.style.position = 'absolute';
previewCloseButton.style.top = '10px';
previewCloseButton.style.right = '10px';
previewCloseButton.style.backgroundColor = 'white';
previewCloseButton.style.border = 'none';
previewCloseButton.style.cursor = 'pointer';
previewCloseButton.style.fontSize = '20px';

const previewNavigation = document.createElement('div');
previewNavigation.style.position = 'absolute';
previewNavigation.style.bottom = '10px';
previewNavigation.style.left = '50%';
previewNavigation.style.transform = 'translateX(-50%)';
previewNavigation.style.display = 'flex';
previewNavigation.style.justifyContent = 'space-between';
previewNavigation.style.width = '100%';

const previewNavigationButtonPrev = document.createElement('button');
previewNavigationButtonPrev.style.backgroundColor = 'white';
previewNavigationButtonPrev.style.border = 'none';
previewNavigationButtonPrev.style.cursor = 'pointer';
previewNavigationButtonPrev.style.fontSize = '20px';
previewNavigationButtonPrev.innerHTML = '&lt;';

const previewNavigationButtonNext = document.createElement('button');
previewNavigationButtonNext.style.backgroundColor = 'white';
previewNavigationButtonNext.style.border = 'none';
previewNavigationButtonNext.style.cursor = 'pointer';
previewNavigationButtonNext.style.fontSize = '20px';
previewNavigationButtonNext.innerHTML = '&gt;';

const previewNavigationCounter = document.createElement('p');
previewNavigationCounter.style.marginTop = '0';
previewNavigationCounter.style.marginBottom = '0';
previewNavigationCounter.style.fontSize = '18px';

const previewNavigationCounterCurrent = document.createElement('span');
previewNavigationCounterCurrent.style.fontWeight = 'bold';
previewNavigationCounterCurrent.style.color = 'black';

const previewNavigationCounterTotal = document.createElement('span');
previewNavigationCounterTotal.style.color = 'black';

document.body.appendChild(popup);

closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

previewCloseButton.addEventListener('click', () => {
  const currentIndex = previewNavigationCounterCurrent.innerHTML - 1;
  const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  preview.src = URL.createObjectURL(new Blob([images[newIndex]], {type: 'image/png'}));
  previewTitle.innerHTML = images[newIndex].name;
  previewDescription.innerHTML = images[newIndex].description;
  previewNavigationCounterCurrent.innerHTML = newIndex + 1;
});

previewNavigationButtonPrev.addEventListener('click', () => {
  const currentIndex = previewNavigationCounterCurrent.innerHTML - 1;
  const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  preview.src = URL.createObjectURL(new Blob([images[newIndex]], {type: 'image/png'}));
  previewTitle.innerHTML = images[newIndex].name;
  previewDescription.innerHTML = images[newIndex].description;
  previewNavigationCounterCurrent.innerHTML = newIndex + 1;
});

previewNavigationButtonNext.addEventListener('click', () => {
  const currentIndex = previewNavigationCounterCurrent.innerHTML - 1;
  const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  preview.src = URL.createObjectURL(new Blob([images[newIndex]], {type: 'image/png'}));
  previewTitle.innerHTML = images[newIndex].name;
  previewDescription.innerHTML = images[newIndex].description;
  previewNavigationCounterCurrent.innerHTML = newIndex + 1;
});

const popupScript = document.createElement('script');
popupScript.src = 'popup.js';
document.head.appendChild(popupScript);

function addImage(image, name, description) {
  const imageElement = document.createElement('img');
  imageElement.src = URL.createObjectURL(new Blob([image], {type: 'image/png'}));
  imageElement.name = name;
  imageElement.description = description;
  imageElement.addEventListener('click', () => {
    preview.src = URL.createObjectURL(new Blob([image], {type: 'image/png'}));
    previewTitle.innerHTML = name;
    previewDescription.innerHTML = description;
    previewNavigationCounterCurrent.innerHTML = images.indexOf(image) + 1;
    previewNavigationCounterTotal.innerHTML = images.length;
    popup.style.display = 'flex';
    previewNavigationButtonPrev.disabled = images.indexOf(image) === 0;
    previewNavigationButtonNext.disabled = images.indexOf(image) === images.length - 1;
  });
  imagesContainer.appendChild(imageElement);
  images.push(image);
}

const imagesScript = document.createElement('script');
imagesScript.src = 'images.js';
document.head.appendChild(imagesScript);

function showPopup() {
  popup.style.display = 'flex';
  previewNavigationButtonPrev.disabled = images.indexOf(preview.src) === 0;
  previewNavigationButtonNext.disabled = images.indexOf(preview.src) === images.length - 1;
}

function hidePopup() {
  popup.style.display = 'none';
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hidePopup();
  }
});

document.addEventListener('click', (event) => {
  if (event.target === preview) {
    showPopup();
  }
});
