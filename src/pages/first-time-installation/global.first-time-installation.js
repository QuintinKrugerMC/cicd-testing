import { createSignal } from 'solid-js';

const [getNextInstallationStepSignal, setNextInstallationStepSignal] =
  createSignal();
const [getShowLogoSignal, setShowLogoSignal] = createSignal();

export {
  getNextInstallationStepSignal,
  setNextInstallationStepSignal,
  getShowLogoSignal,
  setShowLogoSignal,
};
