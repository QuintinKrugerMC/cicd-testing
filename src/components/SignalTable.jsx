import { View, Text } from '@lightningtv/solid';
import ProgressBar from '../components/ProgressBar';
import styles from '../styles';

const SignalTable = () => {
  const ColumnStyle = {
    gap: 23,
    height: 259,
    width: 961,
  };

  const DividerStyle = {
    height: 43,
    width: 6,
    borderRadius: 3,
    color: '#0095DA26',
  };

  const tunerContent = [
    {
      tunerName: 'Tuner 1',
      userBandDetails: 'User Band 1: 1210',
      signalStrength: 1,
      signalQuality: 1,
    },
    {
      tunerName: 'Tuner 2',
      userBandDetails: 'User Band 1: 1420',
      signalStrength: 1,
      signalQuality: 1,
    },
    {
      tunerName: 'Tuner 3',
      userBandDetails: 'User Band 2: 1680',
      signalStrength: 0.8,
      signalQuality: 0.6,
    },
  ];

  return (
    <View>
      <View x={1412} y={425} width={297} height={89}>
        <Text fontSize={24} fontWeight={600}>
          Signal status monitor
        </Text>
        <View style={styles.RowContainerStyle} gap={138} alignItems='flexEnd'>
          <Text fontSize={20} fontWeight={500}>
            Strength
          </Text>
          <Text fontSize={20} fontWeight={500}>
            Quality
          </Text>
        </View>
      </View>

      <View style={[ColumnStyle, styles.ColumnContainerStyle]} x={871} y={524}>
        <For each={tunerContent}>
          {(item) => (
            <View style={styles.RowContainerStyle} height={75} width={961}>
              <View
                style={styles.RowContainerStyle}
                gap={64}
                marginRight={32}
                marginLeft={32}
              >
                <View height={31} width={116}>
                  <Text fontSize={24} fontWeight={600}>
                    {item.tunerName}
                  </Text>
                </View>
                <View
                  height={43}
                  width={717}
                  gap={128}
                  style={styles.RowContainerStyle}
                >
                  <View width={203} height={31}>
                    <Text fontSize={24} fontWeight={600}>
                      {item.userBandDetails}
                    </Text>
                  </View>
                  <View
                    style={styles.RowContainerStyle}
                    gap={32}
                    width={386}
                    height={43}
                  >
                    <ProgressBar signal={item.signalStrength} width={100} />
                    <View style={DividerStyle}></View>
                    <ProgressBar signal={item.signalQuality} width={100} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </For>
      </View>
    </View>
  );
};

export default SignalTable;
