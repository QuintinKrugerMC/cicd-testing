import Option from './Option';
import { Text } from '@lightningtv/solid';
import { children } from 'solid-js';

const OptionTextStyle = {
  fontWeight: 500,
  fontSize: 28,
  lineHeight: 44,
};

/**
 * Wraps text visualization of an option (to be used with a Selector component) with the functionality when an option is selected from
 * a number of options
 * @param {object} props allowing custom options to be defined used in combination with the Selector component
 * - props.setSelectedOption: is a signal setter method called when the option is entered on
 * - props.value: is the value to pass to the setSelectedOption signal method
 * @returns object component
 */
const TextOption = (props) => {
  return (
    <Option
      {...props}
      height={72}
      value={props.value}
      setSelectedOption={props.setSelectedOption}
    >
      <Text style={OptionTextStyle}>{props.children}</Text>
    </Option>
  );
};

export default TextOption;
