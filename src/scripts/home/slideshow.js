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
  slideChange(slideIndex+1);
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

  playbackBtn.innerHTML =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0"
     viewBox="0 0 47.607 47.607" xml:space="preserve">
    <g>
      <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
        l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
      <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
        C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
    </g>
  </svg>`;

  slideInterval = setInterval(nextSlide, 2500);
}

function pauseSlideshow() {
  play = false;
  playbackBtn.innerHTML =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0"
  	 viewBox="0 0 232.153 232.153" xml:space="preserve">
  	<g>
  		<path style="fill: #ff2d2d;fill-rule:evenodd;clip-rule:evenodd;" d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266
  			c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267
  			l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z"/>
  	</g>
  </svg>`;
  clearInterval(slideInterval);
}

function focusOnLetter() {
  document.getElementById('addressee-name').focus();
}
document.querySelector('.slide__contact-btn').addEventListener('click', focusOnLetter);
