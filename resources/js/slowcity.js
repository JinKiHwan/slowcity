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

/* gsap.to('.art-wrap .art1', {
  delay: 0.5,
  clipPath: 'polygon(50% 50%, 100% 0, 0% 100%)',
  duration: 0.3,

  onComplete: function () {
    gsap.to('.art-wrap .art2', {
      clipPath: 'polygon(100% 100%, 100% 0, 0% 100%)',
    });
  },
});
 */
// JSON 데이터
var jsonData = [
  { name: 'kim', age: 10 },
  { name: 'reas', age: 112 },
  { name: 'qwr', age: 10 },
];

// ul 요소 선택
var ulElement = document.getElementById('prod');

// JSON 데이터를 반복하여 li 태그 생성 및 추가
jsonData.forEach(function (item) {
  // li 태그를 생성하고 내용을 채웁니다.
  ulElement.innerHTML += `
    <li class="prod_li">
      <span class="name">${item.name}</span>
      <p class="age">${item.age}</p>
    </li>`;
});
