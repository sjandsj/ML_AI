
import { images } from '../assets/images';
import { sideMenuLocalizeStrings } from '../localization/sideMenuLocalizeStrings';
import { SIDEMENU_ITEMS } from './enum';

const Default = [
  // {
  //   id: SIDEMENU_ITEMS.FRIENDS,
  //   name: sideMenuLocalizeStrings.friends,
  //   icon: images.drawerIconFriends,
  // },
  {
    id: SIDEMENU_ITEMS.PENDING_PLAYS_AND_PARLAYS,
    name: sideMenuLocalizeStrings.pendingPlayParlays,
    icon: images.drawerIconPendingPlayParlay,
  },
  // {
  //   id: SIDEMENU_ITEMS.PLAY_ON_HOLD,
  //   name: sideMenuLocalizeStrings.parlayOnHold,
  //   icon: images.drawerIconOnHold,
  // },
  {
    id: SIDEMENU_ITEMS.RESOLVED_PLAY,
    name: sideMenuLocalizeStrings.resolvedPlays,
    icon: images.drawerIconOnHold,
  },
  // {
  //   id: SIDEMENU_ITEMS.prizes,
  //   name: sideMenuLocalizeStrings.prizes,
  //   icon: images.drawerIconPrizes,
  // },
  // {
  //   id: SIDEMENU_ITEMS.HISTORY,
  //   name: sideMenuLocalizeStrings.history,
  //   icon: images.drawerIconHistory,
  // },
];

// const social = [
//   {
//     id: SIDEMENU_ITEMS.INDUSTRY_NEWS,
//     name: sideMenuLocalizeStrings.industryNews,
//     icon: images.drawerIconNews,
//   },
//   {
//     id: SIDEMENU_ITEMS.ONLINE_TALK_SHOWS,
//     name: sideMenuLocalizeStrings.onlineTalkShows,
//     icon: images.drawerIconOnline,
//   },
//   {
//     id: SIDEMENU_ITEMS.ONLINE_VIDEO_TALK_SHOW,
//     name: sideMenuLocalizeStrings.onlineVideoTalkShow,
//     icon: images.drawerIconTalk,
//   },
//   {
//     id: SIDEMENU_ITEMS.ONLINE_VIDEO_COMPETITION,
//     name: sideMenuLocalizeStrings.onlineVideoCompetitions,
//     icon: images.drawerIconVideo,
//   },
// ];

const help = [
  {
    id: SIDEMENU_ITEMS.RULES,
    name: sideMenuLocalizeStrings.rules,
    icon: images.drawerIconRules,
  },
  {
    id: SIDEMENU_ITEMS.HOW_TO_PLAY,
    name: sideMenuLocalizeStrings.howToPlay,
    icon: images.drawerIconHowToPlay,
  },
  {
    id: SIDEMENU_ITEMS.HOW_TO_COMPETE,
    name: sideMenuLocalizeStrings.howToCompete,
    icon: images.drawerIconCompete,
  },
  {
    id: SIDEMENU_ITEMS.HOW_TO_WIN,
    name: sideMenuLocalizeStrings.howToWin,
    icon: images.drawerIconWin,
  },
  {
    id: SIDEMENU_ITEMS.FAQ,
    name: sideMenuLocalizeStrings.faq,
    icon: images.drawerIconfaq,
  },
  {
    id: SIDEMENU_ITEMS.SUPPORT,
    name: sideMenuLocalizeStrings.support,
    icon: images.drawerIconSupport,
  },
];

// const settings = [
//   {
//     id: SIDEMENU_ITEMS.ACCOUNT_SETTINGS,
//     name: sideMenuLocalizeStrings.accountSettings,
//     icon: images.drawerIconAccount,
//   },
//   {
//     id: SIDEMENU_ITEMS.CHAT_SETTINGS,
//     name: sideMenuLocalizeStrings.chatSettings,
//     icon: images.drawerIconChat,
//   },
//   {
//     id: SIDEMENU_ITEMS.VIDEO_SETTING,
//     name: sideMenuLocalizeStrings.videoSetting,
//     icon: images.drawerIconVideoSetting,
//   },
//   {
//     id: SIDEMENU_ITEMS.SOUND_SETTING,
//     name: sideMenuLocalizeStrings.soundSetting,
//     icon: images.drawerIconSound,
//   },
// ];

const more = [
  // {
  //   id: SIDEMENU_ITEMS.CODE_OF_CONDUCT,
  //   name: sideMenuLocalizeStrings.codeOfConduct,
  //   icon: images.drawerIconCodeConduct,
  // },
  // {
  //   id: SIDEMENU_ITEMS.EULA,
  //   name: sideMenuLocalizeStrings.eULA,
  //   icon: images.drawerIconeula,
  // },
  // {
  //   id: SIDEMENU_ITEMS.TNC,
  //   name: sideMenuLocalizeStrings.termsAndConditions,
  //   icon: images.drawerIconTermConditions,
  // },
  // {
  //   id: SIDEMENU_ITEMS.PRIVACY_POLICY,
  //   name: sideMenuLocalizeStrings.privacyPolicy,
  //   icon: images.drawerIconPrivacyPloicy,
  // },
  // {
  //   id: SIDEMENU_ITEMS.ABOUT_US,
  //   name: sideMenuLocalizeStrings.aboutUs,
  //   icon: images.drawerIconAboutUs,
  // },
  // {
  //   id: SIDEMENU_ITEMS.RATE_US,
  //   name: sideMenuLocalizeStrings.rateUs,
  //   icon: images.drawerIconRateUs,
  // },
  // {
  //   id: SIDEMENU_ITEMS.EMPLOYMENT,
  //   name: sideMenuLocalizeStrings.employment,
  //   icon: images.drawerIconEmployment,
  // },
  // {
  //   id: SIDEMENU_ITEMS.CREDITS,
  //   name: sideMenuLocalizeStrings.credits,
  //   icon: images.drawerIconCredits,
  // },
  {
    id: SIDEMENU_ITEMS.LOGOUT,
    name: sideMenuLocalizeStrings.logOut,
    icon: images.drawerIconLogout,
  },
];

export const sectionListData = [
  { title: '', data: Default },
  // { title: sideMenuLocalizeStrings.newsAndSocial, data: social },
  { title: sideMenuLocalizeStrings.helpAndSupport, data: help },
  // { title: sideMenuLocalizeStrings.settingsSectionTitle, data: settings },
  { title: sideMenuLocalizeStrings.moreSectionTitle, data: more },
];
