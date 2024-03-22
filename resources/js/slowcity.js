$(document).ready(function () {
  $('.mobile-btn').click(function () {
    $('nav').toggleClass('on');
    $('.mobile-btn').toggleClass('on');
  });

  /* gsap */
  let links = gsap.utils.toArray('.navigation li a');

  links.forEach((link) => {
    let element = document.querySelector(link.getAttribute('href')),
      linkST = ScrollTrigger.create({
        trigger: element,
        start: 'top top',
      });

    ScrollTrigger.create({
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => setActive(link),
    });
  });

  function setActive(link) {
    links.forEach((el) => el.classList.remove('glitch'));
    link.classList.add('glitch');
  }

  const introLogo = document.querySelectorAll('.intro__img-png');
  const introVideo = document.querySelectorAll('.intro__video');
  const introWrap = document.querySelectorAll('.intro__wrap');
  const body = document.body;
  const nav = document.querySelectorAll('.navigation');
  const mobileBtn = document.querySelectorAll('.mobile-btn');

  gsap.to(mobileBtn, {
    opacity: 0,
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom', // [trigger] [scroller] positions
      end: 'top bottom',
      scrub: true,
    },
  });

  /* //gsap */

  const isMobile = (() => {
    const { userAgent, maxTouchPoints } = window.navigator;
    const isMac = /Macintosh/i.test(userAgent);
    if (isMac && maxTouchPoints > 0) return true;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi|mobi/i.test(
      userAgent
    );
  })();

  if (isMobile) {
    /* $('section').hide();
    $('.mobile-blur').show(); */
    $('body').removeClass('-noneScroll');
    $('.navigation li a').click(function () {
      $('nav').removeClass('on');
      $('.mobile-btn').removeClass('on');
    });
  } else {
    gsap.set(nav, {
      opacity: 0,
    });

    gsap.to(introLogo, {
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

                gsap.to(nav, {
                  opacity: 1,
                });
              },
            });
          },
        });
      },
    });

    $('.intro-logo').hover(function () {
      $('.intro__wrap').toggleClass('hide');
    });
  }

  $('.member__name span').click(function () {
    $('.member__name span').removeClass('on glitch');
    $(this).toggleClass('on glitch');

    var dataText = $(this).data('text');
    var id = $(this).attr('id');

    var correspondingFigure = $('.member__img').find('.' + id);
    $('.member__img figure').removeClass('on');
    correspondingFigure.addClass('on');
  });

  $.getJSON('./resources/js/album.json', function (data) {
    data.forEach(function (album) {
      var slideHTML = `
        <li class="swiper-slide" onClick="openPopup()">
          <div data-album="${album.albumURL}">
            <figure>
              <img src="${album.albumThum}" alt="" />
            </figure>
            <dl>
              <dt>${album.albumName}</dt>
              <dd>${album.albumCategory}</dd>
              <dd class="date">${album.albumDate}</dd>
            </dl>
          </div>
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

  // album__popup-wrap을 제외한 부분에 대한 클릭 이벤트 처리
  $('.album__popup').on('click', function (event) {
    if (!$(event.target).closest('.album__popup-wrap').length) {
      $('.album__popup').removeClass('on');
      $('.album-soundtrack').removeClass('on');
      $('.album-youtube-iframe').empty(); // iframe 삭제
    }
  });

  var loopText = new Swiper('.loop-text', {
    slidesPerView: 'auto',
    spaceBetween: 50,
    speed: 3000,
    autoplay: {
      delay: 1,
      desableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 'auto',
    freemode: true,
  });
});

function openPopup(param) {
  // 클릭한 요소에서 data-album 값을 가져옴
  var albumThum = $(event.currentTarget).find('img').attr('src');
  var albumName = $(event.currentTarget).find('dt').text();
  var albumCategory = $(event.currentTarget).find('dd').eq(0).text();
  var albumDate = $(event.currentTarget).find('dd').eq(1).text();
  var albumURL = $(event.currentTarget).find('div').data('album');

  // 앨범 썸네일 업데이트
  $('.album-thum img').attr('src', albumThum);

  // 앨범 정보 업데이트
  $('.album-info dt').text(albumName);
  $('.album-info dd').eq(0).text(albumCategory);
  $('.album-info dd').eq(1).text(albumDate);

  // 팝업 열기
  $('.album__popup').addClass('on');
  $('.album-soundtrack').addClass('on');

  //유튜브 append
  var iframeHTML = `<iframe src="https://www.youtube.com/embed/${albumURL}?autoplay=1&mute=0&controls=0&playlist=${albumURL}&loop=true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  `;

  $('.album-youtube-iframe').html(iframeHTML);
}
