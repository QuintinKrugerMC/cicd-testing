import ProgressBar from '../components/ProgressBar';

const ProgressBarExample = ({ width, signal }) => {
  return <ProgressBar width={width} signal={signal} />;
};

export default {
  title: 'ProgressBar',
  component: ProgressBarExample,
};

export const Default = {
  args: {
    width: 100,
    signal: 0.8,
  },
};
