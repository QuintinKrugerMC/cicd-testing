import { createRenderer, Config } from '@lightningtv/solid';
import { HashRouter, Route } from '@solidjs/router';
import { loadFonts } from './loadFonts';
import App from './pages/App';
import HomePage from './pages/HomePage';
import FirstTimeInstallationpage from './pages/first-time-installation/FirstTimeInstallationPage';
import OnBoardingPage from './pages/first-time-installation/OnboardingPage';
import SelectLanguagePage from './pages/first-time-installation/SelectLanguagePage';
import QuickSetupPage from './pages/first-time-installation/QuickSetupPage';
import WifiSetupPage from './pages/first-time-installation/wifi-setup/WifiSetupPage';
import AvailableWifiConnectionsPage from './pages/first-time-installation/wifi-setup/AvailableWifiConnectionsPage';
import WifiPasswordCapturePage from './pages/first-time-installation/wifi-setup/WifiPasswordCapturePage';
import SearchAvailableWifiConnectionsPage from './pages/first-time-installation/wifi-setup/SearchAvailableWifiConnectionsPage';
import SelectNetworkPage from './pages/first-time-installation/SelectNetworkPage';
import SelectAudioPage from './pages/first-time-installation/SelectAudioPage';
import SelectSetupPage from './pages/first-time-installation/SelectSetupPage';
import SelectCountryPage from './pages/first-time-installation/SelectCountryPage';
import WifiConnectPage from './pages/first-time-installation/wifi-setup/WifiConnectPage';
import RouterConnectionSuccessfulPage from './pages/first-time-installation/RouterConnectionSuccessfulPage';
import InternetConnectionFailedPage from './pages/first-time-installation/InternetConnectionFailedPage';
import WifiConnectionFailedPage from './pages/first-time-installation/wifi-setup/WifiConnectionFailedPage';
import EthernetSetupPage from './pages/first-time-installation/ethernet-setup/EthernetSetupPage';
import EthernetSetupFailedPage from './pages/first-time-installation/ethernet-setup/EthernetSetupFailedPage';
import NoWifiNetworksPage from './pages/first-time-installation/wifi-setup/NoWifiNetworksPage';
import SelectDownloadPage from './pages/first-time-installation/SelectDownloadPage';
import InstallationSetupPage from './pages/first-time-installation/InstallationSetupPage';
import WpsPage from './pages/first-time-installation/wifi-setup/WpsPage';
import WpsFailurePage from './pages/first-time-installation/wifi-setup/WpsFailurePage';
import ScanningOverviewPage from './pages/first-time-installation/ScanningOverviewPage';
import ScanningFailPage from './pages/first-time-installation/ScanningFailPage';

Config.debug = false;
Config.fontSettings.fontFamily = 'Poppins';
Config.fontSettings.color = 0xffffffff;
Config.rendererOptions = {
  numImageWorkers: 2,
  // Set the resolution based on window height
  // 720p = 0.666667, 1080p = 1, 1440p = 1.5, 2160p = 2
  deviceLogicalPixelRatio: 1,
  enableInspector: true,
  // Increase to preload images coming from offscreen
  boundsMargin: 20,
};

const { renderer, render } = createRenderer();
loadFonts(renderer.stage);
render(() => (
  <HashRouter root={App}>
    <Route path={'/'} component={HomePage} />
    <Route
      path={'/first-time-installation'}
      component={FirstTimeInstallationpage}
    >
      <Route path={'/onboarding'} component={OnBoardingPage} />
      <Route path={'/language-select'} component={SelectLanguagePage} />
      <Route path={'/select-setup'} component={SelectSetupPage} />
      <Route path={'/country-select'} component={SelectCountryPage} />
      <Route path={'/network-select'} component={SelectNetworkPage} />
      <Route path='/wifi-setup' component={WifiSetupPage}>
        <Route
          path='/search-connections'
          component={SearchAvailableWifiConnectionsPage}
        />
        <Route
          path='/available-connections'
          component={AvailableWifiConnectionsPage}
        />
        <Route path={'/no-wifi-networks'} component={NoWifiNetworksPage} />
        <Route path='/password-capture' component={WifiPasswordCapturePage} />
        <Route path='/connect' component={WifiConnectPage} />
        <Route
          path={'/connection-failed'}
          component={WifiConnectionFailedPage}
        />
        <Route path={'/wps'} component={WpsPage} />
        <Route path={'/wps-failure'} component={WpsFailurePage} />
      </Route>
      <Route path={'/ethernet-setup'} component={EthernetSetupPage} />
      <Route
        path={'/ethernet-setup-failed'}
        component={EthernetSetupFailedPage}
      />
      <Route
        path={'/connection-successful'}
        component={RouterConnectionSuccessfulPage}
      />
      <Route
        path={'/internet-connection-failed'}
        component={InternetConnectionFailedPage}
      />
      <Route path={'download-select'} component={SelectDownloadPage} />
      <Route path={'/audio-select'} component={SelectAudioPage} />
      <Route path={'/installation-setup'}>
        <Route path={'/'} component={InstallationSetupPage}></Route>
        <Route path={'/quick-setup'} component={QuickSetupPage} />
      </Route>
      <Route path={'/scanning-overview'} component={ScanningOverviewPage} />
      <Route path={'/scanning-failed'} component={ScanningFailPage} />
    </Route>
  </HashRouter>
));
