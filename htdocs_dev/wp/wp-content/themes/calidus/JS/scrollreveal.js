$(function () {
ScrollReveal().reveal('.textTop', { 
  duration: 1600,
  origin: 'top', 
  reset: false,
  distance: '50px',
});
ScrollReveal().reveal('.textLeft', { 
  duration: 1200,
  origin: 'left', 
  reset: false,
  distance: '100px',
});
ScrollReveal().reveal('.textLeft02', { 
  duration: 1200,
  origin: 'left', 
  distance: '200px',
  reset: false
});
ScrollReveal().reveal('.textRight_top', { 
  duration: 1600,
  origin: 'right', 
  distance: '200px',
  reset: false
});
ScrollReveal().reveal('.textRight', { 
  duration: 1200,
  origin: 'right', 
  distance: '200px',
  reset: false
});
ScrollReveal().reveal('.textBottom', { 
  duration: 1200,
  origin: 'bottom', 
  distance: '100px',
  reset: false
});
});
ScrollReveal().reveal('.slow', { 
  duration: 2000, // デュレーション
  reset: false   // 何回もアニメーション表示
  });