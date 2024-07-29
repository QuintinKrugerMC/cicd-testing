import { View, Text, Switch } from '@lightningtv/solid';
import styles from '../styles';
import { Show } from '@lightningtv/solid';
import Loader from './Loader';
import { onMount } from 'solid-js';
const ConnectionDetailTableStyle = {
  gap: 32,
  borderRadius: 16,
  width: 512,
  border: {
    width: 4,
    color: '#0095DA26',
  },
  display: 'flex',
  ...styles.ColumnContainerStyle,
};

const ConnectionDetailRowStyle = {
  height: 44,
  justifyContent: 'spaceBetween',
  ...styles.RowContainerStyle,
};

const ConnectionDetailTextStyle = {
  fontSize: 24,
  fontWeight: 500,
  marginLeft: 40,
  lineHeight: 31,
};

const IconStyle = {
  width: 44,
  height: 44,
  marginRight: 40,
};

const DownloadSpeedTextStyle = {
  fontSize: 24,
  marginRight: 40,
  fontWeight: 700,
  lineHeight: 31,
};

const bitsToKbps = (bits) => {
  return Math.round(bits / 1000);
};

const kbpsToMbps = (kbps) => {
  return Math.round(kbps / 1000);
};

/**
 * Coverts bits to Kbps or Mbps, which ever makes more sense based on the result of coverting bits to both Kbps and Mbps as well as the metric for display purposes
 * @param {number} bits are the bits to be used to set the download speed and units
 * @returns a tuple of the coverted bits and the units it was converted to (either 'Kbps' or 'Mbps')
 */
const getDownloadSpeedMetrics = (bits) => {
  const kbps = bitsToKbps(bits);
  const mbps = kbpsToMbps(kbps);

  if (mbps > 0) {
    return [mbps, 'Mbps'];
  }
  return [kbps, 'Kbps'];
};

/**
 *
 * @param {object} props to be passed for positioning and styling. In addition to default properties that can be set, custom properties are also allowed:
 * - props.routerConnection (boolean) - if undefined, a loader will be palced next to the 'Router connection' string. If true, a green check mark icon is added, alternative a red cross icon is added
 * - props.internetConnection (boolean) - if undefined, a loader will be palced next to the 'Internet connection' string. If true, a green check mark icon is added, alternative a red cross icon is added
 * - props.downloadSpeed (number) -  bits value of the download speed. If undefined, a loader will be palced next to the 'Download speed' string. Alternatively, the value will be coverted to Kbps or Mbps (which ever makes more sense), replacing the loader
 * @returns NetworkSummaryTable
 */
const NetworkSummaryTable = (props) => {
  const downloadSpeedMetrics = () =>
    getDownloadSpeedMetrics(props.downloadSpeed);

  return (
    <View style={ConnectionDetailTableStyle} flexBoundary='contain'>
      <View style={ConnectionDetailRowStyle} marginTop={40}>
        <Text style={ConnectionDetailTextStyle}>Router connection</Text>
        <Show
          when={
            props.routerConnection != undefined &&
            props.routerConnection == true
          }
          fallback={<Loader style={IconStyle} />}
        >
          <View
            style={IconStyle}
            src='/assets/icons/checkmarks/green-checkmark-icon.png'
          />
        </Show>
      </View>
      <View
        style={ConnectionDetailRowStyle}
        marginBottom={
          props.internetConnection || props.internetConnection == undefined
            ? 0
            : 40
        }
      >
        <Text style={ConnectionDetailTextStyle}>Internet connection</Text>
        <Switch>
          <Match when={props.internetConnection == undefined}>
            <Loader style={IconStyle} />
          </Match>
          <Match when={props.internetConnection == true}>
            <View
              style={IconStyle}
              src='/assets/icons/checkmarks/green-checkmark-icon.png'
            />
          </Match>
          <Match when={props.internetConnection == false}>
            <View style={IconStyle} src='/assets/icons/red-cross-icon.png' />
          </Match>
        </Switch>
      </View>
      <Show
        when={
          props.internetConnection == undefined ||
          props.internetConnection == true
        }
      >
        <View style={ConnectionDetailRowStyle} marginBottom={40}>
          <Text style={ConnectionDetailTextStyle}>Download speed</Text>
          <Show
            when={props.downloadSpeed != undefined}
            fallback={<Loader style={IconStyle} />}
          >
            <Text
              style={DownloadSpeedTextStyle}
            >{`${downloadSpeedMetrics()[0]} ${downloadSpeedMetrics()[1]}`}</Text>
          </Show>
        </View>
      </Show>
    </View>
  );
};

export default NetworkSummaryTable;
