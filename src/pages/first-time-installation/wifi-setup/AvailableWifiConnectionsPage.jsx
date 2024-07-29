import { View } from '@lightningtv/solid';
import styles from '../../../styles';
import Selector from '../../../components/selector/Selector';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import WifiOption from '../../../components/selector/option/WifiOption';
import {
  getAvailableConnectionsSignal,
  setWifiSelectedSignal,
  getWifiSelectedSignal,
} from './global-wifi-setup';
import { createEffect, on } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const AvailableWifiConnectionsPage = (props) => {
  const navigate = useNavigate();

  // after wifi selected, navigate to password capture screen
  createEffect(
    on(
      getWifiSelectedSignal,
      () => {
        navigate('/first-time-installation/wifi-setup/password-capture');
      },
      { defer: true }, // prevent running when getSelectedWifiSignal is undefined when initialized
    ),
  );

  return (
    <View style={styles.CenteredRowContainerStyle}>
      <TitleAndSubtext
        title='Available networks'
        subtext='Please select your preferred Wi-Fi connection.'
      />
      <Selector
        width={435}
        height={248}
        autofocus
        viewableOptions={getAvailableConnectionsSignal().length}
      >
        <For each={getAvailableConnectionsSignal()}>
          {(wifi) => (
            <WifiOption
              value={{ ssid: wifi.ssid, quality: wifi.quality }}
              ssid={wifi.ssid}
              locked={wifi.locked}
              quality={wifi.quality}
              setSelectedOption={setWifiSelectedSignal}
            />
          )}
        </For>
      </Selector>
    </View>
  );
};

export default AvailableWifiConnectionsPage;
