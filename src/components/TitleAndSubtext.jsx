import { Text, View } from '@lightningtv/solid';
import styles from '../styles';

const TextContainerStyle = {
  alignItems: 'flexStart',
  width: 890,
  gap: 16,
};

/**
 *
 * @param {object} props allowing custom options to be defined used in combination with the Selector component
 * - props.title is a string value for the title to be displayed
 * - props.subtext is a string to acompnay the title, left align and that will wrap if the text width exceeds the width 890
 * @returns the TitleAndSubtext component
 */
const TitleAndSubtext = (props) => {
  return (
    <>
      <View
        {...props}
        style={[TextContainerStyle, styles.CenteredColumnContainerStyle]}
      >
        <Text style={styles.TitleStyle}>{props.title}</Text>
        <Text style={styles.SubtextStyle}>{props.subtext}</Text>
      </View>
    </>
  );
};

export default TitleAndSubtext;
