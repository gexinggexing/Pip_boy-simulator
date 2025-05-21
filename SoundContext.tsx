import React, { createContext, useContext, useState, useEffect } from 'react';
import { SoundType } from '../../shared/types';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  setEnabled: (enabled: boolean) => void;
  isEnabled: boolean;
}

const defaultSoundContext: SoundContextType = {
  playSound: () => {},
  setEnabled: () => {},
  isEnabled: true
};

export const SoundContext = createContext<SoundContextType>(defaultSoundContext);

interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [sounds, setSounds] = useState<Map<SoundType, HTMLAudioElement>>(new Map());
  
  // 初始化音效
  useEffect(() => {
    const soundMap = new Map<SoundType, HTMLAudioElement>();
    
    // 在实际应用中，这里会加载真实的音效文件
    // 目前使用空的Audio对象作为占位符
    soundMap.set(SoundType.CLICK, new Audio());
    soundMap.set(SoundType.MODULE_SWITCH, new Audio());
    soundMap.set(SoundType.CONFIRM, new Audio());
    soundMap.set(SoundType.ERROR, new Audio());
    
    setSounds(soundMap);
  }, []);
  
  // 播放音效
  const playSound = (type: SoundType) => {
    if (!isEnabled) return;
    
    const sound = sounds.get(type);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error('播放音效失败:', err));
    }
  };
  
  // 设置音效开关
  const setEnabled = (enabled: boolean) => {
    setIsEnabled(enabled);
  };
  
  return (
    <SoundContext.Provider value={{ playSound, setEnabled, isEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
