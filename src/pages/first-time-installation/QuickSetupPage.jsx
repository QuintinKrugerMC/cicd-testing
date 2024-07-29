import DecoderDisplay from '../../components/DecoderDisplay';
import Option from '../../components/selector/option/Option';
import Selector from '../../components/selector/Selector';
import SignalTable from '../../components/SignalTable';
import { createSignal } from 'solid-js';
import { View, Text } from '@lightningtv/solid';
import { Column } from '@lightningtv/solid-ui';
import Button from '../../components/Button';
import styles from '../../styles';

const QuickSetup = () => {
  const [selectedOption, setSelectedOption] = createSignal('');
  const DecoderOptionStyle = {
    height: 92,
    borderRadius: 16,
    colorLeft: '#00508F00',
    colorRight: '#0095DA00',
    border: { width: 4, color: '#0095DA26' },
    focus: {
      colorLeft: '#00508F',
      colorRight: '#0095DA',
      border: { width: 0 },
    },
  };

  return (
    <>
      <View
        style={styles.CenteredColumnContainerStyle}
        width={890}
        height={130}
        x={515}
        y={143}
      >
        <Text fontSize={64} fontWeight={700}>
          Quick set-up
        </Text>
        <Text fontSize={24} fontWeight={600}>
          Choose a decoder
        </Text>
      </View>
      <Column x={243} y={460} width={586} height={308} gap={40} scroll='none'>
        <Column gap={16}>
          <Selector width={586} autofocus viewableOptions={3}>
            <Option
              value={'decoderOne'}
              setSelectedOption={setSelectedOption}
              style={DecoderOptionStyle}
            >
              <DecoderDisplay
                text='Decoder 1'
                showTick={selectedOption() == 'decoderOne'}
              />
            </Option>
            <Option
              value={'decoderTwo'}
              setSelectedOption={setSelectedOption}
              height={92}
              style={DecoderOptionStyle}
            >
              <DecoderDisplay
                text='Decoder 2'
                showTick={selectedOption() == 'decoderTwo'}
              />
            </Option>
            <Option
              value={'decoderThree'}
              setSelectedOption={setSelectedOption}
              height={92}
              style={DecoderOptionStyle}
            >
              <DecoderDisplay
                text='Decoder 3'
                showTick={selectedOption() == 'decoderThree'}
              />
            </Option>
          </Selector>
        </Column>
        <Button
          width={256}
          height={72}
          text={'Continue'}
          fontSize={24}
          onEnter={() => {
            // to navigate to overview page
          }}
        />
      </Column>
      <SignalTable />
    </>
  );
};

export default QuickSetup;
