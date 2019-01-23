import '../styles/main.css';

import './feature-products-slider.js';

let slideIndex = 0;

showSlides();

function showSlides() {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('slide__dot-switcher');

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('slide--active');
    dots[i].classList.remove('slide__dot-switcher--active');
  }
  slides[slideIndex].classList.add('slide--active');
  dots[slideIndex].classList.add('slide__dot-switcher--active');
  slideIndex++;
  if (slideIndex > slides.length-1) {slideIndex = 0};
  setTimeout(showSlides, 3000);
}
