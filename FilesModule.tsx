import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { FileEntry } from '../../../shared/types';

const FilesModule: React.FC = () => {
  const { quickAccessFolders } = useConfig();
  const [currentPath, setCurrentPath] = useState('');
  const [fileList, setFileList] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 初始化时获取用户文档目录
  useEffect(() => {
    if (quickAccessFolders.length > 0) {
      navigateToPath(quickAccessFolders[0].path);
    }
  }, []);

  // 导航到指定路径
  const navigateToPath = async (path: string) => {
    try {
      setLoading(true);
      
      if (window.electronAPI) {
        const files = await window.electronAPI.getDirectoryContents(path);
        setFileList(files);
        
        // 更新历史记录
        if (currentPath && currentPath !== path) {
          const newHistory = [...history.slice(0, historyIndex + 1), path];
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
        } else if (!currentPath) {
          setHistory([path]);
          setHistoryIndex(0);
        }
        
        setCurrentPath(path);
      } else {
        // 模拟数据用于开发
        setTimeout(() => {
          const mockFiles = generateMockFiles(path);
          setFileList(mockFiles);
          
          // 更新历史记录
          if (currentPath && currentPath !== path) {
            const newHistory = [...history.slice(0, historyIndex + 1), path];
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
          } else if (!currentPath) {
            setHistory([path]);
            setHistoryIndex(0);
          }
          
          setCurrentPath(path);
          setLoading(false);
        }, 300);
      }
    } catch (error) {
      console.error('获取目录内容失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 生成模拟文件数据
  const generateMockFiles = (path: string): FileEntry[] => {
    // 根据路径生成不同的模拟文件
    if (path.includes('Documents')) {
      return [
        {
          name: '工作报告.docx',
          path: `${path}\\工作报告.docx`,
          isDirectory: false,
          size: 1024 * 25,
          modified: new Date()
        },
        {
          name: '个人笔记',
          path: `${path}\\个人笔记`,
          isDirectory: true,
          size: 0,
          modified: new Date()
        },
        {
          name: '项目计划.xlsx',
          path: `${path}\\项目计划.xlsx`,
          isDirectory: false,
          size: 1024 * 45,
          modified: new Date()
        }
      ];
    } else if (path.includes('Pictures')) {
      return [
        {
          name: '假日照片',
          path: `${path}\\假日照片`,
          isDirectory: true,
          size: 0,
          modified: new Date()
        },
        {
          name: '截图',
          path: `${path}\\截图`,
          isDirectory: true,
          size: 0,
          modified: new Date()
        },
        {
          name: '壁纸.jpg',
          path: `${path}\\壁纸.jpg`,
          isDirectory: false,
          size: 1024 * 1024 * 2,
          modified: new Date()
        }
      ];
    } else {
      return [
        {
          name: '文件夹1',
          path: `${path}\\文件夹1`,
          isDirectory: true,
          size: 0,
          modified: new Date()
        },
        {
          name: '文件夹2',
          path: `${path}\\文件夹2`,
          isDirectory: true,
          size: 0,
          modified: new Date()
        },
        {
          name: '文档.txt',
          path: `${path}\\文档.txt`,
          isDirectory: false,
          size: 1024 * 2,
          modified: new Date()
        }
      ];
    }
  };

  // 导航到上一级目录
  const navigateUp = () => {
    if (currentPath) {
      const pathParts = currentPath.split('\\');
      if (pathParts.length > 1) {
        const parentPath = pathParts.slice(0, -1).join('\\');
        navigateToPath(parentPath);
      }
    }
  };

  // 导航历史前进
  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      navigateToPath(history[newIndex]);
    }
  };

  // 导航历史后退
  const navigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      navigateToPath(history[newIndex]);
    }
  };

  // 处理文件或文件夹点击
  const handleFileClick = (file: FileEntry) => {
    if (file.isDirectory) {
      navigateToPath(file.path);
    } else {
      // 在实际应用中，这里会打开文件
      console.log('打开文件:', file.path);
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 格式化日期
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="files-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>文件浏览器</h1>
      
      {/* 快速访问 */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>快速访问</h2>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {quickAccessFolders.map((folder, index) => (
            <button 
              key={index}
              className="pip-boy-button"
              onClick={() => navigateToPath(folder.path)}
            >
              {folder.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* 导航栏 */}
      <div style={{ 
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button 
          className="pip-boy-button"
          onClick={navigateBack}
          disabled={historyIndex <= 0}
          style={{ opacity: historyIndex <= 0 ? 0.5 : 1 }}
        >
          ←
        </button>
        <button 
          className="pip-boy-button"
          onClick={navigateForward}
          disabled={historyIndex >= history.length - 1}
          style={{ opacity: historyIndex >= history.length - 1 ? 0.5 : 1 }}
        >
          →
        </button>
        <button 
          className="pip-boy-button"
          onClick={navigateUp}
        >
          ↑
        </button>
        <div style={{ 
          flex: 1,
          padding: '8px',
          border: '1px solid var(--border)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {currentPath || '选择一个位置'}
        </div>
      </div>
      
      {/* 文件列表 */}
      <div style={{ 
        border: '1px solid var(--border)',
        height: 'calc(100vh - 350px)',
        overflow: 'auto'
      }}>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            正在加载...
          </div>
        ) : (
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ 
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>名称</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>大小</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>修改日期</th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file, index) => (
                <tr 
                  key={index}
                  onClick={() => handleFileClick(file)}
                  style={{ 
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer'
                  }}
                  className="pip-boy-list-item"
                >
                  <td style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/* 文件/文件夹图标 */}
                      <div style={{ 
                        width: '20px',
                        marginRight: '8px',
                        textAlign: 'center'
                      }}>
                        {file.isDirectory ? '📁' : '📄'}
                      </div>
                      {file.name}
                    </div>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    {file.isDirectory ? '--' : formatFileSize(file.size)}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    {formatDate(file.modified)}
                  </td>
                </tr>
              ))}
              
              {fileList.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: '20px', textAlign: 'center' }}>
                    此文件夹为空
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FilesModule;
