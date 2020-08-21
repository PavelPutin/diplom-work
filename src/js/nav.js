const navToggle = document.querySelector(`.nav__toggle`);
const navList = document.querySelector(`.nav__list`);
const navDecoration = document.querySelector(`.nav__decoration`);

navToggle.addEventListener(`click`, () => {
  [navToggle, navList, navDecoration].forEach((element) => {
    element.classList.toggle(`active`);
  })
});
