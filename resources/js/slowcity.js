/* gsap.to('.slowcity li span i', {
  x: 0,
  y: '100%',
  duration: 1.5,

  onComplete: function () {
    gsap.to('.slowcity', {
      scale: 10,
      opacity: 0,
      duration: 1,

      onComplete: function () {
        gsap.delayedCall(1, function () {
          document.querySelector('body').classList.remove('-nonescroll');
          window.location.href = '#member';
        });
      },
    });
  },
});
 */
