import { View, Text } from '@lightningtv/solid';
import Option from '../../../components/selector/option/Option';

const TextStyle = {
  fontSize: 28,
  lineHeight: 44,
  fontWeight: 600,
  marginLeft: 28,
};

const WifiIconStyle = {
  height: 32,
  width: 32,
  marginRight: 28,
};

/**
 * A special kind of Option component whose visual content is text and icons based on wifi properties passed in via the props parameter.
 * @param {object} props allowing custom text options to be created
 * - props.setSelectedOption: is a signal setter method called when the option is entered on
 * - props.locked: boolean value used to determine whether the lock icon be shown or not
 * - props.ssid: is the SSID of the wifi option to display as text
 * - props.quality: can be 'medium', 'bad' or 'good' used to select the correct wifi signal icon
 * @returns the TextOption component
 */
const WifiOption = (props) => {
  return (
    <>
      <Option
        {...props}
        height={72}
        value={props.value}
        setSelectedOption={props.setSelectedOption}
      >
        <View
          display='flex'
          flexDirection='row'
          justifyContent='spaceBetween'
          alignItems='center'
        >
          <Text style={TextStyle}>{props.ssid}</Text>
          <View display='flex' flexDirection='row' alignItems='center'>
            <Show when={props.locked}>
              <View src='/assets/icons/lock-icon.png' height={30} width={30} />
            </Show>
            <View
              src={`/assets/icons/wifi/${props.quality}-signal-wifi-icon.png`}
              style={WifiIconStyle}
            />
          </View>
        </View>
      </Option>
    </>
  );
};

export default WifiOption;
