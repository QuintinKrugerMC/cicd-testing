import { View } from '@lightningtv/solid';
import Selector from '../../components/selector/Selector';
import { createEffect, createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from './global.first-time-installation';
import TextOption from '../../components/selector/option/TextOption';
import TitleAndSubtext from '../../components/TitleAndSubtext';

const SelectSetupPage = (props) => {
  const navigate = useNavigate();

  const [getSelectedOption, setSelectedOption] = createSignal();

  createEffect(() => {
    const selectedOption = getSelectedOption();
    if (selectedOption == 'manual') {
      navigate('/first-time-installation/manual-setup');
    } else if (selectedOption == 'quick') {
      navigate('/first-time-installation/quick-setup');
    }
  });

  onMount(() => {
    setNextInstallationStepSignal(6);
    setShowLogoSignal(true);
  });

  return (
    <>
      <View x={212}>
        <TitleAndSubtext
          title='Select installation method'
          subtext='How would you like to set up your decoder?'
        />
      </View>
      <Selector x={1273} y={460} width={435} viewableOptions={2} autofocus>
        <TextOption value='quick' setSelectedOption={setSelectedOption}>
          Quick set up
        </TextOption>

        <TextOption value='manual' setSelectedOption={setSelectedOption}>
          Manual set up
        </TextOption>
      </Selector>
    </>
  );
};

export default SelectSetupPage;
