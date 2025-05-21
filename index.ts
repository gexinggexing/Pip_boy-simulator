import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as os from 'os';

// 防止应用多开
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// 保存对主窗口的引用
let mainWindow: BrowserWindow | null = null;

// 创建主窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    frame: false, // 无边框窗口，我们将自定义Pip-Boy风格的边框
    transparent: true, // 支持透明背景，用于实现圆角和特效
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 加载应用的主页面
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
  }

  // 打开开发者工具
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // 窗口关闭时清除引用
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // 在macOS上，当点击dock图标且没有其他窗口打开时，通常会重新创建一个窗口
    if (mainWindow === null) {
      createWindow();
    }
  });
});

// 当所有窗口关闭时退出应用，除了在macOS上
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 系统信息相关IPC处理
ipcMain.handle('get-system-info', async () => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = (usedMem / totalMem) * 100;

  // 这里只是一个简单的CPU使用率计算，实际应用中可能需要更复杂的计算
  const cpuUsage = process.getCPUUsage().percentCPUUsage * 100;

  return {
    cpuUsage,
    memoryUsage,
    totalMem,
    freeMem,
    usedMem,
    platform: os.platform(),
    hostname: os.hostname(),
    uptime: os.uptime()
  };
});

// 文件系统相关IPC处理
ipcMain.handle('get-directory-contents', async (event, dirPath: string) => {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    return entries.map((entry: any) => {
      const fullPath = path.join(dirPath, entry.name);
      let stats;
      
      try {
        stats = fs.statSync(fullPath);
      } catch (error) {
        // 如果无法获取文件状态，则提供默认值
        stats = {
          size: 0,
          mtime: new Date(0)
        };
      }
      
      return {
        name: entry.name,
        path: fullPath,
        isDirectory: entry.isDirectory(),
        size: stats.size,
        modified: stats.mtime
      };
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});

// 应用启动相关IPC处理
ipcMain.handle('launch-application', async (event, appPath: string) => {
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec(`start "" "${appPath}"`, (error: any) => {
      if (error) {
        console.error('Error launching application:', error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
});
