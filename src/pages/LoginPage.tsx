import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radar, Eye, EyeOff, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/app/dashboard');
    }, 600);
  };

  const handlePayPalAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/app/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Brand Panel */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Radar className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight flex items-center gap-1.5">
                RefundRadar
                <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  AI
                </span>
              </span>
            </div>
          </Link>

          <div className="mt-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              "Your money shouldn't need a missing-person report."
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Track multi-merchant refunds, understand delays with explainable AI, and monitor PayPal transactions in real time.
            </p>
          </div>

          <div className="mt-10 space-y-3.5">
            {[
              'Autonomous status tracking across Amazon, Apple & more',
              'AI Assistant explains merchant jargon into plain English',
              'Direct PayPal Sandbox readiness for real-time reconciliation',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Built for PayPal AI Hackathon 2026</span>
          </div>
          <span>v1.0 Demo</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Radar className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-900">RefundRadar AI</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Enter your credentials to manage your refund pipeline.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* PayPal Quick Sign-in */}
          <div>
            <button
              type="button"
              onClick={handlePayPalAuth}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-xs"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500 text-[10px] font-black flex items-center justify-center text-white italic">
                P
              </div>
              <span>Continue with PayPal Demo</span>
            </button>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-white text-xs text-slate-400 uppercase tracking-wider">
                Or sign in with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me for 30 days</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Demo account: alex.morgan@email.com / demo1234')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Sign In to RefundRadar
            </Button>
          </form>

          {/* Demo credential helper pill */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Demo credentials prefilled</span>
            </div>
            <span className="font-mono text-[11px] text-blue-600 font-medium">Auto-fill ready</span>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

