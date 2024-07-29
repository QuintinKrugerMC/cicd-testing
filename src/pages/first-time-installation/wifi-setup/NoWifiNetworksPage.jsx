import { View, Text } from '@lightningtv/solid';
import styles from '../../../styles';
import { Row } from '@lightningtv/solid-ui';
import Button from '../../../components/Button';
import { useNavigate } from '@solidjs/router';

const NoWifiNetworksPage = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.CenteredColumnContainerStyle} gap={80}>
      <View style={styles.CenteredColumnContainerStyle} gap={16} height={161}>
        <Text style={styles.TitleStyle}>No networks found</Text>
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <View src='/assets/icons/info-icon.png' width={32} height={32} />
          <Text style={styles.SubtextStyle} width={890} contain='width'>
            Please check your network settings and try again or contact your
            Internet Service Provider (ISP) if the problem persists.
          </Text>
        </View>
      </View>
      <Row height={76} gap={16} justifyContent='center' selected={0} autofocus>
        <Button
          text={'Try again'}
          width={256}
          onEnter={() => {
            navigate('/first-time-installation/wifi-setup/search-connections');
          }}
        />
        <Button
          text={'Switch to ethernet'}
          fontSize={24}
          width={256}
          onEnter={() => {
            navigate('/first-time-installation/ethernet-setup');
          }}
        />
        <Button
          text={'Skip'}
          width={256}
          onEnter={() => {
            navigate('/first-time-installation/audio-select');
          }}
        />
      </Row>
    </View>
  );
};

export default NoWifiNetworksPage;
