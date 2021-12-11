import { galleryItems } from './app';

import { markup } from './markup';

const galleryListRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.lightbox');

galleryListRef.innerHTML = markup;

const onOpenModalClick = elem => {
  elem.preventDefault();

  if (elem.target.localName === 'img') {
    modalImgRef.src = elem.target.dataset.source;
    modalImgRef.alt = elem.target.alt;
    modalImgRef.dataset.index = elem.target.dataset.index;

    modalRef.classList.add('is-open');
  }
};

const onCloseModalClick = (elem) => {   
  if (elem.target.localName !== 'img') { 
    modalRef.classList.remove('is-open');

    modalImgRef.src = '';
    modalImgRef.alt = '';
  }
};

const onKeyboardClick = elem => {
  if (elem.code === 'Escape') {
    modalRef.classList.remove('is-open');

    modalImgRef.src = '';
    modalImgRef.alt = '';
  }

  if (elem.code === 'ArrowLeft') {
    onArrowLeft();
  }

  if (elem.code === 'ArrowRight') {
    onArrowRight();
  }
};

galleryListRef.addEventListener('click', onOpenModalClick);
modalRef.addEventListener('click', onCloseModalClick);
window.addEventListener('keydown', onKeyboardClick);

function onArrowLeft() {
  let index = +modalImgRef.dataset.index;
  if (index === 0) {
    newSrc(galleryItems.length - 1);
    return;
  }
  newSrc(index, -1);
}
function onArrowRight() {
  let index = +modalImgRef.dataset.index;
  if (index === galleryItems.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  modalImgRef.dataset.index = `${index + step}`;
  modalImgRef.src = galleryItems[index + step].original;
}