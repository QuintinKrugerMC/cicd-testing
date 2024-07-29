import { Text, View } from '@lightningtv/solid';
import styles from '../../styles';
import { createSignal, createEffect, onMount } from 'solid-js';

const passwordPlaceHolderTransition = { easing: 'ease-in', duration: 100 };

const VisibilityIconStyle = {
  width: 56,
  height: 64,
  colorLeft: '#0095DA26',
  colorRight: '#0095DA26',
  borderRadius: 8,
  focus: {
    colorLeft: '#00508FD9',
    colorRight: '#0095DAFF',
  },
};

const PasswordTextStyle = {
  fontSize: 28,
  lineHeight: 44,
  weight: 600,
  color: '#F1F1F1FF',
};

const CursorTextStyle = {
  color: '#F1F1F1FF',
  fontSize: 24,
  lineHeight: 44,
  weight: 700,
};

const PasswordTextContainerStyle = {
  y: 36,
  x: 20,
  mountY: 0.5,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0,
};

const PasswordPlaceHolderTextStyle = {
  fontSize: 24,
  lineHeight: 44,
  weight: 500,
  color: '#F1F1F1B2',
  marginLeft: 20,
  x: 20,
  y: 36,
  mountY: 0.5,
  shifted: {
    y: 0,
    x: 30,
    fontSize: 16,
    color: 0xf1f1f1ff,
  },
  transition: {
    x: passwordPlaceHolderTransition,
    y: passwordPlaceHolderTransition,
    fontSize: passwordPlaceHolderTransition,
    color: passwordPlaceHolderTransition,
  },
};

const PasswordContainerStyle = {
  borderRadius: 16,
  border: { width: 4, color: '#0095DA26' },
};

/**
 * Provides a text area for passwords, allowing the password to be shown or hidden when the visibility icon is toggled
 * @param {object} props allowing custom options to be defined used for the PasswordTextArea component
 * - props.password is the password to display in the password field of this component
 * - props.cursorPosition is the position at which the cursor must be palced. If the value exceeds the length of the password, it sets the cursor to be at the end of the string. Similarly if the value is less than 0, it places it at position 0
 * @returns the PasswordTextArea
 */
const PasswordInput = (props) => {
  let passwordPlaceHolderText, cursor, cursorAnimation;
  const [getShowPasswordSignal, setShowPasswordSignal] = createSignal(true);

  // show or hide password
  const getPasswordDisplay = () => {
    const showPassword = getShowPasswordSignal();
    return showPassword ? props.password : '*'.repeat(props.password.length);
  };

  // to move the 'Password' text above the text box
  createEffect(() => {
    if (getPasswordDisplay()) {
      if (!passwordPlaceHolderText.states.includes('shifted')) {
        passwordPlaceHolderText.states.add('shifted');
      }
    } else {
      passwordPlaceHolderText.states.remove('shifted');
    }
  });

  // change visibilty icon based on whether password must be shown or not
  const getVisibilityIcon = () => {
    return getShowPasswordSignal()
      ? '/assets/icons/non-visible-icon.png'
      : '/assets/icons/visible-icon.png';
  };

  // ensure if cursor is on screen it is animating
  createEffect(() => {
    if (props.cursorPosition) {
      if (cursorAnimation.state != 'running') {
        cursorAnimation.start();
      }
    }
  });

  onMount(() => {
    //cursor animation
    cursorAnimation = cursor.animate(
      { alpha: 1 },
      {
        duration: 1000,
        easing: 'ease-in-out',
        loop: true,
        stopMethod: 'reverse',
      },
    );
  });

  return (
    <View
      {...props}
      height={72}
      gap={12}
      style={styles.CenteredRowContainerStyle}
      forwardFocus={1}
    >
      {/* subtract gap and visiblity icon sizes to ensure the total width adheres to passed in width*/}
      <View style={PasswordContainerStyle} width={props.width - 12 - 56}>
        <Text
          style={PasswordPlaceHolderTextStyle}
          ref={passwordPlaceHolderText}
        >
          Password
        </Text>

        <View style={PasswordTextContainerStyle}>
          <Text style={PasswordTextStyle}>
            {getPasswordDisplay()?.slice(0, Math.max(0, props.cursorPosition))}
          </Text>
          <Text style={CursorTextStyle} alpha={0} ref={cursor}>
            |
          </Text>
          <Text style={PasswordTextStyle}>
            {getPasswordDisplay()?.slice(
              Math.min(getPasswordDisplay().length, props.cursorPosition),
              getPasswordDisplay().length,
            )}
          </Text>
        </View>
      </View>

      <View
        style={[VisibilityIconStyle, styles.CenteredColumnContainerStyle]}
        onEnter={() => setShowPasswordSignal((prev) => !prev)}
      >
        <View src={getVisibilityIcon()} width={32} height={22} />
      </View>
    </View>
  );
};

export default PasswordInput;
