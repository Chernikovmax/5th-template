import '../styles/main.css';

import './feature-products-gallery.js';

import './comments.js';

const slides = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('slide-switches__dot');

let slideIndex = 0;
let slideInterval = setInterval(nextSlide, 2500);
let play = true;

const playbackBtn = document.querySelector('.slide-switches__playback');
const previousBtn = document.querySelector('.slide-switches__prev');
const nextBtn = document.querySelector('.slide-switches__next');

showFirstSlide();

function showFirstSlide() {
  slides[slideIndex].classList.add('slide--active');
  dots[slideIndex].classList.add('slide-switches__dot--active');
}

function slideChange(n) {
  clearSlideshow();
  slideIndex = n;
  if (slideIndex > slides.length-1) {
    slideIndex = 0;
    slides[slideIndex].classList.add('slide--active');
    return dots[slideIndex].classList.add('slide-switches__dot--active');
  }
  if (slideIndex < 0) {
    slideIndex = slides.length-1;
    slides[slideIndex].classList.add('slide--active');
    return dots[slideIndex].classList.add('slide-switches__dot--active');
  }
  slides[slideIndex].classList.add('slide--active');
  dots[slideIndex].classList.add('slide-switches__dot--active');
}

function nextSlide() {
  slideChange(slideIndex+1);
}

function clearSlideshow() {
  slides[slideIndex].classList.remove('slide--active');
  dots[slideIndex].classList.remove('slide-switches__dot--active');
}

// The following code is for buttons

function setSlide(num) {
  pauseSlideshow();
  slideChange(num);
}
global.setSlide = setSlide;

function setPrevSlide() {
  pauseSlideshow();
  slideChange(slideIndex-1);
}
global.setPrevSlide = setPrevSlide;

function setNextSlide() {
  pauseSlideshow();
  slideChange(slideIndex-1);
}
global.setNextSlide = setNextSlide;

const playbackSwitcher = () => {
  if (play === true) {return pauseSlideshow();}
  if (play === false) {return playSlideshow();}
};
global.playbackSwitcher = playbackSwitcher;
// playbackBtn.addEventListener('click', playbackSwitcher);

function playSlideshow() {
  play = true;
  playbackBtn.innerHTML = '&#9612;&#9612;';
  slideInterval = setInterval(nextSlide, 2500);
}

function pauseSlideshow() {
  play = false;
  playbackBtn.innerHTML = '&#9658';
  clearInterval(slideInterval);
}
