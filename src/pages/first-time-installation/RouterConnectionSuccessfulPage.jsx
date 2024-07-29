import { View, Text } from '@lightningtv/solid';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import { Show } from '@lightningtv/solid';
import Button from '../../components/Button';
import styles from '../../styles';
import { Row } from '@lightningtv/solid-ui';
import { useNavigate } from '@solidjs/router';
import {
  establishInternetConnection,
  getDownloadSpeedBits,
} from '../../api/networkApi';
import { createSignal } from 'solid-js';
import NetworkSummaryTable from '../../components/NetworkSummaryTable';
import { getWifiSelectedSignal } from './wifi-setup/global-wifi-setup';
import WifiDisplay from '../../components/WifiDisplay';
import { createEffect, onMount } from 'solid-js';

const SlowSpeedTextStyle = {
  fontSize: 24,
  fontWeight: 500,
  lineHeight: 31,
};

const ButtonsContainerStyle = {
  height: 76,
  gap: 16,
  justifyContent: 'center',
};

const TitleAndSubtitleContainerStyle = {
  width: 890,
  height: 142,
  gap: 16,
  ...styles.CenteredColumnContainerStyle,
};

const RouterConnectionSuccessfulPage = () => {
  let buttons;
  const [getHasInternetConnection, setHasInternetConnection] = createSignal();
  const [getDownloadSpeedSignal, setDownloadSpeedSignal] = createSignal();

  onMount(() => {
    // only when download speed can be confirmed is the user allowed to traverse the buttons
    createEffect(() => {
      if (getDownloadSpeedSignal()) {
        buttons.setFocus();
      }
    });
  });

  const navigate = useNavigate();

  onMount(() => {
    establishInternetConnection()
      .then((internetConnection) => {
        setHasInternetConnection(internetConnection);
        getDownloadSpeedBits().then((speed) => {
          setDownloadSpeedSignal(speed);
        });
      })
      .catch((err) => {
        console.log(err);
        navigate('/first-time-installation/internet-connection-failed');
      });
  });

  return (
    <View style={styles.CenteredColumnContainerStyle} gap={80}>
      <View style={TitleAndSubtitleContainerStyle}>
        <Text style={styles.TitleStyle}>Connection successful</Text>
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <Text style={styles.SubtextStyle}>Your device is now connected</Text>
          <Show when={getWifiSelectedSignal()}>
            <WifiDisplay
              ssid={getWifiSelectedSignal().ssid.toUpperCase()}
              quality={getWifiSelectedSignal().quality}
            />
          </Show>
        </View>
      </View>
      <View style={styles.CenteredColumnContainerStyle} gap={32} height={340}>
        <NetworkSummaryTable
          internetConnection={getHasInternetConnection()}
          downloadSpeed={getDownloadSpeedSignal()}
          routerConnection={true}
        />
        <Show when={getDownloadSpeedSignal() / 1000 <= 64}>
          <View style={styles.RowContainerStyle} height={32} gap={24}>
            <View src='/assets/icons/info-icon.png' width={32} height={32} />
            <Text style={SlowSpeedTextStyle}>
              Slow download speed. Your viewing experience may not be optimal.
            </Text>
          </View>
        </Show>
      </View>

      <Row style={ButtonsContainerStyle} selected={1} ref={buttons}>
        <Button
          text={'Switch network'}
          width={256}
          onEnter={() => {
            navigate('/first-time-installation/network-select');
          }}
        />
        <Button
          text={'Continue'}
          width={256}
          onEnter={() => {
            navigate('/first-time-installation/download-select');
          }}
        />
      </Row>
    </View>
  );
};

export default RouterConnectionSuccessfulPage;
