import '../../styles/gallery/gallery.css';
const imagesQuantity = 30;
const pictureMiniatures = [];

(() => {
  for (let i = 0; i < imagesQuantity; i++) {
    pictureMiniatures.push(`<img src="./media/imgs/mountains/minis/${i}_mountain.jpg" alt="Some mountain" class="modal-nav__mini-pic">`);
  }
})();

let currentImage;

const modal = document.querySelector('#gallery-modal');
const modalImage = document.querySelector('.modal-nav__image');
const modalMiniatureField = document.querySelector('.modal-nav');

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const toggleModal = () => {
  document.querySelector('body').classList.toggle('body-scroll');
  if (document.querySelector('.modal-nav__picture') !== null) {
    document.querySelector('.modal-nav__picture').remove();
  }
  modal.classList.toggle('modal-active');
};
  document.querySelector('#close-btn').addEventListener('click', toggleModal);

const clearModalOnClose = () => {
  document.querySelector('.modal-nav__mini-active').classList.remove('modal-nav__mini-active');
  modalMiniatureField.innerHTML = '';
};
  document.querySelector('#close-btn').addEventListener('click', clearModalOnClose);

const renderMiniatures = (arr) => {
  arr.forEach((item) => {

    let out = `<a onclick="setPicture(0)" class="modal-nav__mini-link">
                  ${item}
              </a>`;
    const miniature = document.createElement('li');
    miniature.setAttribute('tabIndex', '1');
    miniature.classList.add('modal-nav__mini');
    miniature.innerHTML = out;

    modalMiniatureField.appendChild(miniature);
  });
};

const openCertainModal = (index) => {
  renderMiniatures(pictureMiniatures);
  document.querySelectorAll('.modal-nav__mini')[index].classList.add('modal-nav__mini-active');
  toggleModal();
  document.querySelector('.modal-nav__mini-active').focus();
  currentImage = index;

  const image = document.createElement('img');
  image.setAttribute('class', 'modal-nav__picture');
  image.setAttribute('alt', 'Some mountain');
  image.setAttribute('src', `./media/imgs/mountains/${index}_mountain.jpg`);

  modalImage.appendChild(image);
};
global.openCertainModal = openCertainModal;

const setPicture = (index) => {
  activateMiniPic(index);
  document.querySelector('.modal-nav__picture').remove();

  const image = document.createElement('img');
  image.setAttribute('class', 'modal-nav__picture');
  image.setAttribute('alt', 'Some mountain');
  image.setAttribute('src', `./media/imgs/mountains/${index}_mountain.jpg`);

  modalImage.insertBefore(image, nextBtn);
};
global.setPicture = setPicture;

const activateMiniPic = (index) => {
  const miniPics = document.querySelectorAll('.modal-nav__mini');
  miniPics[currentImage].classList.remove('modal-nav__mini-active');
  miniPics[index].classList.add('modal-nav__mini-active');
  miniPics[index].focus();
  currentImage = index;
};

const prevPic = () => {
  if ((currentImage-1) > 0) {
    setPicture(currentImage-1);
  } else {
      setPicture(imagesQuantity-1);
    }
};
prevBtn.addEventListener('click', prevPic);


const nextPic = () => {
  if ((currentImage+1) < imagesQuantity) {
    setPicture(currentImage+1);
  } else {
      setPicture(0);
    }
};
nextBtn.addEventListener('click', nextPic);
