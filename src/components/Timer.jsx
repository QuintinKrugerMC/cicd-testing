import { Text, View } from '@lightningtv/solid';
import { onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

/**
 * Converts a single digit into a string of 2 digits where the passed in digit is prefixed with '0'
 * alternatively, if the digits passed in are already 2 digits, it returns those digits
 * @param {number} digits is the number of seconds to be converted
 * @returns a 2 digit string
 */
const digitToString = (digits) => {
  if (digits <= 9) {
    return `0${digits}`;
  }
  return digits;
};

/**
 * Returns a formatted string in the format mm:ss for the provided seconds
 * @param {number} secs is the number of seconds to be converted
 * @returns a string formatted as mm:ss
 */
const secondsToMMSS = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);

  return `${digitToString(minutes)}:${digitToString(seconds)}`;
};

const TextStyle = {
  fontWeight: 600,
  fontSize: 48,
  lineHeight: 63,
};

const TimerRingStyle = {
  transition: {
    alpha: { duration: 500, easing: 'ease-in' },
  },
};

/**
 * A component to visualize time passing. With each iteration from 100% of the time provided until 0% of the time,
 * the timer changes its representation in increments of 25%
 * @param {object} props properties to be applied to the component. The only mandatory properties follow:
 * - props.time - is the time in seconds for which the timer must run
 * - props.timeoutFunction - is the function to execute when the timer has ran out
 * - props.wingWidth - to specify the width of the ring in the radialProrgess element
 * @returns the timer component
 */
const Timer = (props) => {
  let timeChangeInterval, timer, timerAnimation;
  let seventyFivePercentColorSet = false;
  let fiftyPercentColorSet = false;
  let twentyFivePercentColorSet = false;
  const [store, setStore] = createStore({
    time: secondsToMMSS(props.time),
    radialProgressColor: ['#00508FD9', '#00508FF2', '#0095DAFF'],
    radialProgressPercentage: 1,
    radialProgressAlpha: 1,
  });

  const setColor = (percentageTimeLeft) => {
    if (percentageTimeLeft <= 0.75 && !seventyFivePercentColorSet) {
      setStore('radialProgressColor', ['#20661BD9', '#20661BF2', '#4BB543']);
      seventyFivePercentColorSet = true;
    } else if (percentageTimeLeft <= 0.5 && !fiftyPercentColorSet) {
      setStore('radialProgressColor', ['#FB7616', '#95460D']);
      fiftyPercentColorSet = true;
    } else if (percentageTimeLeft <= 0.25 && !twentyFivePercentColorSet) {
      setStore('radialProgressColor', ['#C70000', '#610000']);
      twentyFivePercentColorSet = true;
    }
  };

  onMount(() => {
    let time = props.time;

    // allow for gradual change in radial progress changes
    timerAnimation = timer.animate(
      {
        shaderProps: {
          radialProg: {
            progress: 0.01, // 0 degress == 360 degrees, prevent filling of prgress at end of animation
          },
        },
      },
      {
        duration: Math.floor(props.time * 1000),
        easing: 'linear',
      },
    );
    timerAnimation.start();

    // change the time every second
    timeChangeInterval = setInterval(() => {
      if (time > 0) {
        time = time - 1;
        const percentageTimeLeft = time / props.time;
        setColor(percentageTimeLeft);
        setStore('time', secondsToMMSS(time));
        setStore(
          'radialProgressPercentage',
          Math.max(percentageTimeLeft, 0.01), // max needed as mathematically 0 degress == 360 degrees
        );
      } else {
        setStore('radialProgressAlpha', 0);
        props.timeoutFunction();
        clearInterval(timeChangeInterval);
      }
    }, 1000);
  });

  onCleanup(() => {
    timerAnimation.stop();
    clearInterval(timeChangeInterval);
  });

  return (
    <View {...props} width={234} height={234} src='/assets/timer/holder.png'>
      <View
        height={234}
        width={234}
        shader={[
          'DynamicShader',
          {
            effects: [
              {
                type: 'radialProgress',
                props: {
                  width: props.ringWidth,
                  progress: store.radialProgressPercentage,
                  rounded: true,
                },
                name: 'radialProg',
              },
              {
                type: 'linearGradient',
                props: {
                  colors: store.radialProgressColor,
                },
                name: 'linGrad',
              },
            ],
          },
        ]}
        style={TimerRingStyle}
        alpha={store.radialProgressAlpha}
        ref={timer}
      />
      <Text style={TextStyle} x={117} y={117} mount={0.5}>
        {store.time}
      </Text>
    </View>
  );
};

export default Timer;
