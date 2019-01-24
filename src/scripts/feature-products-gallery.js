const showFirstProduct = () =>showFeatureProduct(0);
const first = document.querySelector('[data-type="1st-feature-product"]');
first.addEventListener("click", showFirstProduct);

const showSecondProduct = () =>showFeatureProduct(1);
const second = document.querySelector('[data-type="2nd-feature-product"]');
second.addEventListener("click", showSecondProduct);

const showThirdProduct = () =>showFeatureProduct(2);
const third = document.querySelector('[data-type="3rd-feature-product"]');
third.addEventListener("click", showThirdProduct);

const showFourthProduct = () =>showFeatureProduct(3);
const fourth = document.querySelector('[data-type="4th-feature-product"]');
fourth.addEventListener("click", showFourthProduct);

const showFifthProduct = () =>showFeatureProduct(4);
const fifth = document.querySelector('[data-type="5th-feature-product"]');
fifth.addEventListener("click", showFifthProduct);

function showFeatureProduct(index) {
  const products = document.getElementsByClassName('feature-products__slide');
  const titles = document.getElementsByClassName('feature-products__menu-item');

  for (let i = 0; i < products.length; i++) {
    products[i].classList.remove('feature-products__slide--active');
    titles[i].classList.remove('feature-products__menu-item--active');
  }

  products[index].classList.add('feature-products__slide--active');
  titles[index].classList.add('feature-products__menu-item--active');
}
