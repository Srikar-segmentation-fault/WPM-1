/**
 * Card Swap Animation - Converted from React to Vanilla JS
 * Usage: initCardSwap(containerId, options)
 */

function initCardSwap(containerId, options = {}) {
  const {
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    skewAmount = 6,
    easing = 'elastic'
  } = options;

  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const cards = Array.from(container.querySelectorAll('.card'));
  const total = cards.length;

  if (total === 0) {
    console.error('No cards found in container');
    return;
  }

  let order = Array.from({ length: total }, (_, i) => i);
  let currentTimeline = null;
  let intervalId = null;

  // Helper function to create slot positions
  const makeSlot = (i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  });

  // Place card at slot position immediately
  const placeNow = (el, slot, skew) => {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });
  };

  // Initialize card positions
  cards.forEach((card, i) => {
    card.style.width = `${width}px`;
    card.style.height = `${height}px`;
    placeNow(card, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
  });

  // Swap animation function
  const swap = () => {
    if (order.length < 2) return;

    const [front, ...rest] = order;
    const elFront = cards[front];
    const tl = gsap.timeline();
    currentTimeline = tl;

    // Drop front card
    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    // Promote other cards
    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = cards[idx];
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    // Return dropped card to back
    const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    // Update order after animation
    tl.call(() => {
      order = [...rest, front];
    });
  };

  // Start animation
  swap();
  intervalId = setInterval(swap, delay);

  // Pause on hover functionality
  if (pauseOnHover) {
    const pause = () => {
      if (currentTimeline) currentTimeline.pause();
      clearInterval(intervalId);
    };
    const resume = () => {
      if (currentTimeline) currentTimeline.play();
      intervalId = setInterval(swap, delay);
    };
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
  }

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    if (currentTimeline) currentTimeline.kill();
  };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initCardSwap;
}