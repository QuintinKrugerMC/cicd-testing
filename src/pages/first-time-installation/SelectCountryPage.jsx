import { Text, View } from '@lightningtv/solid';
import Option from '../../components/selector/option/Option';
import Selector from '../../components/selector/Selector';
import styles from '../../styles';
import { createSignal, createEffect, For, onMount } from 'solid-js';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from './global.first-time-installation';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import { useNavigate } from '@solidjs/router';
const TextStyle = {
  fontSize: 24,
  lineHeight: 44,
  fontWeight: 500,
};

const TagStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: 43,
  width: 80,
  alpha: 0.65,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  border: { width: 1.73, color: '#F1F1F1FF' },
  focus: {
    color: '#F1F1F1FF',
    alpha: 1.0,
  },
};

const TagTextStyle = {
  lineHeight: 35.2,
  fontSize: 22,
  fontWeight: 500,
  color: '#F1F1F1FF',
  focus: {
    color: '#0095DA',
  },
};

const countriesAndNetworks = [
  { country: 'South Africa', network: 'IS20', value: 'ZA' },
  { country: 'Algeria', network: 'E36B', value: 'AL' },
  { country: 'Angola', network: 'E36B', value: 'AN' },
  { country: 'Benin', network: 'IS20', value: 'BN' },
  { country: 'Botswana', network: 'IS20', value: 'BW' },
  { country: 'Burkina Faso', network: 'E36B', value: 'BF' },
  { country: 'Burundi', network: 'IS20', value: 'BR' },
  { country: 'Cameroon', network: 'IS20', value: 'CM' },
];

const SelectCountryPage = () => {
  const [getSelectedOptionSignal, setSelectedOptionSignal] = createSignal();
  const navigate = useNavigate();

  createEffect(() => {
    const selectedOption = getSelectedOptionSignal();
    if (selectedOption) {
      // Do something with this selected country once we get the JSON RPC integration
      console.log(`You selected country ${selectedOption}`);

      navigate('/first-time-installation/network-select');
    }
  });

  onMount(() => {
    setNextInstallationStepSignal(2);
    setShowLogoSignal(true);
  });

  return (
    <>
      <View style={styles.CenteredRowContainerStyle}>
        <TitleAndSubtext
          title={'Select a country'}
          subtext={'Please select the country where this decoder will be used'}
        ></TitleAndSubtext>
        <View style={styles.ColumnContainerStyle} width={435} height={504}>
          <Selector width={435} autofocus viewableOptions={7}>
            <For each={countriesAndNetworks}>
              {(countryAndNetwork, index) => {
                return (
                  <>
                    <Option
                      height={72}
                      setSelectedOption={setSelectedOptionSignal}
                      value={[countryAndNetwork.value, index()]}
                      justifyContent={'spaceBetween'}
                    >
                      <Text style={TextStyle} marginLeft={28}>
                        {countryAndNetwork.country}
                      </Text>
                      <View style={TagStyle} forwardStates marginRight={28}>
                        <Text style={TagTextStyle}>
                          {countryAndNetwork.network}
                        </Text>
                      </View>
                    </Option>
                  </>
                );
              }}
            </For>
          </Selector>
        </View>
      </View>
    </>
  );
};

export default SelectCountryPage;
