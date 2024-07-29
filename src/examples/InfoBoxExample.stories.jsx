import InfoBox from '../components/InfoBox';

export const InfoBoxExample = ({ text, width, height }) => {
  return (
    <InfoBox width={width} height={height}>
      {text}
    </InfoBox>
  );
};

export default {
  title: 'InfoBoxExample',
  component: InfoBoxExample,
};

export const Default = {
  args: {
    text: 'Your viewing experience may not be optimal without an internet connection.',
    width: 447,
    height: 117,
  },
};
