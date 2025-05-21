import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTheme } from '../context/ThemeContext';
import { MODULE_TABS } from '../../shared/constants';
import { ModuleType } from '../../shared/types';
import StatsModule from './modules/Stats/StatsModule';
import AppsModule from './modules/Apps/AppsModule';
import FilesModule from './modules/Files/FilesModule';
import DataModule from './modules/Data/DataModule';
import MediaModule from './modules/Media/MediaModule';
import ConfigModule from './modules/Config/ConfigModule';

const MainLayout: React.FC = () => {
  const { currentThemeName } = useTheme();
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.STATS);

  // 处理窗口控制
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  // 渲染当前活动模块
  const renderActiveModule = () => {
    switch (activeModule) {
      case ModuleType.STATS:
        return <StatsModule />;
      case ModuleType.APPS:
        return <AppsModule />;
      case ModuleType.FILES:
        return <FilesModule />;
      case ModuleType.DATA:
        return <DataModule />;
      case ModuleType.MEDIA:
        return <MediaModule />;
      case ModuleType.CONFIG:
        return <ConfigModule />;
      default:
        return <StatsModule />;
    }
  };

  return (
    <div className="pip-boy-frame">
      {/* 标题栏 */}
      <div className="title-bar">
        <div>PIP-BOY 3000</div>
        <div className="title-bar-controls">
          <button className="title-bar-button" onClick={handleMinimize}>_</button>
          <button className="title-bar-button" onClick={handleMaximize}>□</button>
          <button className="title-bar-button" onClick={handleClose}>×</button>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="tabs">
        {MODULE_TABS.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeModule === tab.id ? 'active' : ''}`}
            onClick={() => setActiveModule(tab.id as ModuleType)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="content">
        <TransitionGroup>
          <CSSTransition
            key={activeModule}
            timeout={300}
            classNames="module-transition"
          >
            {renderActiveModule()}
          </CSSTransition>
        </TransitionGroup>
      </div>

      {/* 状态栏 */}
      <div className="status-bar">
        <div>{new Date().toLocaleTimeString()}</div>
        <div>THEME: {currentThemeName.toUpperCase()}</div>
      </div>

      {/* 特效层 */}
      <div className="scanlines"></div>
      {/* CRT效果仅在配置启用时显示 */}
      <div className="crt-effect"></div>
    </div>
  );
};

export default MainLayout;
