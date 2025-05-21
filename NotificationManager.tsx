import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SoundType } from '../../../shared/types';

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  icon?: string;
  onDismiss: (id: string) => void;
  onAction?: () => void;
  actionText?: string;
}

const Notification: React.FC<NotificationProps> = ({ 
  id, 
  title, 
  message, 
  icon, 
  onDismiss,
  onAction,
  actionText
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  
  // 自动关闭通知
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(id), 300); // 等待动画完成后移除
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [id, onDismiss]);
  
  return (
    <div 
      className="notification"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'opacity 0.3s, transform 0.3s',
        border: `2px solid ${theme.primary}`,
        backgroundColor: theme.background,
        color: theme.textPrimary
      }}
    >
      <div style={{ 
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '10px'
      }}>
        {icon && (
          <div style={{ 
            width: '24px',
            height: '24px',
            marginRight: '10px',
            border: `1px solid ${theme.primary}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {icon.charAt(0)}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontWeight: 'bold',
            marginBottom: '5px',
            textTransform: 'uppercase'
          }}>
            {title}
          </div>
          <div>{message}</div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onDismiss(id), 300);
          }}
          style={{ 
            background: 'none',
            border: 'none',
            color: theme.primary,
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0 5px'
          }}
        >
          ×
        </button>
      </div>
      
      {onAction && actionText && (
        <button 
          className="pip-boy-button"
          onClick={() => {
            onAction();
            setIsVisible(false);
            setTimeout(() => onDismiss(id), 300);
          }}
          style={{ width: '100%' }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// 通知管理器
export const NotificationManager = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // 添加通知
  const addNotification = (notification: Omit<NotificationProps, 'id' | 'onDismiss'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // 播放通知音效
    playSound(SoundType.CONFIRM);
    
    return id;
  };
  
  // 移除通知
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  // 播放音效
  const playSound = (type: SoundType) => {
    // 在实际应用中，这里会调用音效系统播放声音
    console.log('播放音效:', type);
  };
  
  return {
    notifications,
    addNotification,
    removeNotification,
    NotificationContainer: () => (
      <div style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onDismiss={removeNotification}
          />
        ))}
      </div>
    )
  };
};

export default NotificationManager;
