import { onCleanup, onMount } from 'solid-js';
import { View } from '@lightningtv/solid';

const ringAnimationDelay = 500;
/**
 * Contains a number of rings that animate in and out starting from the center working its way to the outer most ring with 500 ms delay between animations
 * @param {object} props to pass into Rings component for placement, color etc. - any property that applied to a component can be applied to the Rings component
 * @returns the Rings component
 */
const Rings = (props) => {
  let rings;
  let repeatAnimationInterval;

  const animateRings = (ringCount) => {
    rings.children.forEach((ring, index) => {
      // animate in
      ring
        .animate(
          { alpha: 1 },
          {
            duration: 300,
            easing: 'ease-in-out',
            delay: ringAnimationDelay * index,
          },
        )
        .start();

      // animate out
      ring
        .animate(
          { alpha: 0 },
          {
            duration: 300,
            easing: 'ease-in-out',
            delay: ringAnimationDelay * (ringCount * 2 - index), // reverse the order in which rings are shown
          },
        )
        .start();
    });
  };

  onCleanup(() => {
    clearInterval(repeatAnimationInterval);
  });

  onMount(() => {
    const ringCount = rings.children.length;
    animateRings(ringCount); // initial animation

    // repeated animation
    repeatAnimationInterval = setInterval(
      () => {
        animateRings(ringCount);
      },
      ringCount * 2 * ringAnimationDelay + ringAnimationDelay,
    );
  });

  return (
    <View {...props} width={1045} height={1045}>
      <View ref={rings}>
        <View
          src='/assets/animations/rings/ring-1.png'
          alpha={0}
          width={192}
          height={192}
          mount={0.5}
          x={522}
          y={522}
        />
        <View
          src='/assets/animations/rings/ring-2.png'
          alpha={0}
          width={360}
          height={360}
          mount={0.5}
          x={522}
          y={522}
        />
        <View
          src='/assets/animations/rings/ring-3.png'
          alpha={0}
          width={531}
          height={530}
          mount={0.5}
          x={522}
          y={522}
        />
        <View
          src='/assets/animations/rings/ring-4.png'
          alpha={0}
          width={702}
          height={702}
          mount={0.5}
          x={522}
          y={522}
        />
        <View
          src='/assets/animations/rings/ring-5.png'
          alpha={0}
          width={874}
          height={874}
          mount={0.5}
          x={522}
          y={522}
        />
        <View
          src='/assets/animations/rings/ring-6.png'
          alpha={0}
          width={1045}
          height={1045}
          mount={0.5}
          x={522}
          y={522}
        />
      </View>
    </View>
  );
};

export default Rings;
