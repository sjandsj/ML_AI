import { createSelector } from 'reselect';
import _ from 'lodash';

const providers = state => state.casino.providersFilters;
const liveProviders = state => state.liveCasino.providersFilters;
const virtualGamesProviders = state => state.virtualGamesReducer.providersFilters;

export const getProviders = createSelector(
  [providers],
  (providerObj) => {
    const providersList = _.keys(providerObj).filter(key => providerObj[key]);
    return providerObj;
  },
);

export const getLiveProviders = createSelector(
  [liveProviders],
  (liveProviderObj) => {
    const liveProvidersList = _.keys(liveProviderObj).filter(key => liveProviderObj[key]);
    return liveProviderObj;
  },
);

export const getVirtualGamesProviders = createSelector(
  [virtualGamesProviders],
  (virtualGamesProviderObj) => {
    const virtualGamesList = _.keys(virtualGamesProviderObj).filter(key => virtualGamesProviderObj[key]);
    return virtualGamesProviderObj;
  },
);
