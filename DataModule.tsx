import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const DataModule: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState('');
  const [systemLogs, setSystemLogs] = useState<{ time: string; source: string; message: string }[]>([]);

  // 初始化模拟数据
  useEffect(() => {
    // 模拟任务
    setTasks([
      { id: 1, text: '完成Pip-Boy界面设计', completed: true },
      { id: 2, text: '实现STATS模块功能', completed: true },
      { id: 3, text: '优化文件浏览器性能', completed: false },
      { id: 4, text: '添加更多自定义主题选项', completed: false },
      { id: 5, text: '修复通知系统bug', completed: false }
    ]);

    // 模拟系统日志
    setSystemLogs([
      { time: '10:48:05', source: 'SYSTEM', message: '网络连接已建立' },
      { time: '10:49:12', source: 'APPS', message: '"VAULT-TEC DATALINK BROWSER" 已启动' },
      { time: '10:52:30', source: 'SYSTEM', message: '内存使用率超过75%' },
      { time: '10:55:15', source: 'FILES', message: '文件 "project_report.docx" 已保存' },
      { time: '11:01:22', source: 'MEDIA', message: '播放 "Diamond City Radio - Classical Mix"' },
      { time: '11:05:47', source: 'CONFIG', message: '主题已更改为 "AMBER"' },
      { time: '11:10:33', source: 'SYSTEM', message: '电池电量低于20%' },
      { time: '11:15:09', source: 'APPS', message: '"ADMINISTRATIVE DATA PROCESSOR" 已关闭' }
    ]);

    // 模拟笔记
    setNotes(`PERSONAL LOG - ENTRY #47

今天继续开发Pip-Boy桌面环境应用。已经完成了主界面和几个核心模块的原型设计。

待办事项:
- 完善文件浏览器的搜索功能
- 添加更多自定义选项到CONFIG模块
- 优化启动时间和性能

技术笔记:
使用Electron + React实现界面，主题切换功能工作良好。CRT效果和扫描线给整体增添了很好的复古感。

下一步计划研究如何更好地集成Windows 11的系统API，以获取更准确的系统信息和通知。`);
  }, []);

  // 添加新任务
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        text: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  // 切换任务完成状态
  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 删除任务
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="data-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>数据管理</h1>
      
      {/* 标签切换 */}
      <div style={{ 
        display: 'flex',
        borderBottom: `1px solid ${theme.border}`,
        marginBottom: '20px'
      }}>
        <div 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
          style={{ flex: 1, textAlign: 'center' }}
        >
          个人日志
        </div>
        <div 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
          style={{ flex: 1, textAlign: 'center' }}
        >
          任务列表
        </div>
        <div 
          className={`tab ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
          style={{ flex: 1, textAlign: 'center' }}
        >
          系统日志
        </div>
      </div>
      
      {/* 笔记区域 */}
      {activeTab === 'notes' && (
        <div>
          <textarea
            className="pip-boy-input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ 
              height: 'calc(100vh - 250px)',
              resize: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              fontFamily: 'Share Tech Mono, monospace'
            }}
          />
        </div>
      )}
      
      {/* 任务列表 */}
      {activeTab === 'tasks' && (
        <div>
          {/* 添加新任务 */}
          <div style={{ 
            display: 'flex',
            marginBottom: '20px'
          }}>
            <input
              type="text"
              className="pip-boy-input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="添加新任务..."
              style={{ flex: 1, marginRight: '10px' }}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button 
              className="pip-boy-button"
              onClick={addTask}
            >
              添加
            </button>
          </div>
          
          {/* 任务列表 */}
          <div style={{ 
            height: 'calc(100vh - 300px)',
            overflow: 'auto',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}>
            {tasks.length > 0 ? (
              <ul className="pip-boy-list">
                {tasks.map(task => (
                  <li 
                    key={task.id}
                    className="pip-boy-list-item"
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      opacity: task.completed ? 0.7 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskComplete(task.id)}
                        style={{ marginRight: '10px' }}
                      />
                      <span>{task.text}</span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ 
                        background: 'none',
                        border: 'none',
                        color: theme.primary,
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                没有任务
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 系统日志 */}
      {activeTab === 'logs' && (
        <div style={{ 
          height: 'calc(100vh - 250px)',
          overflow: 'auto',
          border: `1px solid ${theme.border}`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '10px',
          fontFamily: 'monospace'
        }}>
          {systemLogs.map((log, index) => (
            <div 
              key={index}
              style={{ 
                marginBottom: '8px',
                borderBottom: `1px solid ${theme.border}`,
                paddingBottom: '8px'
              }}
            >
              <span style={{ marginRight: '10px' }}>[{log.time}]</span>
              <span style={{ 
                marginRight: '10px',
                color: log.source === 'SYSTEM' ? theme.accent : theme.primary
              }}>
                {log.source}:
              </span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataModule;
