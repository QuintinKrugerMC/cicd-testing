import { onMount } from 'solid-js';
import Timer from '../../../components/Timer';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import styles from '../../../styles';
import { Text, View } from '@lightningtv/solid';
import { useNavigate } from '@solidjs/router';
import { connectToRouter } from '../../../api/networkApi.js';

const WpsPage = () => {
  const navigate = useNavigate();

  onMount(() => {
    connectToRouter()
      .then(() => {
        // TODO: replace this with the updated network pages still to be merged to main - currently open as PR
        navigate('/first-time-installation/connection-successful');
      })
      .catch(() => {
        navigate('/first-time-installation/wifi-setup/wps-failure');
      });
  });

  return (
    <View>
      <View
        style={styles.ColumnContainerStyle}
        gap={48}
        width={834}
        height={210}
        y={435}
        x={212}
      >
        <TitleAndSubtext
          title='Wi-Fi connection'
          subtext='Searching for available Wi-Fi networks.'
          height={130}
        />
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <View src='/assets/icons/info-icon.png' width={32} height={32} />
          <Text style={styles.SubtextStyle}>
            Please walk over to your router to press the WPS button on the
            router.
          </Text>
        </View>
      </View>
      <Timer time={120} x={1450} y={423} ringWidth={15} />
    </View>
  );
};

export default WpsPage;
