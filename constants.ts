// 常量定义
export const THEMES = {
  GREEN: 'green',
  AMBER: 'amber',
  WHITE: 'white'
};

// 预定义主题
export const THEME_DEFINITIONS = {
  [THEMES.GREEN]: {
    primary: '#30FF50',
    primaryDark: '#18A830',
    accent: '#18A830',
    background: '#1A1A1A',
    border: '#252525',
    textPrimary: '#30FF50',
    textSecondary: '#18A830',
    scanlineOpacity: 0.1,
    crtEffect: true
  },
  [THEMES.AMBER]: {
    primary: '#FFB000',
    primaryDark: '#D08000',
    accent: '#D08000',
    background: '#1A1A1A',
    border: '#252525',
    textPrimary: '#FFB000',
    textSecondary: '#D08000',
    scanlineOpacity: 0.1,
    crtEffect: true
  },
  [THEMES.WHITE]: {
    primary: '#F0F0F0',
    primaryDark: '#A0A0A0',
    accent: '#A0A0A0',
    background: '#1A1A1A',
    border: '#252525',
    textPrimary: '#F0F0F0',
    textSecondary: '#A0A0A0',
    scanlineOpacity: 0.1,
    crtEffect: true
  }
};

// 默认应用分类
export const DEFAULT_APP_CATEGORIES = [
  {
    id: 'communications',
    name: 'COMMUNICATIONS'
  },
  {
    id: 'data_processing',
    name: 'DATA PROCESSING'
  },
  {
    id: 'entertainment',
    name: 'ENTERTAINMENT TERMINAL'
  },
  {
    id: 'media',
    name: 'AUDIO/VISUAL ARCHIVES'
  },
  {
    id: 'utilities',
    name: 'UTILITIES & TOOLS'
  },
  {
    id: 'recent',
    name: 'RECENTLY ACCESSED'
  }
];

// 默认快速访问文件夹
export const DEFAULT_QUICK_ACCESS_FOLDERS = [
  {
    name: 'DOCUMENTS',
    path: 'C:\\Users\\[USERNAME]\\Documents'
  },
  {
    name: 'DOWNLOADS',
    path: 'C:\\Users\\[USERNAME]\\Downloads'
  },
  {
    name: 'PICTURES',
    path: 'C:\\Users\\[USERNAME]\\Pictures'
  },
  {
    name: 'VAULT_MUSIC',
    path: 'C:\\Users\\[USERNAME]\\Music'
  },
  {
    name: 'HOLOTAPES',
    path: 'C:\\Users\\[USERNAME]\\Videos'
  }
];

// 模块标签
export const MODULE_TABS = [
  {
    id: 'stats',
    name: 'STATS'
  },
  {
    id: 'apps',
    name: 'APPS'
  },
  {
    id: 'files',
    name: 'FILES'
  },
  {
    id: 'data',
    name: 'DATA'
  },
  {
    id: 'media',
    name: 'MEDIA'
  },
  {
    id: 'config',
    name: 'CONFIG'
  }
];
