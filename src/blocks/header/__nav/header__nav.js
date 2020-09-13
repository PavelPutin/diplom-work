{
  const navToggle = document.querySelector(`.header-nav__toggle`);
  const elementToToggle = document.querySelectorAll(`.header-nav__toggle, .header-nav__list, .header-nav__decoration`)

  navToggle.addEventListener(`click`, () => {
    elementToToggle.forEach(element => element.classList.toggle(`active`));
  });
}