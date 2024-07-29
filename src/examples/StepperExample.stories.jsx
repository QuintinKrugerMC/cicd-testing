import { createSignal, onMount } from 'solid-js';
import Stepper from '../components/Stepper';
import { View, Text } from '@lightningtv/solid';

export const StepperExample = () => {
  const [nextStep, setNextStep] = createSignal(1);

  return (
    <View src={'/assets/background.png'}>
      <Stepper
        x={212}
        y={46}
        width={1220}
        height={100}
        currentStep={nextStep()}
        steps={[
          'Language',
          'Country',
          'Internet Connection',
          'Audio',
          'Download quality',
          'Installation setup',
          'Satelite overview',
        ]}
      />
      <Text fontSize='25' mount={0.5} y={500} x={1050}>
        Hit enter to step through all the steps
      </Text>
      <View
        y={540}
        x={960}
        colorLeft={'#00508F'}
        colorRight={'#0095DA'}
        width={150}
        height={50}
        borderRadius={5}
        autofocus
        onEnter={() =>
          setNextStep((prev) => {
            if (prev < 7) {
              return prev + 1;
            } else {
              return 1;
            }
          })
        }
      >
        <Text fontSize={25} x={75} y={25} mount={0.5}>
          Next Step
        </Text>
      </View>
    </View>
  );
};

export default {
  title: 'Stepper',
  component: StepperExample,
};
