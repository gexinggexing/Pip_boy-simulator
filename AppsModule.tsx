import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { AppInfo } from '../../../shared/types';

const AppsModule: React.FC = () => {
  const { appCategories } = useConfig();
  const [selectedCategory, setSelectedCategory] = useState(appCategories[0]?.id || '');
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟获取应用列表
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      
      // 模拟API调用延迟
      setTimeout(() => {
        // 生成该分类的模拟应用数据
        const mockApps = generateMockApps(selectedCategory);
        setApps(mockApps);
        setLoading(false);
      }, 500);
    }
  }, [selectedCategory]);

  // 生成模拟应用数据
  const generateMockApps = (categoryId: string): AppInfo[] => {
    const mockAppsData: Record<string, AppInfo[]> = {
      'communications': [
        {
          name: 'COMM-RELAY TERMINAL',
          originalName: 'Discord',
          path: 'C:\\Program Files\\Discord\\Discord.exe',
          icon: 'discord-icon',
          category: 'communications'
        },
        {
          name: 'WASTELAND MESSENGER',
          originalName: 'Telegram',
          path: 'C:\\Program Files\\Telegram Desktop\\Telegram.exe',
          icon: 'telegram-icon',
          category: 'communications'
        },
        {
          name: 'VAULT-TEC MAIL SYSTEM',
          originalName: 'Outlook',
          path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE',
          icon: 'outlook-icon',
          category: 'communications'
        }
      ],
      'data_processing': [
        {
          name: 'VAULT-TEC DATALINK BROWSER',
          originalName: 'Google Chrome',
          path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          icon: 'chrome-icon',
          category: 'data_processing'
        },
        {
          name: 'ADMINISTRATIVE DATA PROCESSOR',
          originalName: 'Microsoft Word',
          path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE',
          icon: 'word-icon',
          category: 'data_processing'
        },
        {
          name: 'RESOURCE ALLOCATION CALCULATOR',
          originalName: 'Microsoft Excel',
          path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE',
          icon: 'excel-icon',
          category: 'data_processing'
        }
      ],
      'entertainment': [
        {
          name: 'WASTELAND GAME GRID',
          originalName: 'Steam',
          path: 'C:\\Program Files (x86)\\Steam\\steam.exe',
          icon: 'steam-icon',
          category: 'entertainment'
        },
        {
          name: 'VAULT SIMULATION PROGRAM',
          originalName: 'Epic Games Launcher',
          path: 'C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe',
          icon: 'epic-icon',
          category: 'entertainment'
        }
      ],
      'media': [
        {
          name: 'GALAXY NEWS RADIO',
          originalName: 'Spotify',
          path: 'C:\\Users\\AppData\\Roaming\\Spotify\\Spotify.exe',
          icon: 'spotify-icon',
          category: 'media'
        },
        {
          name: 'VISUAL ARCHIVES PLAYER',
          originalName: 'VLC Media Player',
          path: 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe',
          icon: 'vlc-icon',
          category: 'media'
        }
      ],
      'utilities': [
        {
          name: 'VAULT-TEC SYSTEM MONITOR',
          originalName: 'Task Manager',
          path: 'C:\\Windows\\System32\\Taskmgr.exe',
          icon: 'taskmgr-icon',
          category: 'utilities'
        },
        {
          name: 'TERMINAL ACCESS PROGRAM',
          originalName: 'Command Prompt',
          path: 'C:\\Windows\\System32\\cmd.exe',
          icon: 'cmd-icon',
          category: 'utilities'
        },
        {
          name: 'VAULT SETTINGS INTERFACE',
          originalName: 'Settings',
          path: 'C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe',
          icon: 'settings-icon',
          category: 'utilities'
        }
      ],
      'recent': [
        {
          name: 'VAULT-TEC DATALINK BROWSER',
          originalName: 'Google Chrome',
          path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          icon: 'chrome-icon',
          category: 'data_processing'
        },
        {
          name: 'GALAXY NEWS RADIO',
          originalName: 'Spotify',
          path: 'C:\\Users\\AppData\\Roaming\\Spotify\\Spotify.exe',
          icon: 'spotify-icon',
          category: 'media'
        }
      ]
    };
    
    return mockAppsData[categoryId] || [];
  };

  // 启动应用程序
  const launchApp = async (app: AppInfo) => {
    try {
      if (window.electronAPI) {
        await window.electronAPI.launchApplication(app.path);
      } else {
        console.log('启动应用:', app.name);
      }
    } catch (error) {
      console.error('启动应用失败:', error);
    }
  };

  return (
    <div className="apps-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>应用启动器</h1>
      
      <div style={{ 
        display: 'flex',
        height: 'calc(100vh - 200px)'
      }}>
        {/* 左侧分类列表 */}
        <div style={{ 
          width: '250px',
          borderRight: '1px solid var(--border)',
          paddingRight: '15px',
          marginRight: '15px'
        }}>
          <h2 style={{ marginBottom: '15px', textTransform: 'uppercase' }}>分类</h2>
          <ul className="pip-boy-list">
            {appCategories.map(category => (
              <li 
                key={category.id}
                className={`pip-boy-list-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        
        {/* 右侧应用列表 */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '15px', textTransform: 'uppercase' }}>
            {appCategories.find(c => c.id === selectedCategory)?.name || '应用'}
          </h2>
          
          {loading ? (
            <p>正在加载应用列表...</p>
          ) : (
            <ul className="pip-boy-list">
              {apps.map((app, index) => (
                <li 
                  key={index}
                  className="pip-boy-list-item"
                  onClick={() => launchApp(app)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 8px'
                  }}
                >
                  {/* 应用图标占位符 */}
                  <div style={{ 
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--primary)',
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {app.name.charAt(0)}
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{app.name}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>{app.originalName}</div>
                  </div>
                </li>
              ))}
              
              {apps.length === 0 && (
                <p>此分类中没有应用</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppsModule;
