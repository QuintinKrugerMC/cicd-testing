import { Text, View } from '@lightningtv/solid';
import styles from '../../../styles';
import { useNavigate } from '@solidjs/router';
import NetworkRecoveryButtons from '../../../components/NetworkRecoveryButtons';

const EthernetSetupFailedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <View style={styles.CenteredColumnContainerStyle} gap={300}>
        <View style={styles.CenteredColumnContainerStyle} gap={16} height={131}>
          <Text style={styles.TitleStyle}>Connection unsuccessful</Text>
          <View style={styles.RowContainerStyle} height={32} gap={24}>
            <View src='/assets/icons/info-icon.png' width={32} height={32} />
            <Text style={styles.SubtextStyle}>
              Your device was not able to connect to the internet.
            </Text>
          </View>
        </View>
        <View style={styles.CenteredColumnContainerStyle} gap={80} height={183}>
          <Text style={styles.SubtextStyle}>
            Check your router and decoder to make sure the cables are connected.
          </Text>
          <NetworkRecoveryButtons
            autofocus
            skip={() => {
              navigate('/first-time-installation/audio-select');
            }}
            tryAgain={() => {
              navigate('/first-time-installation/ethernet-setup');
            }}
          />
        </View>
      </View>
      <View
        src='/assets/decoder/decoder-side.png'
        width={403}
        height={145}
        y={445}
        x={713}
      />
      <View
        src='/assets/network/cable-side.png'
        width={796}
        height={26}
        y={497}
        x={1125}
      />
    </>
  );
};

export default EthernetSetupFailedPage;
