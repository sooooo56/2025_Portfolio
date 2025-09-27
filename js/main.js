// AOS Js (스크롤 감지)
  AOS.init({
    duration: 1000, // 애니메이션 시간 (ms)
    once: false,
    easing: 'ease-out-cubic',
      // offset: 120       // 화면에서 몇 px 떨어졌을 때 시작할지
  });

// navi
const header = document.querySelector('header');

const handleScroll = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleScroll);

// main
console.clear();
const randomX = random(-400, 400);
const randomY = random(-200, 200);
const randomDelay = random(0, 50);
const randomTime = random(6, 12);
const randomTime2 = random(5, 6);
const randomAngle = random(-30, 150);

const blurs = gsap.utils.toArray(".blur");
blurs.forEach((blur) => {
  gsap.set(blur, {
    x: randomX(-1),
    y: randomX(1),
    rotation: randomAngle(-1)
  });

  moveX(blur, 1);
  moveY(blur, -1);
  rotate(blur, 1);
});

function rotate(target, direction) {
  gsap.to(target, randomTime2(), {
    rotation: randomAngle(direction),
    // delay: randomDelay(),
    ease: Sine.easeInOut,
    onComplete: rotate,
    onCompleteParams: [target, direction * -1]
  });
}

function moveX(target, direction) {
  gsap.to(target, randomTime(), {
    x: randomX(direction),
    ease: Sine.easeInOut,
    onComplete: moveX,
    onCompleteParams: [target, direction * -1]
  });
}

function moveY(target, direction) {
  gsap.to(target, randomTime(), {
    y: randomY(direction),
    ease: Sine.easeInOut,
    onComplete: moveY,
    onCompleteParams: [target, direction * -1]
  });
}

function random(min, max) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}


// ... (생략)
function random(min, max) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}


// work-bg-text 스크롤 따라다니기
gsap.registerPlugin(ScrollTrigger);

const workText = document.querySelector(".work-bg-text");
const workSection = document.querySelector("#work");

const workHeight = workSection.offsetHeight; 

// 애니메이션 시작/끝 지점 (y 이동값)
// 텍스트를 위에서 아래로 work 영역 전체를 관통하도록 이동시킵니다.
// -200 또는 -300: 텍스트가 위에서 완전히 보이지 않게 시작하는 값 (CSS의 top: -30%와 연계)
// workHeight + 300: 텍스트가 아래로 완전히 사라질 때까지 이동하는 값

const startY = -200; // 시작 위치 (work 영역 상단 밖)
const endY = workHeight + 300; // 종료 위치 (work 영역 하단 밖)

gsap.fromTo(workText,
  { 
    y: startY,   // 시작 위치: work 영역 위에서 완전히 안 보이게
  },
  { 
    y: endY,     // 끝 위치: work 영역 아래로 완전히 사라질 때까지 이동
    ease: "none",
    scrollTrigger: {
      trigger: "#work",
      start: "top bottom",    // #work 영역이 화면 하단에 닿을 때 (등장 시작)
      end: "bottom top",      // #work 끝이 화면 상단에 닿을 때 (퇴장 끝)
      scrub: true,            // 스크롤과 1:1 매칭
      // markers: true,        // 디버깅용
    
    }
  }
);


