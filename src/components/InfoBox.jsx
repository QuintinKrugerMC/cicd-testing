import { View, Text } from '@lightningtv/solid';
import styles from '../styles';

const InfoBoxContainerStyle = {
  borderRadius: 16,
  border: {
    width: 4,
    color: '#0095DA',
  },
  gap: 16,
  ...styles.RowContainerStyle,
};

const TextStyle = {
  fontSize: 20,
  fontWeight: 500,
  marginRight: 24,
  contain: 'width',
};

const InfoIconStyle = {
  src: '/assets/icons/info-icon.png',
  width: 32,
  height: 32,
  marginLeft: 24,
};

const LineStyle = {
  color: '#00508F',
  width: 4,
  height: 17,
};

/**
 * An information bubble that contains the provided text, bordered by a blue border
 * @param {object} props to be applied to the InfoBox element.
 * @returns
 */
const InfoBox = (props) => {
  return (
    <View
      {...props}
      style={styles.CenteredColumnContainerStyle}
      justifyContent='flexStart'
    >
      <View style={InfoBoxContainerStyle}>
        <View style={InfoIconStyle} />
        <Text
          style={TextStyle}
          width={
            props.width -
            InfoIconStyle.width -
            InfoBoxContainerStyle.gap -
            TextStyle.marginRight -
            InfoIconStyle.marginLeft
          }
        >
          {props.children}
        </Text>
      </View>
      <View style={LineStyle} />
    </View>
  );
};

export default InfoBox;
