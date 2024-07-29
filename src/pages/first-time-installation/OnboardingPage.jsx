import { Text, View, hexColor } from '@lightningtv/solid';
import {
  setShowLogoSignal,
  setNextInstallationStepSignal,
} from './global.first-time-installation';
import { createSignal } from 'solid-js';
import styles from '../../styles';
import Button from '../../components/Button';
import { useNavigate } from '@solidjs/router';
import TitleAndSubtext from '../../components/TitleAndSubtext';

const LogoStyle = {
  width: 194,
  height: 120,
  y: 273,
  x: 212,
};

const SublineOneStyle = {
  fontSize: 64,
  fontWeight: 700,
};

const SublineTwoStyle = {
  fontSize: 64,
  color: 0x0096ffff,
  fontWeight: 700,
};

const SublineStyle = {
  x: 212,
  y: 457,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const ColumnContainerStyle = {
  y: 369,
  x: 212,
  height: 342,
  gap: 48,
  ...styles.ColumnContainerStyle,
};

const TextAndIconRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 48,
  gap: 6,
};

const BackIconStyle = {
  borderRadius: 13,
  width: 48,
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  colorLeft: '#00508F48',
  colorRight: '#00B3FF64',
  ...styles.ColumnContainerStyle,
};

const BackIconImageStyle = {
  width: 27,
  height: 27,
};

const OnBoardingPage = () => {
  const [getOnBoardingSignal, setOnBoardingSignal] = createSignal('welcome');
  setNextInstallationStepSignal(undefined); // dont show stepper at top of FirstTimeInstallationPage
  setShowLogoSignal(false); // dont show logo on left top of App
  const navigate = useNavigate();

  setTimeout(() => {
    setOnBoardingSignal('nextSteps');
    setShowLogoSignal(true); // dont show logo on left top of App
  }, 5000);

  return (
    <Switch>
      <Match when={getOnBoardingSignal() == 'welcome'}>
        <View src='/assets/dstv-white-logo.png' style={LogoStyle} />
        <View style={SublineStyle}>
          <Text style={SublineOneStyle}>Welcome to the</Text>
          <Text style={SublineTwoStyle}>home of entertainment</Text>
        </View>
      </Match>
      <Match when={getOnBoardingSignal() == 'nextSteps'}>
        <View style={ColumnContainerStyle}>
          <TitleAndSubtext
            title={'Lets get started!'}
            subtext={
              'This quick and easy guide will have you watching in minutes.'
            }
            height={126}
          ></TitleAndSubtext>
          <View style={TextAndIconRowStyle}>
            <Text fontSize={24} fontWeight={400}>
              You can easily return to a previous step by pressing the BACK
            </Text>
            <View style={BackIconStyle}>
              <View
                style={BackIconImageStyle}
                src='/assets/icons/arrows/left-arrow-icon.png'
              />
            </View>
            <Text style={styles.SubtextStyle}>button on your remote.</Text>
          </View>
          <Button
            autofocus
            width={256}
            height={72}
            text={'Continue'}
            onEnter={() => navigate('/first-time-installation/language-select')}
          />
        </View>
      </Match>
    </Switch>
  );
};

export default OnBoardingPage;
