import Timer from '../components/Timer';

export const TimerExample = ({ time, timeoutFunction, ringWidth }) => {
  return (
    <Timer
      time={time}
      timeoutFunction={timeoutFunction}
      ringWidth={ringWidth}
    />
  );
};

export default {
  title: 'Timer',
  component: TimerExample,
};

export const Default = {
  args: {
    time: 60,
    ringWidth: 18,
    timeoutFunction: () => {
      console.log('Time ran out');
    },
  },
};
