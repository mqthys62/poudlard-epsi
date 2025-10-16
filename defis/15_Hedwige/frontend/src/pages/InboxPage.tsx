/**
 * Page Inbox - Liste des emails
 * Défi #15 - Hedwige
 */

import { useQuery } from '@tanstack/react-query';
import { Mail, Search } from 'lucide-react';
import { PatronusLoader } from '../components/PatronusLoader';
import EmailList from '../components/EmailList';
import { useState } from 'react';

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['emails', 'inbox'],
    queryFn: async () => {
      // Fetch emails from API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/emails?folder=inbox`);
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <PatronusLoader size="medium" variant="loading" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Boîte de réception
          </h1>
          <span className="text-sm text-slate-400">
            {data?.total || 0} messages
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher des emails..."
            className="w-full pl-12 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        <EmailList emails={data?.emails || []} />
      </div>
    </div>
  );
}

