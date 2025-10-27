/**
 * Infinite Scroll Animation - Converted from React to Vanilla JS
 * Usage: initInfiniteScroll(containerId, options)
 */

function initInfiniteScroll(containerId, options = {}) {
  const {
    itemMinHeight = 150,
    negativeMargin = '-0.5em',
    isTilted = false,
    tiltDirection = 'left',
    autoplay = true,
    autoplaySpeed = 0.5,
    autoplayDirection = 'down',
    pauseOnHover = true
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const items = Array.from(container.children);
  if (items.length === 0) {
    console.error('No items found in container');
    return;
  }

  // Apply tilt transform
  const getTiltTransform = () => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  };

  container.style.transform = getTiltTransform();

  // Set up items
  const firstItem = items[0];
  const itemStyle = getComputedStyle(firstItem);
  const itemHeight = firstItem.offsetHeight;
  const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
  const totalItemHeight = itemHeight + itemMarginTop;
  const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

  const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

  // Position items initially
  items.forEach((child, i) => {
    const y = i * totalItemHeight;
    gsap.set(child, { y });
  });

  // Set up Observer for drag/scroll
  const observer = Observer.create({
    target: container,
    type: 'wheel,touch,pointer',
    preventDefault: true,
    onPress: ({ target }) => {
      target.style.cursor = 'grabbing';
    },
    onRelease: ({ target }) => {
      target.style.cursor = 'grab';
    },
    onChange: ({ deltaY, isDragging, event }) => {
      const d = event.type === 'wheel' ? -deltaY : deltaY;
      const distance = isDragging ? d * 5 : d * 10;
      items.forEach(child => {
        gsap.to(child, {
          duration: 0.5,
          ease: 'expo.out',
          y: `+=${distance}`,
          modifiers: {
            y: gsap.utils.unitize(wrapFn)
          }
        });
      });
    }
  });

  let rafId;
  let isPaused = false;

  // Autoplay functionality
  if (autoplay) {
    const directionFactor = autoplayDirection === 'down' ? 1 : -1;
    const speedPerFrame = autoplaySpeed * directionFactor;

    const tick = () => {
      if (!isPaused) {
        items.forEach(child => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Pause on hover
    if (pauseOnHover) {
      const stopTicker = () => {
        isPaused = true;
      };
      const startTicker = () => {
        isPaused = false;
      };

      container.addEventListener('mouseenter', stopTicker);
      container.addEventListener('mouseleave', startTicker);

      // Cleanup function
      return () => {
        observer.kill();
        if (rafId) cancelAnimationFrame(rafId);
        container.removeEventListener('mouseenter', stopTicker);
        container.removeEventListener('mouseleave', startTicker);
      };
    }
  }

  // Return cleanup function
  return () => {
    observer.kill();
    if (rafId) cancelAnimationFrame(rafId);
  };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = initInfiniteScroll;
}