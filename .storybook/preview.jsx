import { createRenderer, Config } from '@lightningtv/solid';
import { themes } from '@storybook/theming';
import { useFocusManager } from '@lightningtv/solid/primitives';
import { loadFonts } from '../src/loadFonts';

Config.rendererOptions = {
  appWidth: 1920,
  appHeight: 1080,
  deviceLogicalPixelRatio: 2 / 3,
  enableInspector: true,
};

Config.fontSettings.fontFamily = 'Poppins';
Config.fontSettings.color = 0xffffffff;

let dispose;

const preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
    },
    docs: {
      theme: themes.dark,
      story: {
        inline: false,
        iframeHeight: '360px',
      },
      source: {
        type: 'code',
        language: 'jsx',
      },
    },
  },
  decorators: [
    (Story) => {
      const solidRoot = document.createElement('div');
      // teardown previous render (cleans up keyhandling)
      dispose && dispose();
      const { renderer, render } = createRenderer(undefined, solidRoot);
      loadFonts(renderer.stage);

      dispose = render(() => {
        useFocusManager();
        return <Story />;
      });

      return solidRoot;
    },
  ],
};

export default preview;
