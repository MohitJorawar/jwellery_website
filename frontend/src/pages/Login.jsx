import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = ({ onNavigate }) => {
  const { login, register, user, logout, isAdmin } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isRegistering) {
      const res = await register(name, email, password);
      if (!res.success) setError(res.message);
      else onNavigate('home');
    } else {
      const res = await login(email, password);
      if (!res.success) setError(res.message);
      else {
        if (email.toLowerCase().includes('admin')) {
          onNavigate('admin');
        } else {
          onNavigate('home');
        }
      }
    }
    setLoading(false);
  };

  // Quick Demo Logins for Client Testing
  const handleQuickAdmin = async () => {
    setLoading(true);
    setError('');
    const res = await login('admin@jaishree.com', 'admin123');
    if (res.success) onNavigate('admin');
    else setError(res.message);
    setLoading(false);
  };

  const handleQuickCustomer = async () => {
    setLoading(true);
    setError('');
    const res = await login('client@example.com', 'client123');
    if (res.success) onNavigate('home');
    else setError(res.message);
    setLoading(false);
  };

  if (user) {
    return (
      <div className="luxury-container py-20 max-w-lg mx-auto">
        <div className="bg-[#121218] border border-white/10 p-8 rounded-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
            <User size={30} />
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase text-[#d4af37] font-semibold">
              Authenticated Session
            </span>
            <h2 className="font-serif text-3xl text-white mt-1">{user.name}</h2>
            <p className="text-xs text-white/50">{user.email}</p>
            {isAdmin && (
              <span className="inline-block mt-2 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                👑 Store Administrator
              </span>
            )}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            {isAdmin && (
              <button onClick={() => onNavigate('admin')} className="btn-gold text-xs py-3">
                Access Admin Dashboard
              </button>
            )}
            <button onClick={() => onNavigate('shop')} className="btn-outline-gold text-xs py-2.5">
              Browse Collections
            </button>
            <button
              onClick={logout}
              className="text-xs text-red-400 hover:text-red-300 py-2 transition-colors"
            >
              Sign Out of Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-container py-16 max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles size={12} /> JaiShree Jwellers Privilege Access
        </span>
        <h1 className="font-serif text-3xl text-white">
          {isRegistering ? 'Create Client Dossier' : 'Sign In to Your Vault'}
        </h1>
        <p className="text-xs text-white/50">
          Manage your orders, bespoke jewelry inquiries, and registered heirlooms.
        </p>
      </div>

      {/* Demo Credentials Quick Switcher Banner */}
      <div className="bg-[#181822] border border-[#d4af37]/40 p-4 rounded-xs text-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#d4af37] flex items-center gap-1">
            ⚡ Quick Demo Logins:
          </span>
          <span className="text-[10px] text-white/40">Ready for Instant Evaluation</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleQuickAdmin}
            className="bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/40 p-2 rounded-xs text-[11px] font-semibold transition-colors"
          >
            👑 Admin Demo
          </button>
          <button
            type="button"
            onClick={handleQuickCustomer}
            className="bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 p-2 rounded-xs text-[11px] font-medium transition-colors"
          >
            🛍️ Customer Demo
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-[#121218] border border-white/10 p-8 rounded-xs space-y-5">
        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegistering && (
            <div>
              <label className="text-white/70 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181822] border border-white/15 text-white pl-8 p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
                <User size={14} className="absolute left-2.5 top-3 text-white/40" />
              </div>
            </div>
          )}

          <div>
            <label className="text-white/70 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181822] border border-white/15 text-white pl-8 p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
              />
              <Mail size={14} className="absolute left-2.5 top-3 text-white/40" />
            </div>
          </div>

          <div>
            <label className="text-white/70 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181822] border border-white/15 text-white pl-8 p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
              />
              <Lock size={14} className="absolute left-2.5 top-3 text-white/40" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 text-xs tracking-widest uppercase mt-2 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : (isRegistering ? 'Register Account' : 'Sign In')}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-xs text-white/60">
          {isRegistering ? (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-[#d4af37] hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to JaiShree Jwellers?{' '}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-[#d4af37] hover:underline font-medium"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
