const introLogo = document.querySelectorAll('.intro__img-png');
const introVideo = document.querySelectorAll('.intro__video');
const introWrap = document.querySelectorAll('.intro__wrap');
const body = document.body;

/* gsap.to(introLogo, {
  opacity: 0,
  delay: 3,
  duration: 5,

  onComplete: function () {
    gsap.to(introWrap, {
      opacity: 1,
      delay: 3,
      duraion: 5,

      onComplete: function () {
        gsap.to(introWrap, {
          background: '#000',

          onComplete: function () {
            setTimeout(function () {
              const memberSection = document.getElementById('member');
              body.classList.remove('-noneScroll');
              memberSection.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
          },
        });
      },
    });
  },
}); */

$(document).ready(function () {
  /* $('.navigation li a').hover(function () {
    $(this).toggleClass('glitch');
  }); */
  $('.navigation li a').click(function () {
    $('.navigation li a').removeClass('glitch');
    $(this).addClass('glitch');
  });

  $('.intro-logo').hover(function () {
    $('.intro__wrap').stop().fadeToggle();
  });

  $('.member__name a').click(function () {
    $('.member__name a').removeClass('on glitch');
    $(this).toggleClass('on glitch');

    var dataText = $(this).data('text');
    var correspondingFigure = $('.member__img').find('.' + dataText);
    $('.member__img figure').removeClass('on');
    correspondingFigure.addClass('on');
  });

  $.getJSON('/resources/js/album.json', function (data) {
    data.forEach(function (album) {
      var slideHTML = `
        <li class="swiper-slide">
        <a href="${album.albumURL}" target="_blank">
          <figure>
            <img src="${album.albumThum}" alt="" />
          </figure>
          <dl>
            <dt>${album.albumName}</dt>
            <dd>${album.albumCategory}</dd>
            <dd class="date">${album.albumDate}</dd>
          </dl>
          </a>
        </li>
      `;
      // Append the slide HTML to the swiper wrapper
      $('.albumSwiper .swiper-wrapper').append(slideHTML);
    });

    // Initialize the swiper
    var albumSwiper = new Swiper('.albumSwiper', {
      slidesPerView: 'auto',
      spaceBetween: 50,
      speed: 500,
      navigation: {
        nextEl: '.albumSwiper__next',
        prevEl: '.albumSwiper__prev',
      },
    });
  });
});
