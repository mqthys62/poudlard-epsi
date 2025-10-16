/**
 * Layout principal
 * Défi #15 - Hedwige
 */

import { Outlet, useNavigate } from 'react-router-dom';
import { Inbox, Edit, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">🦉 Hedwige</h1>
          <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/compose')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Edit className="w-5 h-5" />
            Nouveau message
          </button>

          <button
            onClick={() => navigate('/inbox')}
            className="w-full text-left px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition flex items-center gap-3"
          >
            <Inbox className="w-5 h-5" />
            Boîte de réception
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="w-full text-left px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition flex items-center gap-3"
          >
            <Settings className="w-5 h-5" />
            Paramètres
          </button>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-slate-700 transition flex items-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

