import { View, Text } from '@lightningtv/solid';
import styles from '../styles';
const TextStyle = {
  fontSize: 28,
  lineHeight: 44,
  fontWeight: 600,
};

const WifiDisplayContainerStyle = {
  gap: 24,
  color: 0x0095dab3,
  borderRadius: 8,
  height: 43,
  ...styles.RowContainerStyle,
};

const WifiDisplay = (props) => {
  return (
    <View {...props} style={WifiDisplayContainerStyle}>
      <Text marginLeft={16} style={TextStyle}>
        {props.ssid}
      </Text>
      <View style={styles.RowContainerStyle}>
        <Show when={props.locked}>
          <View src='/assets/lock-icon.png' height={30} width={30} />
        </Show>
        <View
          src={`/assets/icons/wifi/${props.quality}-signal-wifi-icon.png`}
          height={32}
          width={32}
          marginRight={16}
        />
      </View>
    </View>
  );
};

export default WifiDisplay;
