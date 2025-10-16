/**
 * Liste des emails
 * Défi #15 - Hedwige
 */

import { useNavigate } from 'react-router-dom';
import { Mail, Star } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
}

interface EmailListProps {
  emails: Email[];
}

export default function EmailList({ emails }: EmailListProps) {
  const navigate = useNavigate();

  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <Mail className="w-16 h-16 mb-4" />
        <p>Aucun email</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-700">
      {emails.map((email) => (
        <div
          key={email.id}
          onClick={() => navigate(`/email/${email.id}`)}
          className={`p-4 hover:bg-slate-800 cursor-pointer transition ${
            !email.isRead ? 'bg-slate-800/30' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Star */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Toggle star
              }}
              className="mt-1"
            >
              <Star
                className={`w-5 h-5 ${
                  email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
                }`}
              />
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <h3
                  className={`font-medium truncate ${
                    !email.isRead ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {email.from}
                </h3>
                <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {format(new Date(email.createdAt), 'dd MMM', { locale: fr })}
                </span>
              </div>
              <p
                className={`text-sm truncate ${
                  !email.isRead ? 'text-white' : 'text-slate-400'
                }`}
              >
                {email.subject}
              </p>
              <p className="text-sm text-slate-500 truncate mt-1">{email.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

