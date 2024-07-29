import { onMount } from 'solid-js';
import { View } from '@lightningtv/solid';
const loaderAnimationSettings = {
  easing: 'linear',
  duration: 1000,
  loop: true,
  delay: 1,
};

const LoaderStyle = {
  width: 156,
  height: 156,
  rotation: 0,
};

const Loader = (props) => {
  let loader;

  onMount(() => {
    const loaderAnimation = loader.animate(
      { rotation: 6.28319 }, // radians for 360 degrees
      loaderAnimationSettings,
    );
    loaderAnimation.start();
  });

  return (
    <View
      {...props}
      ref={loader}
      src='/assets/loader.png'
      style={[props.style, LoaderStyle]}
    />
  );
};

export default Loader;
