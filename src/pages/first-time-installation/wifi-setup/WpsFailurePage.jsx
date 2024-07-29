import { Text, View } from '@lightningtv/solid';
import styles from '../../../styles';
import NetworkRecoveryButtons from '../../../components/NetworkRecoveryButtons';
import { useNavigate } from '@solidjs/router';
const WpsFailurePage = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.CenteredColumnContainerStyle} gap={80}>
      <View style={styles.CenteredColumnContainerStyle} gap={16} height={131}>
        <Text style={styles.TitleStyle}>WPS Connection unsuccessful</Text>
        <View style={styles.RowContainerStyle} height={31} gap={24} width={677}>
          <View src='/assets/icons/info-icon.png' width={32} height={32} />
          <Text style={styles.SubtextStyle}>
            Your device was not able to connet to the internet.
          </Text>
        </View>
      </View>
      <NetworkRecoveryButtons
        autofocus
        skip={() => {
          navigate('/first-time-installation/audio-select');
        }}
        tryAgain={() => {
          navigate('/first-time-installation/wifi-setup/wps');
        }}
      />
    </View>
  );
};

export default WpsFailurePage;
