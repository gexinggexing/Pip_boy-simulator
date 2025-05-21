import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useConfig } from '../../context/ConfigContext';
import { useSound } from '../../context/SoundContext';
import { SoundType } from '../../../shared/types';

interface EffectsProps {
  children: React.ReactNode;
}

const Effects: React.FC<EffectsProps> = ({ children }) => {
  const { theme } = useTheme();
  const { crtEffect, scanlineIntensity, audioFeedback } = useConfig();
  const { setEnabled } = useSound();
  
  // 更新音效状态
  useEffect(() => {
    setEnabled(audioFeedback);
  }, [audioFeedback, setEnabled]);
  
  // 获取扫描线不透明度
  const getScanlineOpacity = () => {
    switch (scanlineIntensity) {
      case 'low':
        return 0.05;
      case 'medium':
        return 0.1;
      case 'high':
        return 0.2;
      default:
        return 0.1;
    }
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
      
      {/* 扫描线效果 */}
      <div 
        className="scanlines" 
        style={{ 
          opacity: getScanlineOpacity(),
          display: 'block'
        }}
      ></div>
      
      {/* CRT效果 */}
      {crtEffect && (
        <div className="crt-effect"></div>
      )}
    </div>
  );
};

export default Effects;
