import { Text, View } from '@lightningtv/solid';
import styles from '../../styles';
import Loader from '../../components/Loader';
import { onMount } from 'solid-js';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import { overviewData, scanText } from '../../mock/scanningOverviewMockData';
import { useNavigate } from '@solidjs/router';
import { rowStyle, label, barLine } from '../../styles/scanningStyles';

const ScanningOverviewPage = () => {
  const navigate = useNavigate();
  const overviewDataRows = overviewData;

  onMount(() => {
    setTimeout(() => {
      navigate('/first-time-installation/scanning-failed');
    }, 5000);
  });
  return (
    <>
      <View style={styles.CenteredRowContainerStyle} gap={220}>
        <View
          style={styles.ColumnContainerStyle}
          gap={38}
          width={890}
          height={460}
        >
          <TitleAndSubtext title='Satellite overview' subtext='' height={130} />
          <For each={overviewDataRows}>
            {(row) => {
              return (
                <>
                  <For each={row.data}>
                    {(key) => {
                      return (
                        <View style={rowStyle} gap={20} height={32}>
                          <View width={480} display='flex' gap={20}>
                            <Text fontSize={24} fontWeight={600}>
                              {key.leftLabel}
                            </Text>
                            <View flexGrow={1} style={barLine} y={16} />
                          </View>
                          <Text width={200} style={label}>
                            {key.rightLabel}
                          </Text>
                        </View>
                      );
                    }}
                  </For>
                </>
              );
            }}
          </For>
        </View>
        <View
          width={365}
          height={250}
          style={styles.CenteredColumnContainerStyle}
        >
          <Loader x={1386} y={462} />
          <Text style={styles.SubtextStyle} mountY={-0.6}>
            {scanText.scanningProgress}
          </Text>
          <Text style={styles.SubtextStyle} mountY={-0.6}>
            {scanText.timeDuration}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ScanningOverviewPage;
