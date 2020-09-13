{
  const headerContactsButton = document.querySelector(`.header-contacts__button`);

  setHeaderContactsButtonContent();
  window.addEventListener(`resize`, setHeaderContactsButtonContent, false);

  function setHeaderContactsButtonContent() {
    headerContactsButton.innerHTML = (document.documentElement.clientWidth > 1024) ? `Заказать звонок`: `<span class="fas fa-phone-alt"></span>`
  }
}
