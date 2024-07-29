import { View } from '@lightningtv/solid';
import styles from '../../styles';
import Selector from '../../components/selector/Selector';
import { createEffect, createSignal, onMount } from 'solid-js';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from './global.first-time-installation';
import TextOption from '../../components/selector/option/TextOption';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import { useNavigate } from '@solidjs/router';

const SelectLanguagePage = () => {
  const [getSelectedOption, setSelectedOption] = createSignal();
  const navigate = useNavigate();

  createEffect(() => {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
      // Do something with this selected langage once we get the JSON RPC integration
      console.log(`You selected language ${selectedOption}`);
      navigate('/first-time-installation/country-select');
    }
  });

  onMount(() => {
    setNextInstallationStepSignal(1);
    setShowLogoSignal(true);
  });

  return (
    <View style={styles.CenteredRowContainerStyle}>
      <TitleAndSubtext
        title='Select a language'
        subtext='Please select the default language for your DStv Ultra decoder.'
      />
      <Selector width={435} height={160} viewableOptions={2} autofocus>
        <TextOption value='EN' setSelectedOption={setSelectedOption}>
          English
        </TextOption>
        <TextOption value='PR' setSelectedOption={setSelectedOption}>
          Portugues
        </TextOption>
      </Selector>
    </View>
  );
};

export default SelectLanguagePage;
