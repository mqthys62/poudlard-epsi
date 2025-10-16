/**
 * Page de connexion
 * Défi #15 - Hedwige
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PatronusLoader } from '../components/PatronusLoader';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Appel API (simulé pour le moment)
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      login(data.user, data.accessToken, data.refreshToken);
      navigate('/inbox');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/oauth/${provider}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <PatronusLoader size="large" variant="loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🦉 Hedwige</h1>
          <p className="text-blue-200">Votre messagerie magique</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-5 h-5" />
              Se connecter
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-blue-200">Ou continuer avec</span>
            </div>
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleOAuth('google')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 rounded-lg transition"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuth('microsoft')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 rounded-lg transition"
            >
              Microsoft
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 rounded-lg transition"
            >
              GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200 mt-6 text-sm">
          Défi #15 - Workshop Poudlard RP 2025 🦅
        </p>
      </div>
    </div>
  );
}

