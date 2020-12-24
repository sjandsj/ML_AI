import { getBaseUrl } from '../config/appConfig';

// Authentication
export const loginUserUrl = `${getBaseUrl()}/api/v1/users/sign_in`;
export const registerUserUrl = `${getBaseUrl()}/api/v1/users`;
export const userLogoutUrl = `${getBaseUrl()}/api/v1/users/sign_out`;
export const googleLoginUrl = accessToken => `${getBaseUrl()}/api/v1/auth/google_oauth2_access_token/callback?access_token=${accessToken}`;
export const facebookLoginUrl = accessToken => `${getBaseUrl()}/api/v1/auth/facebook_access_token/callback?access_token=${accessToken}`;
export const resetPassword = `${getBaseUrl()}/api/v1/users/passwords`;
export const resetPasswordLink = email => `${getBaseUrl()}/api/v1/users/passwords/new?email=${email}`;

// Web Pages
export const getPrivacyPolicyUrl = `${getBaseUrl()}/api/v1/pages/privacy_policy`;
export const getTermOfUseUrl = `${getBaseUrl()}/api/v1/pages/terms`;
export const getRulesUrl = `${getBaseUrl()}/api/v1/pages/rules`;

// Profile
export const getProfileUrl = `${getBaseUrl()}/api/v1/users/preferences`;
export const uploadKycImagesUrl = `${getBaseUrl()}/api/v1/users/preferences/upload_kyc`;
export const updateProfileUrl = `${getBaseUrl()}/api/v1/users/preferences`;
// Dashboard
export const getSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const getMarketsForMatchUrl = matchID => `${getBaseUrl()}/api/v1/matches/${matchID}/odds_change`;
export const getSportsHavingTournamentUrl = id => `${getBaseUrl()}/api/v1/sports/${id}`;
export const getSportsHavingTournamentTodayUrl = id => `${getBaseUrl()}/api/v1/sports/${id}?scope=today`;
export const getSportsHavingTournamentInPlayUrl = (id, scope) => `${getBaseUrl()}/api/v1/sports/${id}?scope=${scope}`;
export const getCountryUrl = continent => `${getBaseUrl()}/api/v1/countries?continent=${continent}`;
export const getTournamentsUrl = () => `${getBaseUrl()}/api/v1/tournaments`;
export const getMatchesUrl = tournamentId => `${getBaseUrl()}/api/v1/tournaments/${tournamentId}/matches/`;
export const getMatchMarketsUrl = matchID => `${getBaseUrl()}/api/v1/matches/${matchID}/markets/odds_data`;
export const getSelectedMatchTeamUrl = match_id => `${getBaseUrl()}/api/v1/matches/match_id=${match_id}/teams`;
export const getSelectedMarketFiltersUrl = market_id => `${getBaseUrl()}/api/v1/matches/${market_id}/markets/filters`;

export const placeBetslipsUrl = () => `${getBaseUrl()}/api/v1/bets`;
export const getMyBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?combo=${false}&bet_type=${'all'}&page=${page}&per_page=${perPage}&scope=${''}`;
export const getSingleBetsUrl = (page, perPage, scope) => `${getBaseUrl()}/api/v1/bets?page=${page}&per_page=${perPage}&scope=${scope}`;
export const getPendingBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?page=${page}&per_page=${perPage}&scope=${'pending'}`;
export const getPendingComboBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?combo=${true}&bet_type=${''}&page=${page}&per_page=${perPage}&scope=${'pending'}`;
export const getCashoutComboBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?combo=${true}&bet_type=${''}&page=${page}&per_page=${perPage}&scope=${'cashed_out'}`;
export const getResolvedBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?scope=resolved&page=${page}&per_page=${perPage}`;
export const getResolvedComboBetsUrl = (page, perPage) => `${getBaseUrl()}/api/v1/bets?combo=${true}&bet_type=${''}&page=${page}&per_page=${perPage}&scope=resolved`;

export const postCashoutUrl = `${getBaseUrl()}/api/v1/cashout`;
export const getCashoutStatusUrl = `${getBaseUrl()}/api/v1/cashout/status`;
export const getBetslipsUrl = (scope, continent, country, tournament_id) => `${getBaseUrl()}/api/v1/bets?scope=${scope}&country=${country}&continent=${continent}&tournament_id=${tournament_id}`;
export const getAccoundsFunds = `${getBaseUrl()}/api/v1/wallets`;
export const fetchLeaderboardUrl = (interval, period) => `${getBaseUrl()}/api/v1/leaderboards/world?interval=${interval}&period=${period}`;
export const fetchLeaderboardMatchUrl = match_id => `${getBaseUrl()}/api/v1/leaderboards/match?match_id=${match_id}`;
export const profileOptionDetailUrl = `${getBaseUrl()}/api/v1/preferences`;
export const occupationsUrl = `${getBaseUrl()}/api/v1/occupations`;
export const topicsUrl = `${getBaseUrl()}/api/v1/topics`;
export const getCityUrl = country => `${getBaseUrl()}/api/v1/countries/${country}/cities`;

export const getReplayHoldBetsUrl = `${getBaseUrl()}/api/v1/hold/confirm`;
export const deleteHoldBetsUrl = `${getBaseUrl()}/api/v1/hold/batch_delete`;
export const holdBetslipsUrl = `${getBaseUrl()}/api/v1/hold`;
export const getCurrentOddsUrl = id => `${getBaseUrl()}/api/v1/hold/current_odds?id=${id}`;
export const getChartsDataUrl = (matchId, marketId, marketIdentifier) => `${getBaseUrl()}/api/v1/matches/${matchId}/odds_summary?market_id=${marketId}&identifier=${marketIdentifier}`;

// accumlator
export const fetchAccumlatorListUrl = (continent, country, tournament_id) => `${getBaseUrl()}/api/v1/accumulator_bets?scope=hold&country=${country}&continent=${continent}&tournament_id=${tournament_id}`;
export const pendingFetchAccumlatorListUrl = (continent, country, tournament_id) => `${getBaseUrl()}/api/v1/accumulator_bets?scope=pending&country=${country}&continent=${continent}&tournament_id=${tournament_id}`;
export const resolvedAccumlatorListUrl = (continent, country, tournament_id) => `${getBaseUrl()}/api/v1/accumulator_bets?scope=resolved&country=${country}&continent=${continent}&tournament_id=${tournament_id}`;
export const deleteAllAccumlatorsUrl = `${getBaseUrl()}/api/v1/accumulator_bets/batch_delete`;
export const addAccumlatorBetsUrl = `${getBaseUrl()}/api/v1/hold`;
export const createNewAccumlatorBetsUrl = `${getBaseUrl()}/api/v1/accumulator_bets`;
export const deleteAccumlatorBetsUrl = `${getBaseUrl()}/api/v1/accumulator_bets/delete_bets`;
export const confirmAccumlatorBetsUrl = `${getBaseUrl()}/api/v1/accumulator_bets/confirm`;
export const accumulatorCashoutUrl = `${getBaseUrl()}/api/v1/accumulator_bets/cashout`;

// Responsible Gambling
export const getUserLimitUrl = `${getBaseUrl()}/api/v1/users/limits`;
export const getSettingsUrl = `${getBaseUrl()}/api/v1/settings`;

// Casino
export const getCasinoUrl =
  query => `${getBaseUrl()}/api/v1/casino?${query}`;
export const getCasinoGameSessionUrl = uuid => `${getBaseUrl()}/api/v1/casino/${uuid}/init_game_session`;

// List of countrries, tournaments, matches, markets
export const getAllSportsUrl = `${getBaseUrl()}/api/v1/sports`;
export const countryListUrl = sportsId => `${getBaseUrl()}/api/v1/countries?sport_id=${sportsId}`;
export const getTournamentsInCountryUrl = (countryId, sportsId) => `${getBaseUrl()}/api/v1/tournaments?country_id=${countryId}&sport_id=${sportsId}`;
export const getTournamentMatchesUrl = ( page, perPage, tournamentId, countryId, marketId ) => `${getBaseUrl()}/api/v1/tournaments/${tournamentId}/matches?scope=all&country=${countryId}&market_id=${marketId}&page=${page}&per_page=${perPage}`;
export const allMarketsUrl = `${getBaseUrl()}/api/v1/markets`;

// live betting
export const getLiveMatchesUrl = `${getBaseUrl()}/api/v1/matches/live_matches`;
export const getFavoritesUrl = `${getBaseUrl()}/api/v1/matches/favourite_matches`;
export const addToFavoritesUrl = matchId => `${getBaseUrl()}/api/v1/matches/${matchId}/add_favourite?is_default=false`;
export const removeFromFavoritesUrl = matchId => `${getBaseUrl()}/api/v1/matches/${matchId}/remove_favourite?is_default=false`;
// today or highlihts
export const getTodayUrl = todayOrHighlight => `${getBaseUrl()}/api/v1/matches?scope=${todayOrHighlight}`;

// transfer funds
export const getUserDetailsUrl = username => `${getBaseUrl()}/api/v1/fund_transfers/get_user_details?username=${username}`;
export const postTransferAmountUrl = (userId, amount) => `${getBaseUrl()}/api/v1/fund_transfers?id=${userId}&amount=${amount}`;
export const getTransactionHistoryUrl = (category, min_date, max_date) => `${getBaseUrl()}/api/v1/transaction_history?category=${category}&min_date=${min_date}&max_date=${max_date}`;
