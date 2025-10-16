/**
 * Page détail d'un email
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Reply, Trash } from 'lucide-react';
import { PatronusLoader } from '../components/PatronusLoader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function EmailDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: email, isLoading } = useQuery({
    queryKey: ['email', id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/emails/${id}`);
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
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 p-6">
        <button
          onClick={() => navigate('/inbox')}
          className="text-slate-400 hover:text-white mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <h1 className="text-2xl font-bold text-white">{email.subject}</h1>
        <p className="text-sm text-slate-400 mt-2">
          De : {email.from} • {format(new Date(email.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-invert max-w-none">
          {email.html ? (
            <div dangerouslySetInnerHTML={{ __html: email.html }} />
          ) : (
            <p className="text-slate-300 whitespace-pre-wrap">{email.body}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-slate-700 p-6 flex gap-3">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition">
          <Reply className="w-5 h-5" />
          Répondre
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition">
          <Trash className="w-5 h-5" />
          Supprimer
        </button>
      </div>
    </div>
  );
}

