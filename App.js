import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

// Register Screens
// Takes two required arguments
// Unique identifier of screen (below is normal syntax)
// Function that needs to execute to load desired screen

// Other args redux related

const store = configureStore();

Navigation.registerComponent(
  'LearningRN.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'LearningRN.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'LearningRN.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'LearningRN.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent('LearningRN.SideDrawerScreen', () => SideDrawer);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'LearningRN.AuthScreen',
    title: 'Login'
  }
});
