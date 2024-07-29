import { View, hexColor } from '@lightningtv/solid';

const OptionContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  colorLeft: 0x0095da26,
  colorRight: 0x0095da26,
  borderRadius: 16,
  alignItems: 'center',
  focus: {
    colorLeft: '#00508F',
    colorRight: '#0095DA',
  },
};

/**
 * Wraps the visualization of an option (to be used with a Selector component) with the functionality when an option is selected from
 * a number of options
 * @param {object} props allowing custom options to be defined used in combination with the Selector component
 * - props.setSelectedOption: is a signal setter method called when the option is entered on
 * - props.value: is the value to pass to the setSelectedOption signal method
 * @returns object component
 */
const Option = (props) => {
  return (
    <View
      {...props}
      style={[props.style, OptionContainerStyle]}
      onEnter={() => {
        props.setSelectedOption(props.value);
      }}
      forwardStates
    >
      {props.children}
    </View>
  );
};

export default Option;
