import { contextBridge, ipcRenderer } from 'electron';

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 系统信息
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // 文件系统
  getDirectoryContents: (dirPath: string) => ipcRenderer.invoke('get-directory-contents', dirPath),
  
  // 应用启动
  launchApplication: (appPath: string) => ipcRenderer.invoke('launch-application', appPath),
  
  // 窗口控制
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window')
});
