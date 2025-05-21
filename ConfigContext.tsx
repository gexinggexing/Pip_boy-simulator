import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AppCategory, QuickAccessFolder } from '../../shared/types';
import { DEFAULT_APP_CATEGORIES, DEFAULT_QUICK_ACCESS_FOLDERS } from '../../shared/constants';

interface ConfigContextType {
  appCategories: AppCategory[];
  quickAccessFolders: QuickAccessFolder[];
  scanlineIntensity: string;
  crtEffect: boolean;
  audioFeedback: boolean;
  showWeather: boolean;
  showBattery: boolean;
  setAppCategories: (categories: AppCategory[]) => void;
  setQuickAccessFolders: (folders: QuickAccessFolder[]) => void;
  setScanlineIntensity: (intensity: string) => void;
  setCrtEffect: (enabled: boolean) => void;
  setAudioFeedback: (enabled: boolean) => void;
  setShowWeather: (show: boolean) => void;
  setShowBattery: (show: boolean) => void;
}

const defaultConfigContext: ConfigContextType = {
  appCategories: DEFAULT_APP_CATEGORIES,
  quickAccessFolders: DEFAULT_QUICK_ACCESS_FOLDERS,
  scanlineIntensity: 'medium',
  crtEffect: true,
  audioFeedback: true,
  showWeather: true,
  showBattery: true,
  setAppCategories: () => {},
  setQuickAccessFolders: () => {},
  setScanlineIntensity: () => {},
  setCrtEffect: () => {},
  setAudioFeedback: () => {},
  setShowWeather: () => {},
  setShowBattery: () => {}
};

export const ConfigContext = createContext<ConfigContextType>(defaultConfigContext);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  // 状态初始化
  const [appCategories, setAppCategories] = useState<AppCategory[]>(DEFAULT_APP_CATEGORIES);
  const [quickAccessFolders, setQuickAccessFolders] = useState<QuickAccessFolder[]>(DEFAULT_QUICK_ACCESS_FOLDERS);
  const [scanlineIntensity, setScanlineIntensity] = useState<string>('medium');
  const [crtEffect, setCrtEffect] = useState<boolean>(true);
  const [audioFeedback, setAudioFeedback] = useState<boolean>(true);
  const [showWeather, setShowWeather] = useState<boolean>(true);
  const [showBattery, setShowBattery] = useState<boolean>(true);

  // 加载配置
  useEffect(() => {
    // 在实际应用中，这里会从Electron的配置文件加载设置
    // 目前使用默认值
    
    // 更新扫描线强度
    updateScanlineOpacity(scanlineIntensity);
  }, []);

  // 更新扫描线强度
  const updateScanlineOpacity = (intensity: string) => {
    let opacity = 0.1; // 默认值
    
    switch (intensity) {
      case 'low':
        opacity = 0.05;
        break;
      case 'medium':
        opacity = 0.1;
        break;
      case 'high':
        opacity = 0.2;
        break;
    }
    
    document.documentElement.style.setProperty('--scanline-opacity', opacity.toString());
  };

  // 处理扫描线强度变化
  const handleScanlineIntensityChange = (intensity: string) => {
    setScanlineIntensity(intensity);
    updateScanlineOpacity(intensity);
  };

  return (
    <ConfigContext.Provider value={{
      appCategories,
      quickAccessFolders,
      scanlineIntensity,
      crtEffect,
      audioFeedback,
      showWeather,
      showBattery,
      setAppCategories,
      setQuickAccessFolders,
      setScanlineIntensity: handleScanlineIntensityChange,
      setCrtEffect,
      setAudioFeedback,
      setShowWeather,
      setShowBattery
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
