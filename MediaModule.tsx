import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const MediaModule: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('music');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [musicLibrary, setMusicLibrary] = useState<any[]>([]);
  const [videoLibrary, setVideoLibrary] = useState<any[]>([]);
  
  // 初始化模拟数据
  useEffect(() => {
    // 模拟音乐库
    setMusicLibrary([
      { id: 1, title: 'Blue Moon', artist: 'Frank Sinatra', album: 'Galaxy News Radio', duration: '2:45' },
      { id: 2, title: 'Atom Bomb Baby', artist: 'Five Stars', album: 'Diamond City Radio', duration: '3:12' },
      { id: 3, title: 'Rocket 69', artist: 'Connie Allen', album: 'Diamond City Radio', duration: '2:37' },
      { id: 4, title: 'Civilization', artist: 'Danny Kaye', album: 'Galaxy News Radio', duration: '3:01' },
      { id: 5, title: 'Butcher Pete', artist: 'Roy Brown', album: 'Galaxy News Radio', duration: '2:58' },
      { id: 6, title: 'Uranium Fever', artist: 'Elton Britt', album: 'Diamond City Radio', duration: '2:25' },
      { id: 7, title: 'Wanderer', artist: 'Dion', album: 'Appalachia Radio', duration: '2:42' },
      { id: 8, title: 'Personality', artist: 'Lloyd Price', album: 'Appalachia Radio', duration: '2:51' }
    ]);
    
    // 模拟视频库
    setVideoLibrary([
      { id: 1, title: 'Vault-Tec Promotional Video', duration: '5:23', thumbnail: 'vault_tec_promo.jpg' },
      { id: 2, title: 'S.P.E.C.I.A.L. Training - Strength', duration: '2:15', thumbnail: 'special_strength.jpg' },
      { id: 3, title: 'S.P.E.C.I.A.L. Training - Perception', duration: '2:08', thumbnail: 'special_perception.jpg' },
      { id: 4, title: 'Nuka-Cola Advertisement', duration: '0:45', thumbnail: 'nuka_cola_ad.jpg' },
      { id: 5, title: 'RobCo Demonstration', duration: '3:32', thumbnail: 'robco_demo.jpg' }
    ]);
    
    // 设置默认当前曲目
    setCurrentTrack(musicLibrary[0]);
  }, []);
  
  // 播放/暂停切换
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  // 下一曲
  const playNextTrack = () => {
    if (musicLibrary.length > 0 && currentTrack) {
      const currentIndex = musicLibrary.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % musicLibrary.length;
      setCurrentTrack(musicLibrary[nextIndex]);
    }
  };
  
  // 上一曲
  const playPreviousTrack = () => {
    if (musicLibrary.length > 0 && currentTrack) {
      const currentIndex = musicLibrary.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + musicLibrary.length) % musicLibrary.length;
      setCurrentTrack(musicLibrary[prevIndex]);
    }
  };
  
  // 选择曲目播放
  const selectTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  // 播放视频
  const playVideo = (video: any) => {
    console.log('播放视频:', video.title);
    // 在实际应用中，这里会启动视频播放器
  };

  return (
    <div className="media-module">
      <h1 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>媒体播放器</h1>
      
      {/* 标签切换 */}
      <div style={{ 
        display: 'flex',
        borderBottom: `1px solid ${theme.border}`,
        marginBottom: '20px'
      }}>
        <div 
          className={`tab ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
          style={{ flex: 1, textAlign: 'center' }}
        >
          音频传输器
        </div>
        <div 
          className={`tab ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
          style={{ flex: 1, textAlign: 'center' }}
        >
          视觉档案播放器
        </div>
      </div>
      
      {/* 音乐播放器 */}
      {activeTab === 'music' && (
        <div>
          {/* 当前播放 */}
          <div style={{ 
            marginBottom: '20px',
            padding: '15px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>当前播放</h2>
            
            {currentTrack ? (
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentTrack.title}</div>
                  <div>{currentTrack.artist} - {currentTrack.album}</div>
                </div>
                
                {/* 进度条 */}
                <div className="progress-bar" style={{ marginBottom: '15px' }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: '45%' }}
                  ></div>
                </div>
                
                {/* 控制按钮 */}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '15px'
                }}>
                  <button 
                    className="pip-boy-button"
                    onClick={playPreviousTrack}
                  >
                    ◀◀
                  </button>
                  <button 
                    className="pip-boy-button"
                    onClick={togglePlayback}
                    style={{ width: '80px' }}
                  >
                    {isPlaying ? '❚❚' : '▶'}
                  </button>
                  <button 
                    className="pip-boy-button"
                    onClick={playNextTrack}
                  >
                    ▶▶
                  </button>
                </div>
                
                {/* 音量控制 */}
                <div style={{ 
                  marginTop: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>音量:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span>{volume}%</span>
                </div>
              </div>
            ) : (
              <p>未选择曲目</p>
            )}
          </div>
          
          {/* 音乐库 */}
          <div>
            <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>音乐库</h2>
            
            <div style={{ 
              height: 'calc(100vh - 500px)',
              overflow: 'auto',
              border: `1px solid ${theme.border}`,
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}>
              <table style={{ 
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ 
                    borderBottom: `1px solid ${theme.border}`,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                  }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>标题</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>艺术家</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>专辑</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>时长</th>
                  </tr>
                </thead>
                <tbody>
                  {musicLibrary.map((track) => (
                    <tr 
                      key={track.id}
                      onClick={() => selectTrack(track)}
                      style={{ 
                        borderBottom: `1px solid ${theme.border}`,
                        cursor: 'pointer',
                        backgroundColor: currentTrack && currentTrack.id === track.id ? 'rgba(48, 255, 80, 0.1)' : 'transparent'
                      }}
                      className="pip-boy-list-item"
                    >
                      <td style={{ padding: '8px' }}>{track.title}</td>
                      <td style={{ padding: '8px' }}>{track.artist}</td>
                      <td style={{ padding: '8px' }}>{track.album}</td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>{track.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* 视频播放器 */}
      {activeTab === 'video' && (
        <div>
          <h2 style={{ marginBottom: '10px', textTransform: 'uppercase' }}>视频库</h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '15px',
            height: 'calc(100vh - 250px)',
            overflow: 'auto',
            padding: '10px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
          }}>
            {videoLibrary.map((video) => (
              <div 
                key={video.id}
                onClick={() => playVideo(video)}
                style={{ 
                  cursor: 'pointer',
                  border: `1px solid ${theme.border}`,
                  padding: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  transition: 'background-color 0.2s'
                }}
                className="pip-boy-list-item"
              >
                {/* 视频缩略图占位符 */}
                <div style={{ 
                  height: '120px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ fontSize: '24px' }}>▶</div>
                </div>
                
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{video.title}</div>
                <div style={{ fontSize: '12px' }}>{video.duration}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaModule;
