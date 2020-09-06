const navToggle = document.querySelector(`.header-nav__toggle`);
const navList = document.querySelector(`.header-nav__list`);
const navDecoration = document.querySelector(`.header-nav__decoration`);

navToggle.addEventListener(`click`, () => {
  [navToggle, navList, navDecoration].forEach((element) => {
    element.classList.toggle(`active`);
  })
});