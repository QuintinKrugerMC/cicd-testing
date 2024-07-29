import { onMount } from 'solid-js';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from '../global.first-time-installation';

const WifiSetupPage = (props) => {
  onMount(() => {
    setNextInstallationStepSignal(3);
    setShowLogoSignal(true);
  });
  return props.children;
};

export default WifiSetupPage;
