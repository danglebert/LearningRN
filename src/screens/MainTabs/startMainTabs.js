import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = async () => {
  const findIcon = await Icon.getImageSource('md-map', 30);
  const shareIcon = await Icon.getImageSource('ios-share-alt', 30);
  const drawerIcon = await Icon.getImageSource('ios-menu', 30);

  await Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'LearningRN.FindPlaceScreen',
        label: 'Find Place',
        title: 'Find Place',
        icon: findIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: drawerIcon,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      },
      {
        screen: 'LearningRN.SharePlaceScreen',
        label: 'Share Place',
        title: 'Share Place',
        icon: shareIcon,
        navigatorButtons: {
          leftButtons: [
            {
              icon: drawerIcon,
              title: 'Menu',
              id: 'sideDrawerToggle'
            }
          ]
        }
      }
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: 'orange'
    },
    drawer: {
      left: {
        screen: 'LearningRN.SideDrawerScreen'
      }
    }
  });
};

export default startTabs;
