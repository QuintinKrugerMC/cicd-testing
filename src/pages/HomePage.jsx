import { View } from '@lightningtv/solid';
import styles from '../styles';
import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const HomePage = () => {
  const navigate = useNavigate();

  onMount(() => {
    setTimeout(() => {
      navigate('/first-time-installation/onboarding');
    }, 5000);
  });

  return (
    <View
      style={styles.CenteredColumnContainerStyle}
      src={'/assets/background.png'}
    >
      <View style={styles.LogoStyle} src='/assets/dstv-ultra-logo.png' />
    </View>
  );
};

export default HomePage;
