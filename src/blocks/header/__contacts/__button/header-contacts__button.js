const headerContactsButton = document.querySelector(`.header-contacts__button`);

setHeaderContactsButtonContent();
window.addEventListener(`resize`, setHeaderContactsButtonContent, false);


function setHeaderContactsButtonContent() {
  if (document.documentElement.clientWidth > 1024) {
    headerContactsButton.innerHTML = `Заказать звонок`;
  } 
  else {
    headerContactsButton.innerHTML = `<span class="fas fa-phone-alt"></span>`;
  }
}
