import { View } from '@lightningtv/solid';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from './global.first-time-installation';

import { onMount } from 'solid-js';
import Selector from '../../components/selector/Selector';
import TextOption from '../../components/selector/option/TextOption';
import { useNavigate } from '@solidjs/router';
import { createSignal, createEffect, on } from 'solid-js';

const InstallationSetupPage = () => {
  onMount(() => {
    setNextInstallationStepSignal(6);
    setShowLogoSignal(true);
  });

  const navigate = useNavigate();
  const [getSelectedOption, setSelectedOption] = createSignal();

  createEffect(
    on(
      getSelectedOption,
      (selectedOption) => {
        switch (selectedOption) {
          case 'quick':
            navigate('/first-time-installation/installation-setup/quick-setup');
            break;
          case 'manual':
            break;
        }
      },
      { defer: true },
    ),
  );

  return (
    <View>
      <TitleAndSubtext
        x={212}
        y={475}
        width={890}
        height={130}
        title={'Select installation method'}
        subtext={'How would you like to set up your decoder?'}
      />
      <Selector width={435} height={160} x={1273} y={460} autofocus>
        <TextOption setSelectedOption={setSelectedOption} value={'quick'}>
          Quick setup
        </TextOption>
        <TextOption setSelectedOption={setSelectedOption} value={'manual'}>
          Manual setup
        </TextOption>
      </Selector>
    </View>
  );
};

export default InstallationSetupPage;
