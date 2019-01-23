const first = document.querySelector('[data-type="1st-feature-product"]');
first.addEventListener("click", showFeatureProduct(0));

const second = document.querySelector('[data-type="2nd-feature-product"]');
second.addEventListener("click", showFeatureProduct(1));

const third = document.querySelector('[data-type="3rd-feature-product"]');
third.addEventListener("click", showFeatureProduct(2));

const fourth = document.querySelector('[data-type="4th-feature-product"]');
fourth.addEventListener("click", showFeatureProduct(3));

const fifth = document.querySelector('[data-type="5th-feature-product"]');
fifth.addEventListener("click", showFeatureProduct(4));

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
