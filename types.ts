// 共享类型定义
export interface SystemInfo {
  cpuUsage: number;
  memoryUsage: number;
  totalMem: number;
  freeMem: number;
  usedMem: number;
  platform: string;
  hostname: string;
  uptime: number;
}

export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: Date;
}

// 主题相关类型
export interface Theme {
  // 主要颜色
  primary: string;       // 主要显示颜色
  primaryDark: string;   // 主要颜色的暗色版本
  accent: string;        // 强调色
  background: string;    // 背景色
  border: string;        // 边框色
  
  // 文本颜色
  textPrimary: string;   // 主要文本颜色
  textSecondary: string; // 次要文本颜色
  
  // 特效参数
  scanlineOpacity: number; // 扫描线不透明度
  crtEffect: boolean;      // CRT效果开关
}

// 音效类型
export enum SoundType {
  CLICK = 'click',
  MODULE_SWITCH = 'moduleSwitch',
  CONFIRM = 'confirm',
  ERROR = 'error'
}

// 模块类型
export enum ModuleType {
  STATS = 'stats',
  APPS = 'apps',
  FILES = 'files',
  DATA = 'data',
  MEDIA = 'media',
  CONFIG = 'config'
}

// 应用分类
export interface AppCategory {
  id: string;
  name: string;
}

// 应用信息
export interface AppInfo {
  name: string;
  originalName: string;
  path: string;
  icon: string;
  category: string;
}

// 快速访问文件夹
export interface QuickAccessFolder {
  name: string;
  path: string;
}
