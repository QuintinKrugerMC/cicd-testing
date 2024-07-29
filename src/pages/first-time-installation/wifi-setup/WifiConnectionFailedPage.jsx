import { View, Text } from '@lightningtv/solid';
import styles from '../../../styles';
import WifiDisplay from '../../../components/WifiDisplay';
import { getWifiSelectedSignal } from './global-wifi-setup';
import Selector from '../../../components/selector/Selector';
import TextOption from '../../../components/selector/option/TextOption';
import { createSignal, createEffect, on } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const WifiConnectionFailedPage = () => {
  const navigate = useNavigate();

  const [getSelectedOptionSignal, setSelectedOptionSignal] = createSignal();

  createEffect(
    on(getSelectedOptionSignal, (selectedOption) => {
      switch (selectedOption) {
        case 're-enter-password':
          navigate('/first-time-installation/wifi-setup/password-capture');
          break;
        case 'switch-network':
          navigate('/first-time-installation/network-select');
          break;
        default:
          break;
      }
    }),
  );

  return (
    <View style={styles.CenteredRowContainerStyle}>
      <View
        style={styles.ColumnContainerStyle}
        gap={16}
        height={142}
        width={890}
      >
        <Text style={styles.TitleStyle}>Connection unsuccessful</Text>
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <Text style={styles.SubtextStyle}>Unable to connect to</Text>
          <WifiDisplay
            ssid={getWifiSelectedSignal().ssid.toUpperCase()}
            quality={getWifiSelectedSignal().quality}
          />
        </View>
      </View>
      <Selector width={435} height={160} autofocus>
        <TextOption
          setSelectedOption={setSelectedOptionSignal}
          value={'re-enter-password'}
        >
          Re-enter password
        </TextOption>
        <TextOption
          setSelectedOption={setSelectedOptionSignal}
          value={'switch-network'}
        >
          Switch network
        </TextOption>
      </Selector>
    </View>
  );
};

export default WifiConnectionFailedPage;
