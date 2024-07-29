import { Row } from '@lightningtv/solid-ui';
import Button from './Button';
import { useNavigate } from '@solidjs/router';

/**
 * Contains a number of buttons to perform network recovery actions based on which button is selected.
 * A default 'Switch network' button exists that will navigate to the /first-time-installation/network-select page when selected
 * @param {object} props allowing custom options to be defined. 2 Properties are mandatory:
 * - props.skip - accepts a method that will execute when the 'Skip' button is selected
 * - props.tryAgain - accepts a method that will execute when the 'Try again' button is selected
 * @returns
 */
const NetworkRecoveryButtons = (props) => {
  const navigate = useNavigate();
  return (
    <Row {...props} height={76} gap={16} justifyContent='center' selected={2}>
      <Button text={'Skip'} width={256} onEnter={props.skip} />
      <Button
        text={'Switch network'}
        width={256}
        onEnter={() => {
          navigate('/first-time-installation/network-select');
        }}
      />
      <Button text={'Try again'} width={256} onEnter={props.tryAgain} />
    </Row>
  );
};

export default NetworkRecoveryButtons;
