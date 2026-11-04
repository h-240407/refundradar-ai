import React from 'react';
import { Clock, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import type { Notification, NotificationType } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onClickAction?: (notification: Notification) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onClickAction,
}) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'refund_update':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <Info className="w-4 h-4 text-purple-600" />;
    }
  };

  const getIconBg = (type: NotificationType) => {
    switch (type) {
      case 'refund_update':
        return 'bg-emerald-50';
      case 'reminder':
        return 'bg-blue-50';
      case 'alert':
        return 'bg-rose-50';
      default:
        return 'bg-purple-50';
    }
  };

  return (
    <div
      onClick={() => {
        if (!notification.read) onMarkAsRead(notification.id);
        if (onClickAction) onClickAction(notification);
      }}
      className={clsx(
        'p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5',
        notification.read
          ? 'bg-white border-slate-200/80 hover:border-slate-300'
          : 'bg-blue-50/40 border-blue-200 shadow-xs'
      )}
    >
      <div
        className={clsx(
          'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
          getIconBg(notification.type)
        )}
      >
        {getIcon(notification.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={clsx(
              'text-xs sm:text-sm font-semibold truncate',
              notification.read ? 'text-slate-800' : 'text-slate-900 font-bold'
            )}
          >
            {notification.title}
          </h4>
          <span className="text-[10px] text-slate-400 shrink-0">
            {notification.timestamp}
          </span>
        </div>

        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
      )}
    </div>
  );
};

