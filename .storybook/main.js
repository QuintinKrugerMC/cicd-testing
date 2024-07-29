const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
};
export default config;

// const config = {
//   stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../docs/*.mdx'],
//   addons: [
//     {
//       name: '@storybook/addon-essentials',
//       options: {
//         backgrounds: false, // disable background addon
//         outline: false, // disable outline addon
//         measure: false, // disable measure addon
//         viewport: false // disable viewport addon
//       }
//     },
//     '@storybook/addon-links',
//     '@storybook/addon-interactions'
//   ],
//   framework: {
//     name: '@storybook/html-vite',
//     options: {}
//   },
//   typescript: {
//     // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
//     reactDocgen: 'react-docgen',
//     check: false,
//   },
//   docs: {
//     autodocs: 'tag'
//   }
// };
// export default config;
