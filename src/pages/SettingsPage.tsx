import React, { useState } from 'react';
import {
  Bell,
  Shield,
  CreditCard,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { SettingsSection } from '../components/settings/SettingsSection';
import { ToggleSwitch } from '../components/settings/ToggleSwitch';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { useApp } from '../context';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, syncPayPalSandbox, resetData } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'paypal' | 'security'>('paypal');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Settings saved successfully.');

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(settings.emailAlerts);
  const [pushAlerts, setPushAlerts] = useState(settings.pushAlerts);
  const [statusChanges, setStatusChanges] = useState(settings.statusChanges);
  const [digest, setDigest] = useState(settings.digest);

  // PayPal states
  const [sandboxSyncing, setSandboxSyncing] = useState(false);
  const [clientId, setClientId] = useState(settings.clientId);

  // General settings
  const [currency, setCurrency] = useState(settings.currency);
  const [timezone, setTimezone] = useState(settings.timezone);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSave = () => {
    updateSettings({
      clientId,
      emailAlerts,
      pushAlerts,
      statusChanges,
      digest,
      currency,
      timezone,
    });
    showSuccess('Settings saved successfully.');
  };

  const handleSyncSandbox = async () => {
    setSandboxSyncing(true);
    await syncPayPalSandbox();
    setSandboxSyncing(false);
    showSuccess('PayPal Sandbox pinged and synchronized.');
  };

  const handleClearCache = () => {
    resetData();
    showSuccess('Local demo cache reset to original state.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          System & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure PayPal sandbox endpoints, automated notifications, and localization.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side Tab Navigation */}
        <div className="w-full md:w-56 shrink-0 space-y-1">
          {[
            { id: 'paypal', label: 'PayPal Integration', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'general', label: 'General & Locale', icon: Sliders },
            { id: 'security', label: 'Security & Privacy', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
            >
              <tab.icon
                className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'
                  }`}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'paypal' && (
            <SettingsSection
              title="PayPal Developer Sandbox Configuration"
              description="Configure credentials and simulate webhook synchronizations for the PayPal AI Hackathon 2026."
            >
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black italic">
                      P
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        PayPal Sandbox Environment
                      </h4>
                      <p className="text-xs text-slate-500">
                        Status: <span className="text-emerald-600 font-semibold">Active & Connected</span>
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    loading={sandboxSyncing}
                    onClick={handleSyncSandbox}
                    icon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Test Ping
                  </Button>
                </div>

                <Input
                  label="PayPal Sandbox Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  helperText="Client ID from developer.paypal.com dashboard."
                />

                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Frontend Sandbox Architecture
                  </span>
                  <p className="text-blue-700 leading-relaxed text-[11px]">
                    All mock refund updates reflect real PayPal sandbox transaction models (`v1/payments/refund`). When backend secrets are attached, webhooks will update this state automatically.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button variant="primary" onClick={handleSave}>
                    Save PayPal Settings
                  </Button>
                </div>
              </div>
            </SettingsSection>
          )}

          {activeTab === 'notifications' && (
            <SettingsSection
              title="Alert Preferences"
              description="Customize how and when RefundRadar AI reaches out to you."
            >
              <div className="divide-y divide-slate-100">
                <ToggleSwitch
                  checked={emailAlerts}
                  onChange={setEmailAlerts}
                  label="Email Notifications"
                  description="Receive instantaneous email alerts when a refund changes status."
                />
                <ToggleSwitch
                  checked={pushAlerts}
                  onChange={setPushAlerts}
                  label="Browser Push Alerts"
                  description="Display real-time desktop notifications when refunds are deposited."
                />
                <ToggleSwitch
                  checked={statusChanges}
                  onChange={setStatusChanges}
                  label="Merchant Follow-up Reminders"
                  description="Notify when a retailer has failed to respond after 5 business days."
                />
                <ToggleSwitch
                  checked={digest}
                  onChange={setDigest}
                  label="Weekly Financial Digest"
                  description="Weekly summary of in-flight and recovered money."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button variant="primary" onClick={handleSave}>
                  Save Alert Settings
                </Button>
              </div>
            </SettingsSection>
          )}

          {activeTab === 'general' && (
            <SettingsSection
              title="Regional & Display Preferences"
              description="Localization options for currencies, timezones, and number formats."
            >
              <div className="space-y-4">
                <Select
                  label="Preferred Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  options={[
                    { label: 'USD ($) - US Dollar', value: 'USD' },
                    { label: 'EUR (€) - Euro', value: 'EUR' },
                    { label: 'GBP (£) - British Pound', value: 'GBP' },
                    { label: 'CAD ($) - Canadian Dollar', value: 'CAD' },
                  ]}
                />

                <Select
                  label="Timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  options={[
                    { label: 'Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
                    { label: 'Eastern Time (US & Canada)', value: 'America/New_York' },
                    { label: 'UTC', value: 'UTC' },
                    { label: 'Central European Time', value: 'Europe/Paris' },
                  ]}
                />

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button variant="primary" onClick={handleSave}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </SettingsSection>
          )}

          {activeTab === 'security' && (
            <SettingsSection
              title="Privacy & Security Safeguards"
              description="Manage password, cryptographic keys, and demo sessions."
            >
              <div className="space-y-4 text-xs text-slate-600">
                <p>
                  RefundRadar AI is built with client-side credential isolation. No financial credentials or bank passwords are saved in unencrypted state.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900">Active Demo Session</h5>
                    <p className="text-slate-500 text-[11px]">Logged in as Alex Morgan (demo token)</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => showSuccess('Demo session token rotated.')}>
                    Rotate Token
                  </Button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <Button variant="danger" size="sm" onClick={handleClearCache}>
                    Reset Demo State & Cache
                  </Button>
                </div>
              </div>
            </SettingsSection>
          )}
        </div>
      </div>
    </div>
  );
};
