import { View, Text } from '@lightningtv/solid';
import styles from '../styles';

/**
 * Displays the progress of the signal as well as the percentage value
 * @param {object} props defines the percentage and size of the progress bar for the ProgressBar component
 * - props.signal is a floating point number used to set the width of the progress bar as well as the Text child element
 * @returns the ProgressBar component
 */

function ProgressBar(props) {
  const ProgressBarStyle = {
    width: props.signal * props.width,
    height: 8,
    borderRadius: 3,
    colorLeft: props.signal < 1 ? '#FB7616' : '#20661B',
    colorRight: props.signal < 1 ? '#95460D' : '#4BB543',
  };

  const SignalContainerStyle = {
    height: 26,
    width: 161,
    flexBoundary: 'fixed',
    gap: 12,
  };

  return (
    <View style={[SignalContainerStyle, styles.RowContainerStyle]}>
      <View style={ProgressBarStyle} />
      <Text fontSize={20} fontWeight={500}>
        {props.signal * 100 + '%'}
      </Text>
    </View>
  );
}

export default ProgressBar;
