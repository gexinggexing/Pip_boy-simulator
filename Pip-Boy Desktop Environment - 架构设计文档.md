# Pip-Boy Desktop Environment - 架构设计文档

## 1. 技术栈选择

考虑到Pip-Boy桌面环境的复杂性、视觉特效需求以及与Windows 11的集成需求，我们选择以下技术栈：

### 主要技术框架：Electron

**选择理由：**
- 跨平台能力，虽然目标是Windows 11，但保留未来扩展到其他平台的可能性
- 强大的桌面集成能力，可以访问系统API获取硬件信息（CPU、内存等）
- 使用Web技术(HTML/CSS/JavaScript)实现复杂UI效果，如CRT效果、扫描线等
- 可以使用现代前端框架提高开发效率
- 支持自定义窗口形状和透明度，适合实现Pip-Boy的复古界面风格

### 前端框架：React + TypeScript

**选择理由：**
- 组件化开发，便于模块化实现Pip-Boy的各个功能区
- TypeScript提供类型安全，减少开发错误
- 丰富的生态系统，有大量可用的UI组件和库
- 状态管理方便，适合处理复杂UI状态

### UI样式：Styled Components + SCSS

**选择理由：**
- Styled Components便于实现主题切换（绿色、琥珀色、白色）
- SCSS提供更强大的样式编写能力
- 可以方便地实现复杂的动画效果

### 系统集成：Node.js原生模块 + Windows API

**选择理由：**
- 通过Node.js原生模块访问系统信息
- 使用Windows API实现与Windows 11特定功能的集成
- 可以实现文件系统访问、应用程序启动等功能

### 构建工具：Electron Forge

**选择理由：**
- 简化Electron应用的打包和分发过程
- 提供开发时热重载功能
- 支持创建Windows安装程序

## 2. 整体架构设计

### 2.1 应用层次结构

```
Pip-Boy Desktop Environment
├── 主进程 (Main Process)
│   ├── 系统集成服务
│   │   ├── 文件系统访问
│   │   ├── 应用程序启动
│   │   ├── 系统信息监控
│   │   └── 通知系统集成
│   ├── IPC通信管理
│   └── 窗口管理
└── 渲染进程 (Renderer Process)
    ├── UI框架
    │   ├── 主题管理
    │   ├── 动画系统
    │   └── 音效系统
    └── 功能模块
        ├── STATS模块
        ├── APPS模块
        ├── FILES模块
        ├── DATA模块
        ├── MEDIA模块
        └── CONFIG模块
```

### 2.2 数据流设计

采用单向数据流架构，结合React Context API和自定义hooks管理状态：

1. **全局状态管理**：
   - 使用React Context API管理全局状态
   - 主题设置、用户偏好等全局配置
   - 系统信息（CPU、内存等）的实时数据

2. **模块内状态管理**：
   - 各功能模块使用自己的状态管理
   - 使用自定义hooks封装业务逻辑

3. **IPC通信**：
   - 渲染进程通过IPC与主进程通信
   - 主进程处理系统级操作并返回结果

### 2.3 模块划分

#### 2.3.1 主进程模块

1. **系统集成服务**
   - 负责与操作系统交互
   - 获取系统信息（CPU、内存、存储等）
   - 文件系统操作
   - 应用程序启动
   - 系统通知集成

2. **IPC通信管理**
   - 处理渲染进程的请求
   - 发送系统事件到渲染进程

3. **窗口管理**
   - 创建和管理应用窗口
   - 处理窗口事件（最小化、最大化、关闭等）

#### 2.3.2 渲染进程模块

1. **UI框架**
   - **主题管理**：处理颜色主题切换（绿色、琥珀色、白色）
   - **动画系统**：实现扫描线、CRT效果、模块切换动画等
   - **音效系统**：管理UI交互音效

2. **功能模块**
   - **STATS模块**：显示系统信息和天气数据
   - **APPS模块**：应用程序启动器
   - **FILES模块**：文件浏览器
   - **DATA模块**：笔记和系统日志
   - **MEDIA模块**：媒体播放器
   - **CONFIG模块**：设置和配置

## 3. 详细模块设计

### 3.1 STATS模块

**功能**：
- 显示系统"生命体征"（CPU、内存、存储、网络、电池）
- 显示时间和日期
- 显示天气信息

**数据源**：
- 系统信息：通过Node.js的`os`模块和自定义原生模块获取
- 天气信息：通过公共天气API获取

**组件结构**：
```
STATS
├── SystemVitals
│   ├── CPUMonitor
│   ├── MemoryMonitor
│   ├── StorageMonitor
│   ├── NetworkMonitor
│   └── BatteryMonitor
├── TimeDisplay
└── WeatherDisplay
```

### 3.2 APPS模块

**功能**：
- 显示已安装应用程序的分类列表
- 启动选定的应用程序
- 自定义应用程序分类和显示名称

**数据源**：
- Windows应用程序列表：通过Windows API获取
- 自定义配置：存储在本地配置文件中

**组件结构**：
```
APPS
├── CategoryList
├── AppList
└── AppLauncher
```

### 3.3 FILES模块

**功能**：
- 浏览文件系统
- 显示文件和文件夹
- 基本文件操作（打开、复制、移动等）

**数据源**：
- 文件系统：通过Node.js的`fs`模块访问

**组件结构**：
```
FILES
├── QuickAccess
├── DirectoryTree
├── FileList
└── FileOperations
```

### 3.4 DATA模块

**功能**：
- 简单的笔记编辑器
- 任务列表管理
- 系统日志查看器

**数据源**：
- 笔记和任务：存储在本地文件中
- 系统日志：从Windows事件日志获取

**组件结构**：
```
DATA
├── NotesEditor
├── TaskList
└── SystemLogViewer
```

### 3.5 MEDIA模块

**功能**：
- 音乐播放器
- 视频播放器
- 媒体库浏览

**数据源**：
- 本地媒体文件：通过文件系统访问

**组件结构**：
```
MEDIA
├── MusicPlayer
├── VideoPlayer
└── MediaLibrary
```

### 3.6 CONFIG模块

**功能**：
- 主题设置（颜色、扫描线、CRT效果）
- 模块配置
- 音效设置
- 系统设置链接

**数据源**：
- 用户配置：存储在本地配置文件中

**组件结构**：
```
CONFIG
├── ThemeSettings
├── ModuleSettings
├── SoundSettings
└── SystemSettingsLink
```

## 4. UI主题系统设计

### 4.1 主题定义

使用TypeScript接口定义主题结构：

```typescript
interface Theme {
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
```

### 4.2 预定义主题

```typescript
const greenTheme: Theme = {
  primary: '#30FF50',
  primaryDark: '#18A830',
  accent: '#18A830',
  background: '#1A1A1A',
  border: '#252525',
  textPrimary: '#30FF50',
  textSecondary: '#18A830',
  scanlineOpacity: 0.1,
  crtEffect: true
};

const amberTheme: Theme = {
  primary: '#FFB000',
  primaryDark: '#D08000',
  accent: '#D08000',
  background: '#1A1A1A',
  border: '#252525',
  textPrimary: '#FFB000',
  textSecondary: '#D08000',
  scanlineOpacity: 0.1,
  crtEffect: true
};

const whiteTheme: Theme = {
  primary: '#F0F0F0',
  primaryDark: '#A0A0A0',
  accent: '#A0A0A0',
  background: '#1A1A1A',
  border: '#252525',
  textPrimary: '#F0F0F0',
  textSecondary: '#A0A0A0',
  scanlineOpacity: 0.1,
  crtEffect: true
};
```

### 4.3 主题切换机制

使用React Context API实现主题切换：

```typescript
const ThemeContext = React.createContext({
  theme: greenTheme,
  setTheme: (theme: Theme) => {}
});

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(greenTheme);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeWrapper theme={theme}>
        {children}
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
};
```

## 5. 特效系统设计

### 5.1 扫描线效果

使用CSS实现扫描线效果：

```css
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.2) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
  opacity: var(--scanline-opacity);
}
```

### 5.2 CRT效果

使用CSS滤镜实现CRT效果：

```css
.crt-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 11;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  overflow: hidden;
}

.crt-effect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
}
```

### 5.3 模块切换动画

使用React Transition Group实现模块切换动画：

```typescript
const ModuleTransition: React.FC = ({ children, activeModule }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={activeModule}
        timeout={300}
        classNames="module-transition"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
```

## 6. 音效系统设计

### 6.1 音效类型

```typescript
enum SoundType {
  CLICK = 'click',
  MODULE_SWITCH = 'moduleSwitch',
  CONFIRM = 'confirm',
  ERROR = 'error'
}
```

### 6.2 音效管理器

```typescript
class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  
  constructor() {
    this.loadSounds();
  }
  
  private loadSounds() {
    this.sounds.set(SoundType.CLICK, new Audio('sounds/click.mp3'));
    this.sounds.set(SoundType.MODULE_SWITCH, new Audio('sounds/module-switch.mp3'));
    this.sounds.set(SoundType.CONFIRM, new Audio('sounds/confirm.mp3'));
    this.sounds.set(SoundType.ERROR, new Audio('sounds/error.mp3'));
  }
  
  public play(type: SoundType) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(type);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
  
  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}
```

## 7. 系统集成设计

### 7.1 系统信息获取

使用Node.js的`os`模块和自定义原生模块获取系统信息：

```typescript
// 在主进程中
import os from 'os';
import { systemInfo } from './native-modules/system-info';

// CPU使用率
function getCpuUsage() {
  return systemInfo.getCpuUsage();
}

// 内存使用情况
function getMemoryInfo() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const percentUsed = (usedMem / totalMem) * 100;
  
  return {
    total: totalMem,
    free: freeMem,
    used: usedMem,
    percentUsed
  };
}

// 存储信息
function getDiskInfo() {
  return systemInfo.getDiskInfo();
}

// 网络活动
function getNetworkActivity() {
  return systemInfo.getNetworkActivity();
}

// 电池信息
function getBatteryInfo() {
  return systemInfo.getBatteryInfo();
}
```

### 7.2 应用程序启动

使用Node.js的`child_process`模块启动应用程序：

```typescript
import { exec } from 'child_process';

function launchApplication(path: string) {
  return new Promise((resolve, reject) => {
    exec(`start "" "${path}"`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
```

### 7.3 文件系统访问

使用Node.js的`fs`模块访问文件系统：

```typescript
import fs from 'fs';
import path from 'path';

function getDirectoryContents(dirPath: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, { withFileTypes: true }, (error, entries) => {
      if (error) {
        reject(error);
      } else {
        const result = entries.map(entry => {
          const fullPath = path.join(dirPath, entry.name);
          const stats = fs.statSync(fullPath);
          
          return {
            name: entry.name,
            path: fullPath,
            isDirectory: entry.isDirectory(),
            size: stats.size,
            modified: stats.mtime
          };
        });
        
        resolve(result);
      }
    });
  });
}
```

## 8. 配置存储设计

使用Electron的`app.getPath('userData')`获取用户数据目录，存储配置文件：

```typescript
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

class ConfigManager {
  private configPath: string;
  private config: any;
  
  constructor() {
    this.configPath = path.join(app.getPath('userData'), 'config.json');
    this.loadConfig();
  }
  
  private loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        this.config = JSON.parse(data);
      } else {
        this.config = this.getDefaultConfig();
        this.saveConfig();
      }
    } catch (error) {
      console.error('Failed to load config:', error);
      this.config = this.getDefaultConfig();
      this.saveConfig();
    }
  }
  
  private saveConfig() {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  }
  
  private getDefaultConfig() {
    return {
      theme: 'green',
      scanlineIntensity: 'medium',
      crtEffect: true,
      audioFeedback: true,
      modules: {
        stats: {
          showWeather: true,
          showBattery: true
        },
        apps: {
          categories: [
            'COMMUNICATIONS',
            'DATA PROCESSING',
            'ENTERTAINMENT TERMINAL',
            'AUDIO/VISUAL ARCHIVES',
            'UTILITIES & TOOLS'
          ]
        },
        files: {
          quickAccess: [
            { name: 'DOCUMENTS', path: app.getPath('documents') },
            { name: 'DOWNLOADS', path: app.getPath('downloads') },
            { name: 'PICTURES', path: app.getPath('pictures') },
            { name: 'MUSIC', path: app.getPath('music') },
            { name: 'VIDEOS', path: app.getPath('videos') }
          ]
        }
      }
    };
  }
  
  public get(key: string, defaultValue?: any) {
    const parts = key.split('.');
    let current = this.config;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return defaultValue;
      }
      current = current[part];
    }
    
    return current;
  }
  
  public set(key: string, value: any) {
    const parts = key.split('.');
    let current = this.config;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (current[part] === undefined) {
        current[part] = {};
      }
      current = current[part];
    }
    
    current[parts[parts.length - 1]] = value;
    this.saveConfig();
  }
}
```

## 9. 项目结构

```
pip-boy-desktop/
├── package.json
├── tsconfig.json
├── webpack.config.js
├── src/
│   ├── main/
│   │   ├── index.ts                 # 主进程入口
│   │   ├── system-info.ts           # 系统信息服务
│   │   ├── file-system.ts           # 文件系统服务
│   │   ├── app-launcher.ts          # 应用启动服务
│   │   └── config-manager.ts        # 配置管理器
│   ├── renderer/
│   │   ├── index.tsx                # 渲染进程入口
│   │   ├── App.tsx                  # 主应用组件
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx     # 主题上下文
│   │   │   └── ConfigContext.tsx    # 配置上下文
│   │   ├── components/
│   │   │   ├── common/              # 通用组件
│   │   │   ├── effects/             # 特效组件
│   │   │   └── modules/             # 模块组件
│   │   │       ├── Stats/
│   │   │       ├── Apps/
│   │   │       ├── Files/
│   │   │       ├── Data/
│   │   │       ├── Media/
│   │   │       └── Config/
│   │   ├── hooks/                   # 自定义hooks
│   │   ├── services/                # 渲染进程服务
│   │   ├── styles/                  # 全局样式
│   │   └── utils/                   # 工具函数
│   ├── shared/                      # 共享代码
│   │   ├── types.ts                 # 类型定义
│   │   └── constants.ts             # 常量定义
│   └── assets/                      # 静态资源
│       ├── fonts/                   # 字体文件
│       ├── sounds/                  # 音效文件
│       └── images/                  # 图片资源
└── build/                           # 构建输出目录
```

## 10. 开发和构建流程

### 10.1 开发环境设置

1. **安装依赖**
   ```bash
   npm install
   ```

2. **开发模式启动**
   ```bash
   npm start
   ```

3. **代码检查**
   ```bash
   npm run lint
   ```

### 10.2 构建流程

1. **生产环境构建**
   ```bash
   npm run build
   ```

2. **打包为Windows安装程序**
   ```bash
   npm run package
   ```

3. **创建发布包**
   ```bash
   npm run make
   ```

## 11. 未来扩展考虑

1. **插件系统**：允许用户开发自定义模块或小部件
2. **更深入的Windows 11集成**：利用Windows 11的新特性
3. **多显示器支持**：允许在不同显示器上显示不同模块
4. **更多自定义选项**：更多主题、字体和布局选项
5. **云同步**：配置和数据的云备份和同步

## 12. 结论

本架构设计文档提供了Pip-Boy桌面环境应用的全面技术实现方案。通过使用Electron和现代Web技术，我们可以创建一个既具有Fallout游戏中Pip-Boy风格，又能作为实用桌面工具的应用程序。该设计注重模块化、可扩展性和用户体验，同时保持与Windows 11平台的良好集成。
