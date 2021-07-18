export const smoothScrollTo = direction => {
  window.scrollTo({
    top: direction === 'down' ? document.documentElement.scrollHeight : 1,
    behavior: 'smooth',
  });
};
