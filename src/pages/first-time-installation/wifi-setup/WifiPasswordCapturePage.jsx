import { View } from '@lightningtv/solid';
import styles from '../../../styles';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import { Column } from '@lightningtv/solid-ui';
import WifiDisplay from '../../../components/WifiDisplay';
import PasswordInput from '../../../components/inputs/PasswordInput';
import {
  getWifiSelectedSignal,
  setWifiPasswordSignal,
} from './global-wifi-setup';
import { createSignal } from 'solid-js';
import Keyboard from '../../../components/keyboard/Keyboard';
import { useNavigate } from '@solidjs/router';

const WifiPasswordCapturePage = () => {
  const navigate = useNavigate();
  const [getPasswordSignal, setPasswordSignal] = createSignal();
  const [getCursorPositionSignal, setCursorPositionSignal] = createSignal();

  return (
    <View style={styles.CenteredRowContainerStyle}>
      <TitleAndSubtext
        title='Enter password'
        subtext='Enter the password to connect your WiFi.'
        width={738}
      />
      <Column
        gap={24}
        width={668}
        height={607}
        scroll='none'
        alignItems={'center'}
        autofocus
      >
        <View display='flex' flexDirection='column' gap={24} forwardFocus={1}>
          <WifiDisplay
            ssid={getWifiSelectedSignal().ssid.toUpperCase()}
            quality={getWifiSelectedSignal().quality}
          />
          <PasswordInput
            password={getPasswordSignal()}
            width={668}
            cursorPosition={getCursorPositionSignal()}
          />
        </View>

        <Keyboard
          text={getPasswordSignal()}
          setText={setPasswordSignal}
          setCursorFunction={setCursorPositionSignal}
          cursorPosition={getCursorPositionSignal()}
          okFunction={(finalText) => {
            setWifiPasswordSignal(finalText); // perhaps there is a secret store we can use to do this
            navigate('/first-time-installation/wifi-setup/connect');
          }}
        />
      </Column>
    </View>
  );
};

export default WifiPasswordCapturePage;
