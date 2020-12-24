export const InputKey = {
  email: 'email',
  password: 'password',
  userName: 'userName',
  firstName: 'firstName',
  lastName: 'lastName',
  selfieWithId: 'selfieWithId',
  govtIdProof: 'govtIdProof',
};

export const ReturnKeyType = {
  next: 'next',
  done: 'done',
};

export const KeyboardType = {
  emailAddress: 'email-address',
  decimalPad: 'decimal-pad',
  numeric: 'numeric',
};

export const playingRulesConstants = {
  TITLE: 'Terms and Policies',
};

export const userLimitConstants = {
  TITLE: 'Limits',
  TITLEBODY: '',
  SELECT: 'SELECT',
  CANCEL: 'CANCEL',
  POUNDS: 'Pounds(£)',
  MINUTES: 'Minutes',
};

export const betSlipConstants = {
  stake: 'Stake',
};

function calculateWeeks() {
  const weeks = [];
  for (let i = 1; i <= 52; i += 1) {
    weeks.push({ id: i, name: i.toString() });
  }
  return weeks;
}

function calculateDays() {
  const days = [];

  for (let i = 1; i <= 366; i += 1) {
    days.push({ id: i, name: i.toString() });
  }
  return days;
}

function calculateMonths() {
  const months = [];

  for (let i = 1; i <= 12; i += 1) {
    months.push({ id: i, name: i.toString() });
  }
  return months;
}

function calculateYears() {
  const years = [];

  for (let i = 2014; i <= 2018; i += 1) {
    years.push({ id: i, name: i.toString() });
  }
  return years;
}

const constants = {
  APP_ACCESS_TOKEN: 'APP_ACCESS_TOKEN',
  SELECT_GAME: 'SELECT_GAME',
  PLACE_BET: 'PLACE_BET',
  GET_ODDS: 'GET_ODDS',
  HOLD_BET: 'HOLD_BET',
  ACCUMULATE_BET: 'ACCUMULATE_BET',
  SHOW: 'SHOW',
  USER_DISPLAY_NAME: 'USER_DISPLAY_NAME',
  USER_ID: 'USER_ID',
  USER_PROFILE_IMAGE_URL: 'USER_PROFILE_IMAGE_URL',
  USER_LIMIT: 'USER_LIMIT',
  SELECTED: 'SELECTED',
  SELECT_YEAR: 'SELECT YEAR',
  SELECT_DAYS: 'SELECT DAYS',
  SELECT_WEEKS: 'SELECT WEEKS',
  SELECT_MONTHS: 'SELECT MONTHS',
  // SENTRY_KEY: 'https://1e939702885347a89f56d76ee3a824b5@sentry.io/1299126',

  continents: [
    {
      id: 1,
      name: 'Asia',
    },
    {
      id: 2,
      name: 'Africa',
    },
    {
      id: 3,
      name: 'Antartica',
    },
    {
      id: 4,
      name: 'Australia',
    },
    {
      id: 5,
      name: 'Europe',
    },
    {
      id: 6,
      name: 'North America',
    },
    {
      id: 7,
      name: 'South America',
    },
  ],

  continentsName: [
    { name: 'Asia' },
    { name: 'Africa' },
    { name: 'Antartica' },
    { name: 'Australia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'South America' },
  ],

  weeks: calculateWeeks(),
  days: calculateDays(),
  months: calculateMonths(),
  years: calculateYears(),
  leaderboardFilters: [
    { id: '1', name: 'Today' },
    { id: '2', name: 'Year To Date' },
    { id: '3', name: 'Last # Days' },
    { id: '4', name: 'Last # Weeks' },
    { id: '5', name: 'Last # Months' },
  ],
};

export default constants;
