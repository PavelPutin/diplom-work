{
  const headerInner = document.querySelector(`.header__inner`);
  const headerContent = document.querySelector(`.header__content`);

  setTimeout(setHeaderInnerBottomForBefore, 50)
  window.addEventListener(`resize`, setHeaderInnerBottomForBefore, false);

  function setHeaderInnerBottomForBefore() {
    let bottomForBeforeValue = (document.documentElement.clientWidth < 1024) ? `${headerContent.clientHeight}px` : `0px`;
    headerInner.style.setProperty(`--bottom-for-before`, bottomForBeforeValue);
  }
}
