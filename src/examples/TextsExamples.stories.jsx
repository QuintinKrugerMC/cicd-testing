import { Column } from '@lightningtv/solid-ui';
import { Text } from '@lightningtv/solid';
import styles from '../styles';

// see for a reference of fonts https://fonts.google.com/specimen/Poppins?preview.text=Hello%20world!
export const Texts = () => {
  return (
    <Column style={styles.CenteredColumnContainerStyle}>
      <Text fontSize={30} fontWeight={400}>
        fontWeight 400 : Hello world !
      </Text>
      <Text fontSize={30} fontWeight={500}>
        fontWeight 500 : Hello world !
      </Text>
      <Text fontSize={30} fontWeight={600}>
        fontWeights 600 : Hello world !
      </Text>
      <Text fontSize={30} fontWeight={700}>
        fontWeight 700 : Hello world !
      </Text>
    </Column>
  );
};

export default {
  title: 'Texts',
  component: Texts,
};
