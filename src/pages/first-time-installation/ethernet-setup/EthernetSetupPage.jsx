import { onMount, createSignal } from 'solid-js';
import {
  setNextInstallationStepSignal,
  setShowLogoSignal,
} from '../global.first-time-installation';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import Loader from '../../../components/Loader';
import { useNavigate } from '@solidjs/router';
import styles from '../../../styles';
import { View, Text } from '@lightningtv/solid';
import { connectToRouter } from '../../../api/networkApi';

const EthernetSetupPage = (props) => {
  const [getConnectionEstablishedSignal, setConnectionEstablishedSignal] =
    createSignal('pending');

  const navigate = useNavigate();

  onMount(() => {
    setNextInstallationStepSignal(3);
    setShowLogoSignal(true);

    connectToRouter()
      .then(() => {
        navigate('/first-time-installation/connection-successful');
      })
      .catch(() => {
        setConnectionEstablishedSignal(false);

        connectToRouter()
          .then(() => {
            navigate('/first-time-installation/connection-successful');
          })
          .catch(() => {
            navigate('/first-time-installation/ethernet-setup-failed');
          });
      });
  });

  return (
    <>
      <View style={styles.ColumnContainerStyle} x={212} y={475} gap={16}>
        <TitleAndSubtext
          width={890}
          height={130}
          title={'Ethernet connection'}
          subtext={'Searching for an available ethernet cable connection.'}
        />
        <Show when={getConnectionEstablishedSignal() == false}>
          <Text style={styles.SubtextStyle}>Retrying in 5 seconds</Text>
        </Show>
      </View>

      <Loader x={1486} y={462} />
    </>
  );
};

export default EthernetSetupPage;
