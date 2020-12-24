import { NavigationActions, StackActions } from 'react-navigation';

export default class Navigation {
    static singletonInstance = null;
    appNavigation = null;

    static sharedInstance() {
      if (Navigation.singletonInstance == null) {
        Navigation.singletonInstance = new Navigation();
      }
      return this.singletonInstance;
    }

    setAppNavigation(navigation) {
      this.appNavigation = navigation;
    }

    resetRouteName(routeName, params) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName, params }),
        ],
        key: null,
      });
      this.appNavigation.dispatch(resetAction);
    }

    popScreen() {
      this.appNavigation.pop();
    }

    pushToScreen(routeName, params) {
      this.appNavigation.navigate(routeName, params);
    }

    openDrawer() {
      this.appNavigation.openDrawer();
    }
}
