import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  User,
  Radar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose?: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  onMobileClose,
  unreadCount = 2,
}) => {
  const mainNav = [
    { name: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Refund Tracker', to: '/app/refunds', icon: Receipt },
    { name: 'Orders & Receipts', to: '/app/orders', icon: ShoppingBag },
    { name: 'AI Assistant', to: '/app/assistant', icon: MessageSquare },
  ];

  const insightsNav = [
    { name: 'Analytics', to: '/app/analytics', icon: BarChart3 },
    { name: 'Notifications', to: '/app/notifications', icon: Bell, badge: unreadCount },
  ];

  const accountNav = [
    { name: 'Settings', to: '/app/settings', icon: Settings },
    { name: 'Profile', to: '/app/profile', icon: User },
  ];

  return (
    <aside
      className={clsx(
        'h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-30 shrink-0',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <NavLink
          to="/app/dashboard"
          className="flex items-center gap-3 overflow-hidden text-navy-900 group"
          onClick={onMobileClose}
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Radar className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                RefundRadar
                <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-slate-500 -mt-0.5">Consumer Fintech</span>
            </div>
          )}
        </NavLink>

        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Section */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Main
            </p>
          )}
          <nav className="space-y-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
                    collapsed && 'justify-center px-0'
                  )
                }
                title={collapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={clsx(
                        'w-5 h-5 shrink-0 transition-colors',
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Insights Section */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Insights
            </p>
          )}
          <nav className="space-y-1">
            {insightsNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
                    collapsed && 'justify-center px-0'
                  )
                }
                title={collapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={clsx(
                        'w-5 h-5 shrink-0 transition-colors',
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                    {item.badge && item.badge > 0 && (
                      <span
                        className={clsx(
                          'ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700',
                          collapsed && 'absolute top-1 right-2 w-2 h-2 p-0 rounded-full bg-blue-600'
                        )}
                      >
                        {!collapsed && item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Account Section */}
        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Account
            </p>
          )}
          <nav className="space-y-1">
            {accountNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
                    collapsed && 'justify-center px-0'
                  )
                }
                title={collapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={clsx(
                        'w-5 h-5 shrink-0 transition-colors',
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Info & Toggle */}
      <div className="p-3 border-t border-slate-100 flex flex-col gap-2">
        {!collapsed && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-[11px] leading-tight text-slate-600">
              <span className="font-semibold text-slate-800">PayPal Sandbox Ready</span>
              <p className="text-slate-600">Demo active data</p>
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          className="hidden md:flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors w-full"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <div className="flex items-center gap-2 text-xs text-slate-500"><ChevronLeft className="w-4 h-4" /> <span>Collapse Sidebar</span></div>}
        </button>
      </div>
    </aside>
  );
};

