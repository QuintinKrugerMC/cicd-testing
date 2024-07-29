import { Text, View } from '@lightningtv/solid';
import styles from '../../styles';
import { createSignal, createEffect } from 'solid-js';
import TitleAndSubtext from '../../components/TitleAndSubtext';
import Selector from '../../components/selector/Selector';
import TextOption from '../../components/selector/option/TextOption';
import { scanText } from '../../mock/scanningOverviewMockData';
import { useNavigate } from '@solidjs/router';
import {
  textAndIconRowStyle,
  smartCardTextStyle,
} from '../../styles/scanningStyles';

const ScanningFailPage = () => {
  const navigate = useNavigate();
  const [getSelectedOption, setSelectedOption] = createSignal();

  createEffect(() => {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
      if (selectedOption === 'SA') {
        navigate('/first-time-installation/scanning-overview');
      }
    }
  });
  return (
    <>
      <View style={styles.CenteredRowContainerStyle} gap={172}>
        <View width={890} gap={48} height={421}>
          <TitleAndSubtext title='Satellite overview' subtext='' height={130} />
          <View style={styles.ColumnContainerStyle} y={100} gap={31}>
            <View style={[textAndIconRowStyle, styles.RowContainerStyle]}>
              <View src='/assets/icons/info-icon.png' width={32} height={32} />
              <Text style={styles.SubtextStyle} contain='width'>
                {scanText.unsuccessful}
              </Text>
            </View>
            <View style={styles.ColumnContainerStyle}>
              <Text style={styles.SubtextStyle} contain='width'>
                {scanText.line1}
              </Text>
              <Text style={styles.SubtextStyle} contain='width'>
                {scanText.line2}
              </Text>
            </View>
            <Text style={styles.SubtextStyle} contain='width'>
              {scanText.line3}
            </Text>
            <View style={styles.RowContainerStyle} height={31}>
              <Text style={smartCardTextStyle}>{scanText.line4}</Text>
              <Text style={styles.SubtextStyle} marginLeft={31}>
                {scanText.line5}
              </Text>
            </View>
          </View>
        </View>
        <Selector autofocus width={435} height={160} viewableOptions={2}>
          <TextOption value='SA' setSelectedOption={setSelectedOption}>
            {scanText.scanAgain}
          </TextOption>
          <TextOption value='DSU' setSelectedOption={setSelectedOption}>
            {scanText.decoderSetUp}
          </TextOption>
        </Selector>
      </View>
    </>
  );
};

export default ScanningFailPage;
