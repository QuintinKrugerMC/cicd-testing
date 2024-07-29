import { useNavigate } from '@solidjs/router';
import { View } from '@lightningtv/solid';
import { useFocusManager, useAnnouncer } from '@lightningtv/solid/primitives';

const App = (props) => {
  useFocusManager({
    Announcer: ['a'],
    Escape: ['Escape', 27],
    Backspace: ['Backspace', 8],
    Left: ['ArrowLeft', 37],
    Right: ['ArrowRight', 39],
    Up: ['ArrowUp', 38],
    Down: ['ArrowDown', 40],
    Enter: ['Enter', 13],
    Options: ['o'],
  });

  const navigate = useNavigate();
  const announcer = useAnnouncer();
  announcer.debug = false;
  announcer.enabled = false;

  return (
    <View
      ref={window.APP}
      onAnnouncer={() => (announcer.enabled = !announcer.enabled)}
      onLast={() => history.back()}
    >
      <View />
      {props.children}
    </View>
  );
};

export default App;
