import { createSignal, createEffect } from 'solid-js';
import Selector from '../components/selector/Selector';
import { Text } from '@lightningtv/solid';
import Option from '../components/selector/option/Option';
import WifiOption from '../components/selector/option/WifiOption';
import { Row } from '@lightningtv/solid-ui';
import TextOption from '../components/selector/option/TextOption';

/**
 * Sample usage of Selector with custom otion Option, TextOption and WifiOption
 */
export const SelectorExamples = () => {
  const [simpleSelectorSignal, setSimpleSelectorSignal] = createSignal();
  const [wifiOptionSelectorSignal, setWifiOptionSelectorSignal] =
    createSignal();
  const [textOptionSignal, setTextOptionSignal] = createSignal();

  createEffect(() => {
    console.log(`Simple selector option selected: ${simpleSelectorSignal()}`);
    console.log(
      `WifiOption selector option selected: ${wifiOptionSelectorSignal()}`,
    );
    console.log(`TextOption selector option selected: ${textOptionSignal()}`);
  });

  return (
    <Row>
      <Selector width={400} viewableOptions={7} autofocus>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption1'}
        >
          <Text fontSize={40}>Simple Option 1</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption2'}
        >
          <Text fontSize={40}>Simple Option 2</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 3</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 4</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 5</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 6</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 7</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 8</Text>
        </Option>
        <Option
          setSelectedOption={setSimpleSelectorSignal}
          height={72}
          value={'simpleSelectorOption3'}
        >
          <Text fontSize={40}>Simple Option 3</Text>
        </Option>
      </Selector>
      <Selector width={300} viewableOptions={1}>
        <WifiOption
          value={'SSID1'}
          ssid={'Some SSID 1'}
          locked={true}
          quality={'good'}
          setSelectedOption={setWifiOptionSelectorSignal}
        />
        <WifiOption
          value={'SSID2'}
          ssid={'Some SSID 2'}
          locked={false}
          quality={'bad'}
          setSelectedOption={setWifiOptionSelectorSignal}
        />
        <WifiOption
          value={'SSID3'}
          ssid={'Some SSID 3'}
          locked={true}
          quality={'medium'}
          setSelectedOption={setWifiOptionSelectorSignal}
        />
      </Selector>
      <Selector width={400} viewableOptions={3}>
        <TextOption value='textOption1' setSelectedOption={setTextOptionSignal}>
          Text option 1
        </TextOption>
        <TextOption value='textOption2' setSelectedOption={setTextOptionSignal}>
          Text option 2
        </TextOption>
        <TextOption value='textOption3' setSelectedOption={setTextOptionSignal}>
          Text option 3
        </TextOption>
      </Selector>

      <Selector width={400} viewableOptions={2}>
        <TextOption value='textOption1' setSelectedOption={setTextOptionSignal}>
          Text option 1
        </TextOption>
        <TextOption value='textOption2' setSelectedOption={setTextOptionSignal}>
          Text option 2
        </TextOption>
        <TextOption value='textOption3' setSelectedOption={setTextOptionSignal}>
          Text option 3
        </TextOption>
      </Selector>
    </Row>
  );
};

export default {
  title: 'Selector',
  component: SelectorExamples,
};
