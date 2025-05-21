import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useConfig } from '../../context/ConfigContext';
import { THEMES } from '../../../shared/constants';

const ConfigModule: React.FC = () => {
  const { theme, currentThemeName, setTheme } = useTheme();
  const { 
    scanlineIntensity, 
    crtEffect, 
    audioFeedback, 
    showWeather, 
    showBattery,
    setScanlineIntensity,
    setCrtEffect,
    setAudioFeedback,
    setShowWeather,
    setShowBattery
  } = useConfig();

  // 本地状态，用于表单控制
  const [localSettings, setLocalSettings] = useState({
    theme: currentThemeName,
    scanlineIntensity,
    crtEffect,
    audioFeedback,
    showWeather,
    showBattery
  });

  // 处理设置变更
  const handleSettingChange = (setting: string, value: any) => {
    setLocalSettings({
      ...localSettings,
      [setting]: value
    });

    // 立即应用设置
    switch (setting) {
      case 'theme':
        setTheme(value);
        break;
      case 'scanlineIntensity':
        setScanlineIntensity(value);
        break;
      case 'crtEffect':
        setCrtEffect(value);
        break;
      case 'audioFeedback':
        setAudioFeedback(value);
        break;
      case 'showWeather':
        setShowWeather(value);
        break;
      case 'showBattery':
        setShowBattery(value);
        break;
    }
  };

  // 打开系统设置
  const openSystemSettings = () => {
    if (window.electronAPI) {
      window.electronAPI.launchApplication('C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe');
    } else {
      console.log('打开系统设置');
    }
  };

  return (
    <div className="config-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>设置与配置</h1>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* 桌面主题设置 */}
        <div style={{ 
          padding: '15px',
          border: `1px solid ${theme.border}`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ marginBottom: '15px', textTransform: 'uppercase' }}>桌面主题设置</h2>
          
          {/* 颜色方案 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>颜色方案</h3>
            <div style={{ 
              display: 'flex',
              gap: '10px'
            }}>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="theme" 
                  value={THEMES.GREEN} 
                  checked={localSettings.theme === THEMES.GREEN}
                  onChange={() => handleSettingChange('theme', THEMES.GREEN)}
                  style={{ marginRight: '5px' }}
                />
                <div style={{ 
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#30FF50',
                  marginRight: '5px'
                }}></div>
                绿色
              </label>
              
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="theme" 
                  value={THEMES.AMBER} 
                  checked={localSettings.theme === THEMES.AMBER}
                  onChange={() => handleSettingChange('theme', THEMES.AMBER)}
                  style={{ marginRight: '5px' }}
                />
                <div style={{ 
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#FFB000',
                  marginRight: '5px'
                }}></div>
                琥珀色
              </label>
              
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="theme" 
                  value={THEMES.WHITE} 
                  checked={localSettings.theme === THEMES.WHITE}
                  onChange={() => handleSettingChange('theme', THEMES.WHITE)}
                  style={{ marginRight: '5px' }}
                />
                <div style={{ 
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#F0F0F0',
                  marginRight: '5px'
                }}></div>
                白色
              </label>
            </div>
          </div>
          
          {/* 扫描线强度 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>扫描线强度</h3>
            <div style={{ 
              display: 'flex',
              gap: '10px'
            }}>
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="scanlineIntensity" 
                  value="low" 
                  checked={localSettings.scanlineIntensity === 'low'}
                  onChange={() => handleSettingChange('scanlineIntensity', 'low')}
                  style={{ marginRight: '5px' }}
                />
                低
              </label>
              
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="scanlineIntensity" 
                  value="medium" 
                  checked={localSettings.scanlineIntensity === 'medium'}
                  onChange={() => handleSettingChange('scanlineIntensity', 'medium')}
                  style={{ marginRight: '5px' }}
                />
                中
              </label>
              
              <label style={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="scanlineIntensity" 
                  value="high" 
                  checked={localSettings.scanlineIntensity === 'high'}
                  onChange={() => handleSettingChange('scanlineIntensity', 'high')}
                  style={{ marginRight: '5px' }}
                />
                高
              </label>
            </div>
          </div>
          
          {/* CRT效果 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>CRT效果</h3>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                checked={localSettings.crtEffect}
                onChange={(e) => handleSettingChange('crtEffect', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              启用CRT效果
            </label>
          </div>
          
          {/* 音效反馈 */}
          <div>
            <h3 style={{ marginBottom: '10px' }}>音效反馈</h3>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                checked={localSettings.audioFeedback}
                onChange={(e) => handleSettingChange('audioFeedback', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              启用UI音效
            </label>
          </div>
        </div>
        
        {/* 模块配置 */}
        <div style={{ 
          padding: '15px',
          border: `1px solid ${theme.border}`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ marginBottom: '15px', textTransform: 'uppercase' }}>模块配置</h2>
          
          {/* STATS模块设置 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>STATS模块</h3>
            
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '10px'
            }}>
              <input 
                type="checkbox" 
                checked={localSettings.showWeather}
                onChange={(e) => handleSettingChange('showWeather', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              显示天气信息
            </label>
            
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                checked={localSettings.showBattery}
                onChange={(e) => handleSettingChange('showBattery', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              显示电池状态
            </label>
          </div>
          
          {/* 系统设置链接 */}
          <div>
            <h3 style={{ marginBottom: '10px' }}>系统设置</h3>
            <button 
              className="pip-boy-button"
              onClick={openSystemSettings}
              style={{ width: '100%' }}
            >
              访问系统核心设置 (WINDOWS)
            </button>
          </div>
        </div>
      </div>
      
      {/* 关于信息 */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        border: `1px solid ${theme.border}`,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ marginBottom: '15px', textTransform: 'uppercase' }}>关于</h2>
        <p style={{ marginBottom: '10px' }}>PIP-BOY 桌面环境</p>
        <p style={{ marginBottom: '10px' }}>版本: 0.1.0</p>
        <p>基于ROBCO INDUSTRIES(TM) UNIFIED OPERATING SYSTEM</p>
      </div>
    </div>
  );
};

export default ConfigModule;
