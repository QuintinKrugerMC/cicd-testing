import { Column } from '@lightningtv/solid-ui';
import { View } from '@lightningtv/solid';
import {
  Show,
  createMemo,
  createSignal,
  children,
  createEffect,
} from 'solid-js';
import styles from '../../styles';

const ColumnStyle = {
  gap: 15,
  alignItems: 'center',
  scroll: 'edge',
};

const ArrowImageStyle = {
  width: 48,
  height: 48,
};

const ArrowContainerStyle = {
  justifyContent: 'center',
  height: ArrowImageStyle.height,
};

const BottomShadowStyle = {
  colorBottom: '#010101',
  colorTop: '#01010100',
  zIndex: 1,
  height: 117,
  flexItem: false,
  mountY: 1,
};

const TopShadowStyle = {
  colorTop: '#010101',
  colorBottom: '#01010100',
  height: 117,
  zIndex: 1,
};

/**
 * Uses indices to determine the direction being scrolled in
 * @param {number} currentIndex
 * @param {number} prevIndex
 * @returns
 */
const getScrollDir = (currentIndex, prevIndex) => {
  if (currentIndex > prevIndex) {
    return 'down';
  }
  return 'up';
};

/**
 * Determines the direction that scrolling is taking place in to set the scroll type
 * @param {number} currentIndex
 * @param {number} prevIndex
 * @param {function} setter
 */
const setScrollForDir = (currentIndex, prevIndex, setter) => {
  if (getScrollDir(currentIndex, prevIndex) == 'down') {
    setter('edge');
  } else if (getScrollDir(currentIndex, prevIndex) == 'up') {
    setter('auto');
  }
};

/**
 * A selector component that allows a number of options (Option for more) to be passed in, handling the scrolling
 * through options, toggling up and down arrows based on whether there are more options to scroll through. For the selector
 * to perform its needed function it assumes all options have the same height
 *
 * NB: There is a known bug where when you scroll back up, the first item is never returned to the page. Solid devs are looking at this
 * bug
 * @param {object} props - props allowing custom selector component to be defined
 * - props.viewableOptions: the number of options to show in viewport before options need to be scrolled
 * @returns selector component
 */
const Selector = (props) => {
  let options;
  const [getSelectedSignal, setSelectedSignal] = createSignal(0);
  const [getBottomShadowAlpha, setBottomShadowAlpha] = createSignal(0);
  const [getTopShadowAlpha, setTopShadowAlpha] = createSignal(0);

  const childrenMemo = children(() => props.children);

  const viewableOptions = props.viewableOptions || childrenMemo().length;

  const scrollingNeeded = viewableOptions != childrenMemo().length;

  const [getScrollSignal, setScrollSignal] = createSignal(
    scrollingNeeded ? 'auto' : 'none',
  );

  // assumes options all have the same height
  const ViewPortStyle = {
    height:
      (childrenMemo()[0]?.height + ColumnStyle.gap) * viewableOptions -
      ColumnStyle.gap,
    clipping: true,
  };

  const scrollIndex = Math.round(props.viewableOptions / 2);
  const scrollTransitionIndex =
    childrenMemo().length -
    Math.round(viewableOptions / 2) -
    (viewableOptions % 2 == 0 ? 1 : 0);

  const showDownArrow = createMemo(() => {
    return !(getSelectedSignal() >= scrollTransitionIndex) && scrollingNeeded;
  });

  // toggles the shadow overlayed at top of column
  createEffect(() => {
    if (showDownArrow() && viewableOptions > 2) {
      setBottomShadowAlpha(1);
    } else {
      setBottomShadowAlpha(0);
    }
  });

  const showUpArrow = createMemo(() => {
    const selected = getSelectedSignal();
    return scrollIndex <= selected && scrollingNeeded;
  });

  // toggles the shadow overlayed at the bottom of column
  createEffect(() => {
    if (showUpArrow() && viewableOptions > 2) {
      setTopShadowAlpha(1);
    } else {
      setTopShadowAlpha(0);
    }
  });

  // toggles scroll type between auto and edge
  createEffect((prevSelected) => {
    const shouldTransitionScroll = getSelectedSignal() == scrollTransitionIndex;
    if (shouldTransitionScroll && scrollingNeeded) {
      setScrollForDir(getSelectedSignal(), prevSelected, setScrollSignal);
    }
    return getSelectedSignal();
  }, getSelectedSignal());

  return (
    <View
      {...props}
      forwardFocus={() => options.setFocus()}
      style={styles.ColumnContainerStyle}
    >
      <Show
        when={showUpArrow()}
        fallback={() => {
          if (childrenMemo().length > props.viewableOptions) {
            // placeholder to prevent resize of container when arrow shows
            return <View style={ArrowImageStyle} />;
          }
        }}
      >
        <View style={[styles.RowContainerStyle, ArrowContainerStyle]}>
          <View
            src='/assets/icons/arrows/up-arrow-icon.png'
            style={ArrowImageStyle}
          />
        </View>
      </Show>
      <View style={ViewPortStyle}>
        <View style={TopShadowStyle} alpha={getTopShadowAlpha()} />
        <Column
          style={ColumnStyle}
          ref={options}
          onSelectedChanged={(elm, active, selectedIndex) => {
            setSelectedSignal(selectedIndex);
          }}
          scroll={getScrollSignal()}
          scrollIndex={scrollIndex}
        >
          {childrenMemo()}
        </Column>
        <View
          style={BottomShadowStyle}
          y={ViewPortStyle.height}
          alpha={getBottomShadowAlpha()}
        />
      </View>
      <Show
        when={showDownArrow()}
        fallback={() => {
          // placeholder to prevent resize of container when arrow shows
          if (childrenMemo().length > props.viewableOptions) {
            return <View style={ArrowImageStyle} />;
          }
        }}
      >
        <View style={[styles.RowContainerStyle, ArrowContainerStyle]}>
          <View
            src='/assets/icons/arrows/down-arrow-icon.png'
            style={ArrowImageStyle}
          />
        </View>
      </Show>
    </View>
  );
};

export default Selector;
