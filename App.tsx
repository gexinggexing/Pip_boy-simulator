import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ConfigProvider } from './context/ConfigContext';
import MainLayout from './components/MainLayout';
import { THEMES } from '../shared/constants';

const App: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  // 模拟启动动画
  useEffect(() => {
    // 在实际应用中，这里可以加载配置、检查系统等
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider>
      <ThemeProvider initialTheme={THEMES.GREEN}>
        {!initialized ? (
          <BootScreen />
        ) : (
          <MainLayout />
        )}
      </ThemeProvider>
    </ConfigProvider>
  );
};

// 启动画面组件
const BootScreen: React.FC = () => {
  const [bootText, setBootText] = useState('INITIALIZING ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 300);

    const textInterval = setInterval(() => {
      setBootText(prev => {
        if (prev === 'INITIALIZING ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM') {
          return 'CHECKING SYSTEM INTEGRITY';
        } else if (prev === 'CHECKING SYSTEM INTEGRITY') {
          return 'LOADING MODULES';
        } else if (prev === 'LOADING MODULES') {
          return 'ESTABLISHING CONNECTION TO VAULT-TEC NETWORK';
        } else {
          return 'LAUNCHING PIP-BOY INTERFACE';
        }
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="boot-screen" style={{
      backgroundColor: '#1A1A1A',
      color: '#30FF50',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Share Tech Mono, monospace',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM</h1>
        <h2 style={{ fontSize: '18px' }}>COPYRIGHT 2075-2077 ROBCO INDUSTRIES</h2>
      </div>
      
      <div style={{ width: '80%', maxWidth: '600px' }}>
        <div style={{ 
          border: '2px solid #30FF50', 
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <p>-PIP-OS(R) V7.1.0.8-</p>
          <p>-64K RAM SYSTEM-</p>
          <p>-38911 BYTES FREE-</p>
          <p>-NO HOLOTAPE FOUND-</p>
          <p>-LOAD ROM(1): DEITRIX 303-</p>
        </div>
        
        <div style={{ textAlign: 'left', height: '100px' }}>
          <p>{bootText}{dots}</p>
        </div>
      </div>
      
      <div className="scanlines" style={{ opacity: 0.1 }}></div>
      <div className="crt-effect"></div>
    </div>
  );
};

export default App;
