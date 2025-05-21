import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { SystemInfo } from '../../../shared/types';

const StatsModule: React.FC = () => {
  const { showWeather, showBattery } = useConfig();
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [weather, setWeather] = useState({
    location: '正在获取位置...',
    temperature: 22,
    feelsLike: 20,
    humidity: 65,
    condition: 'PARTLY CLOUDY',
    wind: '15 KPH NW',
    radiation: 'MINIMAL'
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // 获取系统信息
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        if (window.electronAPI) {
          const info = await window.electronAPI.getSystemInfo();
          setSystemInfo(info);
        }
      } catch (error) {
        console.error('Failed to fetch system info:', error);
      }
    };

    fetchSystemInfo();
    
    // 定期更新系统信息
    const interval = setInterval(fetchSystemInfo, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 格式化日期
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    // Fallout风格的年份（当前年份+270年）
    const year = date.getFullYear() + 270;
    
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="stats-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>系统状态</h1>
      
      {/* 时间和日期显示 */}
      <div style={{ 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>{currentTime.toLocaleTimeString()}</h2>
          <p>{formatDate(currentTime)}</p>
        </div>
      </div>
      
      {/* 系统信息 */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>系统生命体征</h2>
        
        {systemInfo ? (
          <div>
            {/* CPU负载 */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>CPU负载:</span>
                <span>{systemInfo.cpuUsage.toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${systemInfo.cpuUsage}%` }}
                ></div>
              </div>
            </div>
            
            {/* 内存使用 */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>内存使用:</span>
                <span>{systemInfo.memoryUsage.toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${systemInfo.memoryUsage}%` }}
                ></div>
              </div>
            </div>
            
            {/* 存储空间 */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>存储空间:</span>
                <span>40% 可用</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            
            {/* 网络活动 */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>网络活动:</span>
                <span>上传: 1.5 MB/s | 下载: 25.3 MB/s</span>
              </div>
            </div>
            
            {/* 电池状态 - 仅在配置启用且设备有电池时显示 */}
            {showBattery && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>电池状态:</span>
                  <span>[充电中] 100%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>正在获取系统信息...</p>
        )}
      </div>
      
      {/* 天气信息 - 仅在配置启用时显示 */}
      {showWeather && (
        <div>
          <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>环境扫描器</h2>
          
          <div style={{ 
            border: '1px solid var(--border)', 
            padding: '15px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>位置:</span>
              <span>{weather.location}</span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>温度:</span>
              <span>{weather.temperature}°C (体感: {weather.feelsLike}°C)</span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>湿度:</span>
              <span>{weather.humidity}%</span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>天气状况:</span>
              <span>{weather.condition}</span>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <span style={{ display: 'inline-block', width: '120px' }}>风力:</span>
              <span>{weather.wind}</span>
            </div>
            <div>
              <span style={{ display: 'inline-block', width: '120px' }}>辐射水平:</span>
              <span>{weather.radiation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsModule;
