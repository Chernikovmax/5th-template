import '../../styles/gallery/gallery.css';
//
// import './feature-products-gallery.js';
let currentImage;
const picsQuantity = document.querySelectorAll('.gallery__item').length;

const modal = document.querySelector('#gallery-modal');
const modalImage = document.querySelector('.modal-nav__image');

const toggleModal = () => {
  if (document.querySelector('.modal-nav__picture') !== null) {
    document.querySelector('.modal-nav__picture').remove();
  }
  modal.classList.toggle('modal-active');
};
  document.querySelector('#close-btn').addEventListener('click', toggleModal);

const openCertainModal = (index) => {
  document.querySelectorAll('.modal-nav__mini-pic')[index].classList.add('modal-nav__mini-active');
  toggleModal();
  currentImage = index;

  const image = document.createElement('img');
  image.setAttribute('class', 'modal-nav__picture');
  image.setAttribute('alt', 'Some mountain');
  image.setAttribute('src', `./media/imgs/mountains/${index}_mountain.jpg`);

  modalImage.insertBefore(image, modalImage.firstChild);
};
global.openCertainModal = openCertainModal;

const setPicture = (index) => {
  activateMiniPic(index);
  document.querySelector('.modal-nav__picture').remove();

  const image = document.createElement('img');
  image.setAttribute('class', 'modal-nav__picture');
  image.setAttribute('alt', 'Some mountain');
  image.setAttribute('src', `./media/imgs/mountains/${index}_mountain.jpg`);

  modalImage.insertBefore(image, modalImage.firstChild);
};
global.setPicture = setPicture;

const activateMiniPic = (index) => {
  const miniPics = document.querySelectorAll('.modal-nav__mini-pic');
  miniPics[currentImage].classList.remove('modal-nav__mini-active');
  miniPics[index].classList.add('modal-nav__mini-active');
  currentImage = index;
};

const nextPic = () => {
  if ((currentImage+1) < picsQuantity) {
    setPicture(currentImage+1);
  } else {
      setPicture(0);
    }
};

const prevPic = () => {
  if ((currentImage-1) > 0) {
    setPicture(currentImage-1);
  } else {
      setPicture(picsQuantity-1);
    }
};
