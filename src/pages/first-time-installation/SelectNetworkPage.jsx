import { Text, View } from '@lightningtv/solid';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import {
  setShowLogoSignal,
  setNextInstallationStepSignal,
} from './global.first-time-installation';
import styles from '../../styles';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import Selector from '../../components/selector/Selector';
import TextOption from '../../components/selector/option/TextOption';
import Rings from '../../components/Rings';
import { useNavigate } from '@solidjs/router';
import InfoBox from '../../components/InfoBox';
import {
  setWifiPasswordSignal,
  setWifiSelectedSignal,
  setAvailableConnectionsSignal,
} from './wifi-setup/global-wifi-setup';

/**
 * This method creates animations for the provided elements. Elements may be undefined which is the case if that element is not rendered to the screen
 * @param {object} ringsDecoderBack is the rings to go with the decoder back element
 * @param {object} ringsDecoderFront is the rings to go with the decoder front image element
 * @param {object} decoderFront is front facing decoder image element
 * @param {object} decoderBack is back facing decoder image element
 * @param {object} cable is the cable image element
 * @param {object} caution is the element containing the caution image
 * @returns animations for each of the elements, if an element is undefined, the corresponding element too will be undefined
 */
const createAnimations = (
  ringsDecoderBack,
  ringsDecoderFront,
  decoderFront,
  decoderBack,
  cable,
  caution,
) => {
  const graphicAnimation = {
    easing: 'ease-in-out',
    duration: 500,
  };

  const ringsDecoderBackAnimation = ringsDecoderBack?.animate(
    { x: 99 },
    graphicAnimation,
  );

  const ringsDecoderFrontAnimation = ringsDecoderFront?.animate(
    { x: 314 },
    graphicAnimation,
  );

  const decoderFrontAnimation = decoderFront?.animate(
    { x: 314 },
    graphicAnimation,
  );

  const decoderBackAnimation = decoderBack?.animate(
    { x: 314 },
    graphicAnimation,
  );

  const cableAnimation = cable?.animate({ y: 795 }, graphicAnimation);

  const cautionAnimation = caution?.animate({ x: 314, graphicAnimation });

  return [
    ringsDecoderBackAnimation,
    ringsDecoderFrontAnimation,
    decoderFrontAnimation,
    decoderBackAnimation,
    cableAnimation,
    cautionAnimation,
  ];
};

/**
 * Performs a reset of all global signals used for network connection
 */
const resetNetworkSignals = () => {
  setWifiPasswordSignal(undefined);
  setWifiSelectedSignal(undefined);
  setAvailableConnectionsSignal(undefined);
};

const SelectNetworkPage = () => {
  let decoderFront,
    decoderBack,
    cable,
    ringsDecoderFront,
    ringsDecoderBack,
    caution;

  const navigate = useNavigate();

  const [getGraphicsSignal, setGraphicsSignal] = createSignal();

  const [getSelectedOption, setSelectedOption] = createSignal();

  createEffect(() => {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
      switch (selectedOption) {
        case 'wifi':
          navigate('/first-time-installation/wifi-setup/search-connections');
          break;
        case 'ethernet':
          navigate('/first-time-installation/ethernet-setup');
          break;
        case 'skip':
          navigate('/first-time-installation/audio-select');
        default:
          console.log(`You selected network option ${selectedOption}`);
          break;
      }
    }
  });

  onMount(() => {
    setNextInstallationStepSignal(3);
    setShowLogoSignal(true);

    resetNetworkSignals();

    createEffect(() => {
      const graphics = getGraphicsSignal();

      // call this method every time the graphic changes as the elements on screen will change
      // thus some elements are removed while others will be added. For this reason animations must be
      // reset
      const [
        ringsDecoderBackAnimation,
        ringsDecoderFrontAnimation,
        decoderFrontAnimation,
        decoderBackAnimation,
        cableAnimation,
        cautionAnimation,
      ] = createAnimations(
        ringsDecoderBack,
        ringsDecoderFront,
        decoderFront,
        decoderBack,
        cable,
        caution,
      );

      if (graphics == 'wifiGraphic') {
        decoderFrontAnimation.start();
        ringsDecoderFrontAnimation.start();
      } else if (graphics == 'ethernetGraphic') {
        decoderBackAnimation.start();
        ringsDecoderBackAnimation.start();
        cableAnimation.start();
      } else if (graphics == 'cautionedDecoderGraphic') {
        decoderFrontAnimation.start();
        cautionAnimation.start();
      }
    });
  });

  return (
    <View style={styles.CenteredRowContainerStyle}>
      <View
        style={styles.ColumnContainerStyle}
        width={900}
        height={505}
        gap={48}
        flexBoundary='fixed'
      >
        <TitleAndSubtext
          title='Select a network type'
          subtext='Please select a preferred network for your internet connection.'
          height={130}
        />
        <View style={styles.ColumnContainerStyle} gap={48}>
          <Text style={styles.SubtextStyle}>
            You can configure your connection in the Settings as well.
          </Text>
          <Selector width={435} autofocus>
            <TextOption
              value='wifi'
              setSelectedOption={setSelectedOption}
              onFocus={() => setGraphicsSignal('wifiGraphic')}
            >
              Wi-Fi
            </TextOption>
            <TextOption
              value='ethernet'
              setSelectedOption={setSelectedOption}
              onFocus={() => setGraphicsSignal('ethernetGraphic')}
            >
              Ethernet Cable
            </TextOption>
            <TextOption
              value='skip'
              setSelectedOption={setSelectedOption}
              onFocus={() => setGraphicsSignal('cautionedDecoderGraphic')}
            >
              Skip
            </TextOption>
          </Selector>
        </View>
      </View>
      <View
        style={[styles.CenteredColumnContainerStyle]}
        width={628}
        height={1044}
      >
        <View width={628} height={1044}>
          <Show when={getGraphicsSignal() == 'wifiGraphic'}>
            <View
              ref={decoderFront}
              x={1920}
              y={522}
              mount={0.5}
              width={628}
              height={174}
              src={'/assets/decoder/decoder-front.png'}
              zIndex={2}
            />
            <Rings
              ref={ringsDecoderFront}
              x={1920}
              y={522}
              mount={0.5}
              zIndex={1}
            />
          </Show>
          <Show when={getGraphicsSignal() == 'ethernetGraphic'}>
            <View
              ref={decoderBack}
              x={1920}
              y={522}
              mount={0.5}
              width={628}
              height={174}
              src={'/assets/decoder/decoder-back.png'}
            />
            <View
              ref={cable}
              x={99}
              y={1080}
              mount={0.5}
              width={36}
              height={522}
              src={'/assets/network/cable.png'}
            />
            <Rings ref={ringsDecoderBack} x={1920} y={505} mount={0.5} />
          </Show>
          <Show when={getGraphicsSignal() == 'cautionedDecoderGraphic'}>
            <InfoBox
              ref={caution}
              x={1920}
              y={360}
              mount={0.5}
              width={495}
              height={117}
            >
              Your viewing experience may not be optimal without an internet
              connection.
            </InfoBox>
            <View
              ref={decoderFront}
              x={1920}
              y={522}
              mount={0.5}
              width={628}
              height={174}
              src={'/assets/decoder/decoder-front.png'}
            />
          </Show>
        </View>
      </View>
    </View>
  );
};

export default SelectNetworkPage;
