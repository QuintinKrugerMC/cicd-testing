import ThunderJS from 'ThunderJS'; //'thunderJS' which we install from above comamnd

const config = {
  host: '192.168.193.248', // IP Address of your decoder on which Thunder Server is running
  port: '5001', // Port which on which Thunder JS connect with Thunder Server
};

const thunderJS = ThunderJS(config);

const params = {
  a: 10,
  b: 5,
};

export const test = () => {
  return thunderJS.mathprovider.Sum({ a: 4, b: 5 });
  //   return thunderJS.call('mathprovider', 'Sum', params);
};

// thunderJS.debugprovider
//   .GetAllProviderFilenames()
//   // thunderJS.mathprovider.Sum({a:4,b:5})
//   .then((result) => {
//     console.log('Result is : ', result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
