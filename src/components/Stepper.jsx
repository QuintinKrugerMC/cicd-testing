import { View } from '@lightningtv/solid';
import { Text } from '@lightningtv/solid';
import styles from '../styles';

const TextContainerStyle = {
  justifyContent: 'spaceBetween',
  height: 20,
};
const FirstTextItemStyle = {
  lineHeight: 20,
  fontSize: 20,
  fontWeight: 400,
  color: '#f1f1f199',
};

const SecondTextItemStyle = {
  lineHeight: 20,
  fontSize: 20,
  fontWeight: 700,
  marginLeft: 4,
  color: '#f1f1f1ff',
};

const LoaderContainerStyle = {
  height: 20,
  color: '#0095DA33',
  borderRadius: 10,
  gap: 0,
  flexBoundary: 'fixed',
};

const LoaderStopStyle = {
  width: 10,
  height: 30,
  color: '#F1F1F1FF',
  borderRadius: 5,
  y: LoaderContainerStyle.height / 2,
  mount: 0.5,
  transition: {
    x: { duration: 300, easing: 'ease-in' },
  },
};

const LoaderProgressStyle = {
  colorLeft: '#00508F',
  colorRight: '#0095DA',
  borderRadius: 10,
  transition: {
    width: { duration: 300, easing: 'ease-in' },
  },
};

/**
 * A stepper to show the current and next step from a list of available steps
 * @param {object} props used to define a stepper with custom steps
 * - props.currentStep defines the current step of the stepper (an inital value)
 * - props.steps is an array of strings, each item being a step that can be stepped through
 * - props.width is the width of the stepper and is a mandatory property
 * @returns
 */
const Stepper = (props) => {
  const getLoaderWidth = () => {
    return (props.width / props.steps.length) * props.currentStep;
  };

  const atEnd = () => {
    return props.currentStep >= props.steps.length;
  };

  return (
    <View
      style={styles.ColumnContainerStyle}
      {...props}
      gap={8}
      height={props.height || 48}
      flexBoundary='fixed'
    >
      <View style={[TextContainerStyle, styles.RowContainerStyle]}>
        <View style={styles.RowContainerStyle}>
          <Text style={FirstTextItemStyle}>
            {props.currentStep}/{props.steps.length}:
          </Text>
          <Text style={SecondTextItemStyle}>
            {props.steps[props.currentStep - 1]}
          </Text>
        </View>
        <View style={styles.RowContainerStyle}>
          <Text style={FirstTextItemStyle}>Next:</Text>
          <Text style={SecondTextItemStyle}>
            {atEnd() ? 'Done' : props.steps[props.currentStep]}
          </Text>
        </View>
      </View>
      <View style={LoaderContainerStyle}>
        <View width={getLoaderWidth()} style={LoaderProgressStyle} />
        <View
          x={getLoaderWidth() - 5} // place ontop of right side radius effect
          style={LoaderStopStyle}
          alpha={atEnd() ? 0 : 1} // no stopper when the last step was reached
        />
      </View>
    </View>
  );
};

export default Stepper;
