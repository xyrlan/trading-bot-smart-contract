'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { LayoutDashboard, TrendingUp, Bell, BarChart3 } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';
import strategiesApi from '@/lib/api/strategies';
import healthApi from '@/lib/api/health';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/strategies', label: 'Strategies', icon: TrendingUp },
  { href: '/dashboard/signals', label: 'Signals', icon: Bell },
  { href: '/dashboard/performance', label: 'Performance', icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { publicKey } = useWallet();
  const [activeStrategiesCount, setActiveStrategiesCount] = useState(0);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  useEffect(() => {
    if (!publicKey) return;

    const loadStats = async () => {
      try {
        const [strategies, health] = await Promise.all([
          strategiesApi.list(publicKey.toBase58(), { status: 'ACTIVE' }),
          healthApi.check().catch(() => null),
        ]);

        setActiveStrategiesCount(strategies.length);
        setIsBackendOnline(health?.status === 'ok');
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 10000);

    return () => clearInterval(interval);
  }, [publicKey]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card relative">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🤖</span>
            <h1 className="text-2xl font-bold text-primary">Trading Bot</h1>
          </div>
          <p className="text-sm text-muted-foreground">Smart Contract Dashboard</p>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const showBadge = item.href === '/dashboard/strategies' && activeStrategiesCount > 0;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-card-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {showBadge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                    {activeStrategiesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Status Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isBackendOnline ? 'bg-success animate-pulse' : 'bg-error'
            )} />
            <span className="text-muted-foreground">
              Backend {isBackendOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                {pathname !== '/dashboard' && (
                  <>
                    <span>/</span>
                    <span className="text-foreground font-medium">
                      {navItems.find((item) => pathname?.startsWith(item.href))?.label || 'Page'}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {navItems.find((item) => pathname === item.href)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {/* Backend Status Indicator */}
              {publicKey && (
                <div className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2',
                  isBackendOnline 
                    ? 'bg-success-muted text-success' 
                    : 'bg-error-muted text-error'
                )}>
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    isBackendOnline ? 'bg-success animate-pulse' : 'bg-error'
                  )} />
                  {isBackendOnline ? 'Sistema Online' : 'Sistema Offline'}
                </div>
              )}
              <WalletMultiButton />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
