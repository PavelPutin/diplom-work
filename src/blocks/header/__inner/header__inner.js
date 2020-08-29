const headerInner = document.querySelector(`.header__inner`);
const headerContent = document.querySelector(`.header__content`);

setTimeout(setHeaderInnerBeforeBottom, 50)
window.addEventListener(`resize`, setHeaderInnerBeforeBottom, false);


function setHeaderInnerBeforeBottom() {
  if (document.documentElement.clientWidth < 1024) {
    headerInner.style.setProperty(`--bottom-for-before`, `${headerContent.clientHeight}px`);
  } 
  else {
    headerInner.style.setProperty(`--bottom-for-before`, `0px`);
  }
}

