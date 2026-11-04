import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Radar,
  Menu,
  X,
  ArrowRight,
  BarChart3,
  Brain,
  CreditCard,
  Clock,
  PieChart,
  BellRing,
  Shield,
  CheckCircle,
  Lock,
  FileCheck,
  ChevronDown,
  Globe,
  Share2,
  Code2,
  Zap,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import clsx from 'clsx';

// ============================================================
// Intersection Observer hook for fade-in animations
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ============================================================
// Section wrapper with fade-in
// ============================================================
function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={clsx(
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </section>
  );
}

// ============================================================
// FAQ Accordion Item
// ============================================================
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown
          className={clsx(
            'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300',
            open && 'rotate-180 text-blue-500'
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-64 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// ============================================================
// Mini Dashboard Preview (Hero)
// ============================================================
function MiniDashboardPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2 font-medium">RefundRadar Dashboard</span>
        </div>

        <div className="p-4 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Active', value: '$1,284', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Recovered', value: '$8,492', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Pending', value: '7', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((s) => (
              <div key={s.label} className={clsx('rounded-xl p-3', s.bg)}>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{s.label}</p>
                <p className={clsx('text-lg font-bold mt-0.5', s.color)}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Mini chart placeholder */}
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-700">Monthly Recovery</span>
              <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +24%
              </span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {[35, 50, 40, 65, 55, 80, 70, 90, 85, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-blue-400 opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Recent refunds */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-700">Recent Refunds</span>
            {[
              { name: 'Amazon', amount: '$89.99', status: 'Completed', statusColor: 'text-emerald-600 bg-emerald-50' },
              { name: 'Nike Store', amount: '$149.00', status: 'Processing', statusColor: 'text-blue-600 bg-blue-50' },
              { name: 'Best Buy', amount: '$234.50', status: 'Action Needed', statusColor: 'text-amber-600 bg-amber-50' },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">{r.name}</p>
                    <p className="text-[10px] text-slate-400">{r.amount}</p>
                  </div>
                </div>
                <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', r.statusColor)}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Large Dashboard Preview (section)
// ============================================================
function LargeDashboardPreview() {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 rounded-3xl blur-3xl pointer-events-none" />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2 font-medium">app.refundradar.ai/dashboard</span>
        </div>

        <div className="p-6">
          {/* Top stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Refunds', value: '47', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Recovered', value: '$8,492', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Pending', value: '$1,284', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', s.bg)}>
                    <s.icon className={clsx('w-4 h-4', s.color)} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chart area */}
            <div className="md:col-span-2 rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-800">Refund Trends</span>
                <span className="text-xs text-slate-400">Last 6 months</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {[45, 60, 50, 75, 65, 90, 80, 95, 85, 100, 70, 88].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-400"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m} className="text-[9px] text-slate-400 flex-1 text-center">{m}</span>
                ))}
              </div>
            </div>

            {/* AI Insights sidebar */}
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-semibold text-slate-800">AI Insights</span>
              </div>
              <div className="space-y-3">
                {[
                  { text: 'Nike refund may need escalation', type: 'warning', color: 'border-amber-300 bg-amber-50' },
                  { text: 'Amazon refund approved!', type: 'success', color: 'border-emerald-300 bg-emerald-50' },
                  { text: 'You recover refunds 3x faster', type: 'tip', color: 'border-blue-300 bg-blue-50' },
                ].map((insight) => (
                  <div
                    key={insight.text}
                    className={clsx('rounded-lg border p-2.5 text-xs text-slate-700', insight.color)}
                  >
                    {insight.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FEATURES DATA
// ============================================================
const features = [
  {
    icon: BarChart3,
    title: 'Smart Refund Tracking',
    description: 'Track every refund in one place with real-time status updates.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get intelligent analysis and recommendations for your refunds.',
  },
  {
    icon: CreditCard,
    title: 'PayPal Integration',
    description: 'Connect your PayPal account for automatic transaction syncing.',
  },
  {
    icon: Clock,
    title: 'Refund Timeline',
    description: 'Visual timeline showing every step of your refund journey.',
  },
  {
    icon: PieChart,
    title: 'Analytics Dashboard',
    description: 'Understand your refund patterns with beautiful visualizations.',
  },
  {
    icon: BellRing,
    title: 'Smart Notifications',
    description: 'Never miss a refund update with intelligent alerts.',
  },
];

// ============================================================
// STEPS DATA
// ============================================================
const steps = [
  {
    number: 1,
    title: 'Connect Your Account',
    description: 'Link your PayPal and start importing transactions.',
  },
  {
    number: 2,
    title: 'Track Your Refunds',
    description: 'Monitor every refund with AI-powered status tracking.',
  },
  {
    number: 3,
    title: 'Get Your Money Back',
    description: 'Receive insights and guidance to resolve refunds faster.',
  },
];

// ============================================================
// FAQ DATA
// ============================================================
const faqs = [
  {
    question: 'What is RefundRadar AI?',
    answer:
      'RefundRadar AI is a smart refund management platform that tracks your online purchase refunds, provides AI-powered insights, and helps you resolve delayed or disputed refunds faster. Think of it as a personal assistant for your money.',
  },
  {
    question: 'How does the AI assistant work?',
    answer:
      'Our AI assistant analyzes your refund history and status to provide personalized recommendations. It can draft dispute messages, suggest escalation paths, and predict when your refund will arrive — all tailored to your specific situation.',
  },
  {
    question: 'Is my financial data secure?',
    answer:
      'Absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. We never store your PayPal credentials — we use OAuth 2.0 for secure, revocable access. Your data is never sold or shared with third parties.',
  },
  {
    question: 'How does PayPal integration work?',
    answer:
      'You connect your PayPal account through a secure OAuth flow. Once connected, RefundRadar AI automatically imports your transaction history and monitors for refund-related activity. You can disconnect at any time from your settings.',
  },
  {
    question: 'Is RefundRadar AI free?',
    answer:
      'RefundRadar AI is currently in beta and free to use during this period. We plan to offer a generous free tier alongside premium plans with advanced features like priority AI analysis and extended refund history.',
  },
  {
    question: "What if I don't use PayPal?",
    answer:
      "Currently, RefundRadar AI supports PayPal integration. We're actively working on adding support for Stripe, Shopify, and direct bank connections. You can manually track refunds from any merchant in the meantime.",
  },
];

// ============================================================
// TRUST DATA
// ============================================================
const trustPoints = [
  { icon: Shield, label: 'Bank-Level Encryption' },
  { icon: CheckCircle, label: 'PayPal Verified' },
  { icon: Lock, label: 'No Data Selling' },
  { icon: FileCheck, label: 'GDPR Compliant' },
];

// ============================================================
// MAIN LANDING PAGE
// ============================================================
export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth">
      {/* ======== NAVIGATION ======== */}
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-white/80 backdrop-blur-xs border-b border-slate-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                <Radar className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">
                Refund<span className="text-blue-600">Radar</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollTo('features')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            'md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-100',
            mobileMenuOpen ? 'max-h-80' : 'max-h-0'
          )}
        >
          <div className="px-4 pb-4 space-y-2">
            <button
              onClick={() => scrollTo('features')}
              className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              FAQ
            </button>
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 text-center rounded-lg"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* ======== HERO SECTION ======== */}
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left – copy */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium mb-6">
                  <Zap className="w-3.5 h-3.5" />
                  AI-Powered Refund Tracking
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight text-slate-900">
                  Your Money Shouldn&apos;t Need a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Missing-Person Report
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  RefundRadar AI tracks your refunds, explains what&apos;s happening, and helps you
                  figure out your next move. Less chasing. More knowing.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    Start Tracking Refunds
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => scrollTo('how-it-works')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    See How It Works
                  </button>
                </div>
              </div>

              {/* Right – dashboard preview */}
              <div className="hidden lg:block">
                <MiniDashboardPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ======== STATS BAR ======== */}
        <AnimatedSection className="py-12 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500 mb-6 font-medium">
              Trusted by 10,000+ online shoppers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              {[
                { icon: BarChart3, value: '50,000+', label: 'Refunds Tracked' },
                { icon: DollarSign, value: '$2.5M+', label: 'Recovered' },
                { icon: Users, value: '98%', label: 'User Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <stat.icon className="w-5 h-5 text-blue-500" />
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ======== FEATURES SECTION ======== */}
        <AnimatedSection id="features" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Everything you need to manage refunds
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Powerful tools that make refund tracking effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center mb-4 group-hover:from-blue-100 group-hover:to-violet-100 transition-colors">
                    <f.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ======== HOW IT WORKS ======== */}
        <AnimatedSection id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Start in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Get up and running in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, idx) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  {/* Connector line (hidden on mobile & last item) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-blue-100 pointer-events-none -z-0" />
                  )}

                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/25 mb-5">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-xs leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ======== DASHBOARD PREVIEW SECTION ======== */}
        <AnimatedSection className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                A smarter way to track refunds
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                See all your refunds, orders, and insights in one beautiful dashboard.
              </p>
            </div>

            <LargeDashboardPreview />
          </div>
        </AnimatedSection>

        {/* ======== TRUST & SECURITY ======== */}
        <AnimatedSection className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Your data, your control
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Security isn&apos;t an afterthought — it&apos;s built into everything we do.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustPoints.map((tp) => (
                <div
                  key={tp.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 flex items-center justify-center mb-4">
                    <tp.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{tp.label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ======== FAQ SECTION ======== */}
        <AnimatedSection id="faq" className="py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Everything you need to know about RefundRadar AI.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ======== FINAL CTA ======== */}
        <AnimatedSection className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />

              <div className="relative text-center py-16 px-6 sm:py-20 sm:px-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Ready to stop chasing refunds?
                </h2>
                <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
                  Join thousands of shoppers who track and recover their refunds effortlessly with
                  RefundRadar AI.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Get Started Free
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* ======== FOOTER ======== */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Radar className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  Refund<span className="text-blue-400">Radar</span>
                </span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">
                AI-powered refund tracking and recovery for smarter online shoppers.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                {[
                  { icon: Globe, label: 'Website' },
                  { icon: Share2, label: 'Share' },
                  { icon: Code2, label: 'GitHub' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Features', 'Pricing', 'FAQ'].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() =>
                        scrollTo(l === 'Features' ? 'features' : l === 'FAQ' ? 'faq' : 'features')
                      }
                      className="text-sm hover:text-white transition-colors cursor-pointer"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About', 'Contact', 'Blog'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {['Privacy', 'Terms', 'Cookies'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-xs text-slate-500">
              &copy; 2026 RefundRadar AI. All rights reserved.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
              <Zap className="w-3 h-3 text-amber-400" />
              Built for PayPal AI Hackathon 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
