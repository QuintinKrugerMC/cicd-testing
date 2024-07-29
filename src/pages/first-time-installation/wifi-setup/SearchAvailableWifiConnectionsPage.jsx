import { Text, View } from '@lightningtv/solid';
import styles from '../../../styles';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import { useNavigate } from '@solidjs/router';
import { setAvailableConnectionsSignal } from './global-wifi-setup';
import Loader from '../../../components/Loader';
import { createSignal, onCleanup, onMount } from 'solid-js';

const presentAvailableNetworks = () => {
  // mock connections, this is where we need to intergrate JSONRPC
  const availableConnections = [
    { ssid: 'Home Internet', quality: 'good', locked: true },
    { ssid: 'Sir Cumference', quality: 'medium', locked: false },
    { ssid: 'High Saturation Net', quality: 'bad', locked: true },
  ];
  return Promise.resolve(availableConnections);
};
const SearchAvailableWifiConnectionsPage = () => {
  let availableConnectionsTimout, retryTimeout;
  const navigate = useNavigate();
  const [
    getAvailableConnectionStatusSignal,
    setAvailableConnectionStatusSignal,
  ] = createSignal('pending');

  onMount(() => {
    availableConnectionsTimout = setTimeout(() => {
      presentAvailableNetworks()
        .then((connections) => {
          setAvailableConnectionsSignal(connections);
          navigate('/first-time-installation/wifi-setup/available-connections');
        })
        .catch(() => {
          setAvailableConnectionStatusSignal('none');
          retryTimeout = setTimeout(() => {
            presentAvailableNetworks()
              .then((connections) => {
                setAvailableConnectionsSignal(connections);
                navigate(
                  '/first-time-installation/wifi-setup/available-connections',
                );
              })
              .catch(() => {
                navigate(
                  '/first-time-installation/wifi-setup/no-wifi-networks',
                );
              });
          }, 5000);
        });
    }, 5000);
  });

  onCleanup(() => {
    // prevent timeouts from completing if the user has selected WPS option
    clearTimeout(availableConnectionsTimout);
    clearTimeout(retryTimeout);
  });

  return (
    <View
      style={styles.CenteredRowContainerStyle}
      gap={387}
      onOptions={() => {
        navigate('/first-time-installation/wifi-setup/wps');
      }}
      autofocus
    >
      <View
        style={styles.ColumnContainerStyle}
        gap={48}
        width={834}
        height={210}
      >
        <TitleAndSubtext
          title='Wi-Fi connection'
          subtext='Searching for available Wi-Fi networks.'
          height={130}
        />
        <View style={styles.RowContainerStyle} height={32} gap={24}>
          <View src='/assets/icons/info-icon.png' width={32} height={32} />
          <Text style={styles.SubtextStyle}>
            For WPS connection, please press the OPTIONS button on the remote.
          </Text>
        </View>
        <Show when={getAvailableConnectionStatusSignal() == 'none'}>
          <Text style={styles.SubtextStyle}>Retrying in 5 seconds</Text>
        </Show>
      </View>
      <Loader />
    </View>
  );
};

export default SearchAvailableWifiConnectionsPage;
