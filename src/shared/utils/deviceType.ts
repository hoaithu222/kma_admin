export function isPhone() {
  return window.innerWidth < 768;
}

export function isTablet() {
  const width = window.innerWidth;
  return width >= 768 && width < 1024;
}

export function isLaptop() {
  return window.innerWidth >= 1024;
}
