// navi
const header = document.querySelector('header');

// Function to handle the scroll event
const handleScroll = () => {
    if (window.scrollY > 50) {
        // Add the 'scrolled' class when scrolled past 50px
        header.classList.add('scrolled');
    } else {
        // Remove the 'scrolled' class when at the top
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


// work bg text
gsap.registerPlugin(ScrollTrigger);

console.log('gsap', !!gsap, 'ScrollTrigger', !!ScrollTrigger); // 로드 확인용

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#work",
    start: "top bottom",   // #work의 top이 viewport bottom에 닿을 때 시작
    end: "bottom top",     // #work의 bottom이 viewport top에 닿을 때 끝
    scrub: true,
    markers: true          // 디버그용. 확인 후 false로 바꿔
  }
});

// 위에서 아래로 흘러가는 흐름: 등장 -> 중앙 -> 퇴장
tl.fromTo(".work-bg-text",
  { y: -150, opacity: 0 },
  { y: 0, opacity: 1, ease: "none" }
).to(".work-bg-text",
  { y: 150, opacity: 0, ease: "none" }
);