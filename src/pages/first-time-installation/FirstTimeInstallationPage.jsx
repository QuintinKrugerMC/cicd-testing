import { View } from '@lightningtv/solid';
import Stepper from '../../components/Stepper';
import {
  getNextInstallationStepSignal,
  getShowLogoSignal,
} from './global.first-time-installation';

const LogoStyle = {
  x: 60,
  y: 40,
  width: 97,
  height: 60,
};

const FirstTimeInstallationpage = (props) => {
  return (
    <View src={'/assets/background.png'}>
      <Show when={getShowLogoSignal()}>
        <View src='/assets/dstv-white-logo.png' style={LogoStyle} />
      </Show>
      <Show when={getNextInstallationStepSignal()}>
        <Stepper
          x={212}
          y={46}
          width={1648}
          currentStep={getNextInstallationStepSignal()}
          steps={[
            'Language',
            'Country',
            'Internet Connection',
            'Download quality',
            'Audio',
            'Installation setup',
            'Satelite overview',
          ]}
        />
      </Show>
      {props.children}
    </View>
  );
};

export default FirstTimeInstallationpage;
