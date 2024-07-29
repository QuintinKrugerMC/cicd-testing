const overviewData = [
  {
    y: 0,
    data: [
      {
        leftLabel: 'Number of TV services',
        rightLabel: '200',
        y: 540,
      },
    ],
  },
  {
    y: 70,
    data: [
      {
        leftLabel: 'Number of Radio services',
        rightLabel: '50',
        y: 570,
      },
    ],
  },
  {
    y: 140,
    data: [
      {
        leftLabel: 'Number of Data services',
        rightLabel: '2',
        y: 600,
      },
    ],
  },
  {
    y: 210,
    data: [
      {
        leftLabel: 'Total number of services',
        rightLabel: '100',
        y: 630,
      },
    ],
  },
  {
    y: 280,
    data: [
      {
        leftLabel: 'Connected to',
        rightLabel: '1159000H 30000 5/6 Home Network IS20',
        y: 660,
      },
    ],
  },
];
const scanText = {
  scanningProgress: 'Scanning in progress.',
  timeDuration: 'This could take a few minutes.',
  continue: 'Continue',
  unsuccessful: 'Satellite connection was unsuccessful.',
  line1: 'DStv signal could not be established.',
  line2:
    'Please check your installation and ensure that the LNB cable from the dish is connected properly.',
  line3:
    'Should the problem persist contact the call center for further assistance.',
  line4: 'Smartcard number:',
  line5: '1003708474',
  scanAgain: 'Scan again',
  decoderSetUp: 'Decoder set up',
};
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v.dvb_type === val ? a + 1 : a), 0);

export { overviewData, countOccurrences, scanText };
