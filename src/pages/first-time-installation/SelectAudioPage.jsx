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

const SelectAudioPage = () => {
  const navigate = useNavigate();
  createEffect(() => {
    const selectedOption = getSelectedOptionSignal();
    console.log('Do something with Audio selected:' + selectedOption);
  });
  onMount(() => {
    setSelectedOptionSignal('Fixed');
    setNextInstallationStepSignal(5);
    setShowLogoSignal(true);
  });

  return (
    <View style={styles.RowContainerStyle} x={212}>
      <TitleAndSubtext
        title='Select Audio Output'
        subtext='You can change this setting in your video and audio settings'
        y={920}
      />

      <Column gap={40} y={620} scroll={'none'}>
        <Selector width={590} height={372} viewableOptions={2} autofocus>
          <TextWithTickOption
            value={'Fixed'}
            title={'Variable Volume'}
            subtext={
              'Your Explora Ultra remote will control the volume (outputs studio sound only).'
            }
            setSelectedOption={setSelectedOptionSignal}
            showTick={getSelectedOptionSignal() == 'Fixed'}
            height={178}
          />

          <TextWithTickOption
            value={'Variable'}
            title={'Fixed Volume'}
            subtext={
              'Your tv amp or sound bar remote will control the volume (includes Dolby Atmos if available)'
            }
            setSelectedOption={setSelectedOptionSignal}
            showTick={getSelectedOptionSignal() == 'Variable'}
            height={178}
          />
        </Selector>
        <Button
          width={256}
          height={72}
          text={'Continue'}
          onEnter={() => {
            navigate('/first-time-installation/installation-setup');
          }}
        />
      </Column>
    </View>
  );
};

export default SelectAudioPage;
