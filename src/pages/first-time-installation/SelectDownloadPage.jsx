import { View } from '@lightningtv/solid';
import { Column } from '@lightningtv/solid-ui';
import { createEffect, createSignal, onMount } from 'solid-js';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import Selector from '../../components/selector/Selector';
import Button from '../../components/Button';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from './global.first-time-installation';
import styles from '../../styles';
import TextWithTickOption from '../../components/selector/option/TextWithTickOption';
import { useNavigate } from '@solidjs/router';

const [getSelectedOptionSignal, setSelectedOptionSignal] = createSignal();

const SelectDownloadPage = () => {
  const navigate = useNavigate();
  createEffect(() => {
    const selectedOption = getSelectedOptionSignal();
    console.log('Do something with donwload selected:' + selectedOption);
  });
  onMount(() => {
    setSelectedOptionSignal('HD');
    setNextInstallationStepSignal(4);
    setShowLogoSignal(true);
  });

  return (
    <View style={styles.RowContainerStyle} x={212}>
      <TitleAndSubtext
        title='Select Download Output'
        subtext='You can change this setting in your video and audio settings'
      />

      <Column height={501} scroll={'none'} gap={40}>
        <Selector width={586} height={389} viewableOptions={3} autofocus>
          <TextWithTickOption
            value={'HD'}
            title={'HD'}
            subtext={'High Definition'}
            setSelectedOption={setSelectedOptionSignal}
            showTick={getSelectedOptionSignal() == 'HD'}
            height={129}
          />

          <TextWithTickOption
            value={'SD'}
            title={'SD'}
            subtext={'Standard Definition'}
            setSelectedOption={setSelectedOptionSignal}
            showTick={getSelectedOptionSignal() == 'SD'}
            height={129}
          />

          <TextWithTickOption
            value={'AET'}
            title={'Ask each time'}
            subtext={
              'No preference will be saved and you"ll be asked to choose each time'
            }
            setSelectedOption={setSelectedOptionSignal}
            showTick={getSelectedOptionSignal() == 'AET'}
            height={129}
          />
        </Selector>

        <Button
          width={256}
          height={72}
          text={'Continue'}
          onEnter={() => {
            navigate('/first-time-installation/audio-select');
          }}
        />
      </Column>
    </View>
  );
};

export default SelectDownloadPage;
