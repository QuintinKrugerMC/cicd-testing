import { createSignal } from 'solid-js';

const [getAvailableConnectionsSignal, setAvailableConnectionsSignal] =
  createSignal();
const [getWifiSelectedSignal, setWifiSelectedSignal] = createSignal();

const [getWifiPasswordSignal, setWifiPasswordSignal] = createSignal();

export {
  getAvailableConnectionsSignal,
  setAvailableConnectionsSignal,
  getWifiSelectedSignal,
  setWifiSelectedSignal,
  getWifiPasswordSignal,
  setWifiPasswordSignal,
};
