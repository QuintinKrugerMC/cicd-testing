import { Text, View } from '@lightningtv/solid';
import styles from '../styles';

const ButtonStyle = {
  colorLeft: '#0095DA26',
  colorRight: '#0095DA26',
  borderRadius: 16,
  focus: {
    colorLeft: '#00508FD9',
    colorRight: '#0095DA',
  },
  // The official figma has an angle of 17, but simpler to do colors instead
  // linearGradient: {
  //   colors: ['#0095DA', '#00508FD9'],
  //   angle: deg2Rad(17),
  // },
  ...styles.CenteredRowContainerStyle,
};

/**
 *
 * @param {object} props allowing custom options to be defined used for the Button component
 * - props.text is a string value to pass to the Text child element of the Button
 * @returns the Button component
 */
const Button = (props) => {
  return (
    <View {...props} style={ButtonStyle}>
      <Text fontSize={28 || props.fontSize}>{props.text}</Text>
    </View>
  );
};

export default Button;
