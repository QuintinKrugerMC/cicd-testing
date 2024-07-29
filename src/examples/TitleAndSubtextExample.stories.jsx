import TitleAndSubtext from '../components/TitleAndSubtext';

export const TitleAndSubtextExample = () => {
  return (
    <>
      <TitleAndSubtext
        y={100}
        title='Title 1'
        subtext='subtext to acompany title 1'
      />
      <TitleAndSubtext
        y={300}
        title='Title 2'
        subtext='subtext to acompany title 2'
      />
      <TitleAndSubtext
        y={600}
        title='Title 3'
        subtext='subtext to acompany title 3. This subtext is longer and we expect it to wrap. And surely it does ! Amazing !'
      />
    </>
  );
};

export default {
  title: 'TitleAndSubtext',
  component: TitleAndSubtextExample,
};
