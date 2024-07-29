/**
 * API call to determine whether the decoder is connected to the internet
 */
const establishInternetConnection = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(true);
    }, 5000); // simulate time passing while API call is made
  });
};

/**
 * API call to get the download speed in bits using JSONRPC
 */
const getDownloadSpeedBits = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(65000);
    }, 5000); // simulate time passing while API call is made
  });
};

/**
 * API call to check connection to router, either via ethernet or wifi
 */
const connectToRouter = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 5000); // simulate time passing while API call is made
  });
};

export { establishInternetConnection, connectToRouter, getDownloadSpeedBits };
