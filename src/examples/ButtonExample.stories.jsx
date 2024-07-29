import Button from '../components/Button';
import { test } from '../api/testApi';

import ThunderJS from 'ThunderJS'; //'thunderJS' which we install from above comamnd

const config = {
  host: '192.168.206.6', // IP Address of your decoder on which Thunder Server is running
  port: '5001', // Port which on which Thunder JS connect with Thunder Server
};

const thunderJS = ThunderJS(config);

const ButtonExample = (args) => {
  return (
    <Button
      autofocus
      {...args}
      onEnter={() => {
        console.log('Lets see what happens...');
        thunderJS.mathprovider.Sum({ a: 4, b: 5 }).then((result) => {
          console.log('Sum result ', result);
        });
        thunderJS.debugprovider
          .GetAllProviderFilenames()
          // thunderJS.mathprovider.Sum({a:4,b:5})
          .then((result) => {
            console.log('Result is : ', result);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    />
  );
};

export default {
  title: 'Button',
  component: ButtonExample,
};

export const Default = {
  args: {
    width: 350,
    height: 72,
    text: 'Hello I am a Button',
  },
  argTypes: {
    states: {
      control: { type: 'radio' },
      options: ['focus', 'unfocused', 'disabled'],
      description: 'Sets the visual mode for the component',
      table: {
        defaultValue: { summary: 'focus' },
      },
    },
  },
};
