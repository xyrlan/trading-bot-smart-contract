'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { TradeSignal } from '@/lib/types/strategy';

interface SignalsTimelineProps {
  signals: TradeSignal[];
  limit?: number;
}

export function SignalsTimeline({ signals, limit = 10 }: SignalsTimelineProps) {
  const displaySignals = signals.slice(0, limit);

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="h-5 w-5 text-success" />;
      case 'SELL':
        return <TrendingDown className="h-5 w-5 text-error" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'border-success bg-success-muted';
      case 'SELL':
        return 'border-error bg-error-muted';
      default:
        return 'border-border bg-muted';
    }
  };

  const getSignalTextColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'text-success';
      case 'SELL':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  if (displaySignals.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No signals to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displaySignals.map((signal, index) => (
        <div key={signal.id} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full p-2 border-2 ${getSignalColor(signal.signal)}`}
            >
              {getSignalIcon(signal.signal)}
            </div>
            {index < displaySignals.length - 1 && (
              <div className="w-0.5 flex-1 bg-border my-2" />
            )}
          </div>

          {/* Signal content */}
          <div className="flex-1 pb-8">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span
                    className={`font-semibold text-lg ${getSignalTextColor(
                      signal.signal
                    )}`}
                  >
                    {signal.signal}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confidence: {(signal.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{new Date(signal.createdAt).toLocaleDateString()}</p>
                  <p>{new Date(signal.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2">{signal.reason}</p>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  Price: <span className="font-medium text-card-foreground">${signal.price.toFixed(4)}</span>
                </span>
                {signal.executed && (
                  <span className="rounded-full bg-success-muted text-success px-2 py-1 text-xs font-medium">
                    Executed
                  </span>
                )}
                {signal.txSignature && (
                  <a
                    href={`https://explorer.solana.com/tx/${signal.txSignature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs"
                  >
                    View Transaction
                  </a>
                )}
              </div>

              {signal.indicators && Object.keys(signal.indicators).length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Indicator Values:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(signal.indicators).map(([key, value]) => (
                      <div
                        key={key}
                        className="text-xs bg-muted rounded px-2 py-1"
                      >
                        <span className="text-muted-foreground">{key}:</span>{' '}
                        <span className="font-medium text-card-foreground">
                          {typeof value === 'number' ? value.toFixed(2) : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {signals.length > limit && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {limit} of {signals.length} signals
        </div>
      )}
    </div>
  );
}
