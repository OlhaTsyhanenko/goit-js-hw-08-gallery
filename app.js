const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const listEl = document.querySelector('.js-gallery');
const imageAdd = addItemImages(galleryItems);

function addItemImages(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
  })
    .join('');
}
listEl.insertAdjacentHTML('afterbegin',imageAdd);

// const makeGalleryItems = galleryItems => {
//   return galleryItems.map(galleryItem => {
//     const itemEl = document.createElement('li');
//     itemEl.classList.add('gallery__item');
//     const linkEl = document.createElement('a');
//     linkEl.classList.add('gallery__link');
//     linkEl.href = galleryItem.original;

//     const imgEl = document.createElement('img');
//     imgEl.classList.add('gallery__image');
//     imgEl.src = galleryItem.preview;
//     imgEl.dataset.source = galleryItem.preview;
//     imgEl.alt = galleryItem.description;

//     linkEl.append(imgEl);
//     itemEl.append(linkEl);

//     return itemEl;
//   });
// };
// const elements = makeGalleryItems(galleryItems);
// listEl.append(...elements);
// console.log(listEl);

const lightbox = document.querySelector('.js-lightbox');
const btn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('div.lightbox__overlay');

function onClickImage(e) {
  e.preventDefault();
  
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  lightbox.classList.add('is-open');
  lightbox.querySelector('.lightbox__image').src = e.target.dataset.source;
  lightbox.querySelector('.lightbox__image').alt = e.target.alt;
}

function clearImage() {
  const img = lightbox.querySelector('.lightbox__image');
  if (img.src !== "") {
    img.src = "";
    img.alt = "";
  }
}

function onClickCloseBtn(e) {
  console.log(e.target.dataset.action);
  // if (e.target.dataset.action !=="close-lightbox") {
  //   return;
  // }
  const currentActiveImage = document.querySelector('.js-lightbox.is-open');
  if (currentActiveImage) {
    currentActiveImage.classList.remove('is-open');
  }
  clearImage();
}


function onClickCloseOverlay(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  }

  const currentActiveImage = document.querySelector('.js-lightbox.is-open');
  if (currentActiveImage) {
    currentActiveImage.classList.remove('is-open');
  }
  clearImage();
}

function onClickEsc(e) {
  if (e.key !== "Escape") {
    return;
  }
  const currentActiveImage = document.querySelector('.js-lightbox.is-open');
  currentActiveImage.classList.remove('is-open');
  clearImage();
}

let counter;
const arr = document.querySelectorAll(".gallery__item");

function onClickRight(e) {
  if (e.key !== "ArrowRight") {
    return;
  } 
  arr.forEach((el, index) => {
    console.log(el.querySelector('.gallery__image').dataset.source);
      if (lightbox.querySelector('.lightbox__image').src === el.querySelector('.gallery__image').dataset.source) {
        counter = index + 1;
        if (counter === arr.length) {
          counter = 0;
        }
      }
  });

   console.log('counter', counter);
  console.log('arr.length',arr.length);
  lightbox.querySelector('.lightbox__image').src = arr[counter].querySelector('.gallery__image').dataset.source;
  lightbox.querySelector('.lightbox__image').alt = arr[counter].querySelector('.gallery__image').alt;
}

function onClickLeft(e) {
  if (e.key !== "ArrowLeft") {
    return;
  } 
  arr.forEach((el, index) => {
    console.log(el.querySelector('.gallery__image').dataset.source);
      if (lightbox.querySelector('.lightbox__image').src === el.querySelector('.gallery__image').dataset.source) {
        counter = index - 1;
        if (counter === -1) {
          counter = arr.length-1;
        }
      }
  });

  
  console.log('counter', counter);
  console.log('arr.length',arr.length);
  lightbox.querySelector('.lightbox__image').src = arr[counter].querySelector('.gallery__image').dataset.source;
  lightbox.querySelector('.lightbox__image').alt = arr[counter].querySelector('.gallery__image').alt;
}

listEl.addEventListener('click', onClickImage);
btn.addEventListener('click', onClickCloseBtn);
overlay.addEventListener('click', onClickCloseOverlay);
window.addEventListener('keydown', onClickEsc);
listEl.addEventListener('keydown', onClickRight);
listEl.addEventListener('keydown', onClickLeft);




