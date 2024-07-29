import { Text, View } from '@lightningtv/solid';

const ImageStyle = {
  width: 44,
  height: 44,
  marginRight: 24,
  src: 'assets/icons/checkmarks/green-checkmark-icon.png',
  focus: { src: 'assets/icons/checkmarks/white-checkmark-icon.png' },
};

const ItemTitleStyle = {
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 44,
  marginLeft: 24,
};

const DecoderButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'spaceBetween',
};

/**
 * Displays an option button for the decoder list and places a checkmark on the selected decoder
 * @param {object} props defines the decoder text as well as the boolean value of when the tick must be shown
 * - props.text is a string value that describes the decoder number
 * - props.showTick is a boolean value that indicates the selected decoder
 * @returns the DecoderDisplay component
 */

const DecoderDisplay = (props) => {
  return (
    <View forwardStates style={DecoderButtonStyle}>
      <Text style={ItemTitleStyle}>{props.text}</Text>

      <Show when={props.showTick}>
        {/* Autofocus "hack" until fix from Chris */}
        <View autofocus style={ImageStyle} />
      </Show>
    </View>
  );
};

export default DecoderDisplay;
