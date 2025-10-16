/**
 * Page Composer - Rédiger un email
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X } from 'lucide-react';

export default function ComposePage() {
  const navigate = useNavigate();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send email via API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/inbox');
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Nouveau message</h1>
        <button onClick={() => navigate('/inbox')} className="text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSend} className="flex-1 flex flex-col">
        <div className="p-6 space-y-4">
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="À :"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sujet :"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Écrivez votre message..."
            className="w-full h-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        {/* Actions */}
        <div className="border-t border-slate-700 p-6">
          <button
            type="submit"
            disabled={sending}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {sending ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}

