import { Text, View } from '@lightningtv/solid';
import styles from '../../styles';
import NetworkRecoveryButtons from '../../components/NetworkRecoveryButtons';
import { useNavigate } from '@solidjs/router';
import NetworkSummaryTable from '../../components/NetworkSummaryTable';

const InternetConnectionFailedPage = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.CenteredColumnContainerStyle} gap={80}>
      <View style={styles.CenteredColumnContainerStyle} gap={16} height={130}>
        <Text style={styles.TitleStyle}>Connection unsuccessful</Text>
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <View src='/assets/icons/info-icon.png' width={32} height={32} />
          <Text style={styles.SubtextStyle}>
            Your device was not able to connect to the internet.
          </Text>
        </View>
      </View>

      <NetworkSummaryTable internetConnection={false} routerConnection={true} />

      <NetworkRecoveryButtons
        autofocus
        skip={() => {
          navigate('/first-time-installation/audio-select');
        }}
        tryAgain={() => {
          navigate('/first-time-installation/connection-successful');
        }}
      />
    </View>
  );
};

export default InternetConnectionFailedPage;
