import { onMount, createSignal } from 'solid-js';
import Loader from '../../../components/Loader';
import TitleAndSubtext from '../../../components/TitleAndSubtext';
import { useNavigate } from '@solidjs/router';
import { connectToRouter } from '../../../api/networkApi';

const WifiConnectPage = () => {
  const navigate = useNavigate();
  onMount(() => {
    connectToRouter()
      .then(() => {
        navigate('/first-time-installation/connection-successful');
      })
      .catch(() => {
        navigate('/first-time-installation/wifi-setup/connection-failed');
      });
  });

  return (
    <>
      <TitleAndSubtext
        x={212}
        y={475}
        height={130}
        title={'Wi-Fi connecting'}
        subtext={'Please wait while the Wi-Fi is being connected.'}
      />
      <Loader x={1489} y={462} />
    </>
  );
};

export default WifiConnectPage;
