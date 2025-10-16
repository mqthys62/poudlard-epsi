/**
 * Page paramètres
 */

import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6" />
          Paramètres
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Compte</h2>
          <div className="bg-slate-800 rounded-lg p-4 mb-6">
            <p className="text-slate-300">Gérez votre compte et vos préférences</p>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Services connectés</h2>
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-slate-300">OAuth2.0 : Google, Microsoft, GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}

