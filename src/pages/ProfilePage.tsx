import React, { useState } from 'react';
import { Mail, ShieldCheck, Calendar, DollarSign, Receipt, CheckCircle2 } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useApp } from '../context';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, refunds, stats } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar name={name} size="lg" className="w-16 h-16 sm:w-20 sm:h-20 text-xl font-bold" />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Verified Pro
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{email}</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Member since September 2026</span>
            </p>
          </div>
        </div>

        <Button
          variant={isEditing ? 'outline' : 'primary'}
          size="md"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes successfully applied.</span>
        </div>
      )}

      {/* Profile Form (if editing) or Summary Stats */}
      {isEditing ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Personal Information
          </h2>
          <form onSubmit={handleSave} className="space-y-4 max-w-lg">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Primary email used for refund status notifications."
              required
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              helperText="Optional for SMS follow-up alerts."
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <Receipt className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900">
              {refunds.length}
            </span>
            <p className="text-xs text-slate-500 font-medium">Claims Tracked</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900">
              ${stats.totalRefundAmount.toFixed(2)}
            </span>
            <p className="text-xs text-slate-500 font-medium">Dollars Tracked</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-2xl font-black text-slate-900">100%</span>
            <p className="text-xs text-slate-500 font-medium">PayPal Sandbox Linked</p>
          </div>
        </div>
      )}

      {/* Connected Accounts Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Linked Payment Services
        </h3>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black italic">
              P
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">PayPal Account</h4>
              <p className="text-xs text-slate-500">Connected as {email}</p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

