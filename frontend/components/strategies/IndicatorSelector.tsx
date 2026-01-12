'use client';

import { useState } from 'react';
import { Plus, Trash2, Info } from 'lucide-react';
import type { IndicatorConfig, IndicatorType } from '@/lib/types/strategy';

interface IndicatorSelectorProps {
  indicators: IndicatorConfig[];
  onChange: (indicators: IndicatorConfig[]) => void;
}

const indicatorDefaults = {
  rsi: { period: 14, oversold: 30, overbought: 70 },
  macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
  bollinger: { period: 20, stdDev: 2 },
};

const indicatorInfo = {
  rsi: 'RSI (Relative Strength Index) measures momentum. Values below 30 indicate oversold, above 70 overbought.',
  macd: 'MACD (Moving Average Convergence Divergence) shows trend direction and momentum through line crossovers.',
  bollinger: 'Bollinger Bands measure volatility. Price touching upper/lower bands indicates potential reversal.',
};

export function IndicatorSelector({ indicators, onChange }: IndicatorSelectorProps) {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const addIndicator = (type: IndicatorType) => {
    const newIndicator: IndicatorConfig = {
      type,
      weight: 1,
      params: indicatorDefaults[type],
    };
    onChange([...indicators, newIndicator]);
  };

  const removeIndicator = (index: number) => {
    onChange(indicators.filter((_, i) => i !== index));
  };

  const updateIndicator = (index: number, updates: Partial<IndicatorConfig>) => {
    onChange(
      indicators.map((ind, i) => (i === index ? { ...ind, ...updates } : ind))
    );
  };

  const availableIndicators: IndicatorType[] = ['rsi', 'macd', 'bollinger'];
  const usedTypes = indicators.map((i) => i.type);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Technical Indicators</h3>
        <div className="flex gap-2">
          {availableIndicators.map((type) => (
            <button
              key={type}
              onClick={() => addIndicator(type)}
              disabled={usedTypes.includes(type)}
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="inline h-4 w-4 mr-1" />
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {indicators.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">
            No indicators added yet. Click above to add RSI, MACD, or Bollinger Bands.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-card-foreground">{indicator.type.toUpperCase()}</h4>
                <button
                  onClick={() => setShowInfo(showInfo === indicator.type ? null : indicator.type)}
                  className="text-muted-foreground hover:text-card-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => removeIndicator(index)}
                className="text-error hover:text-error/80"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {showInfo === indicator.type && (
              <div className="mb-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
                {indicatorInfo[indicator.type]}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-card-foreground">Weight</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={indicator.weight}
                  onChange={(e) =>
                    updateIndicator(index, { weight: parseInt(e.target.value) })
                  }
                  className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                />
              </div>

              {indicator.type === 'rsi' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Period</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      value={(indicator.params as any).period}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, period: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Oversold</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={(indicator.params as any).oversold}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, oversold: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Overbought</label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={(indicator.params as any).overbought}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, overbought: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                </>
              )}

              {indicator.type === 'macd' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Fast Period</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      value={(indicator.params as any).fastPeriod}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, fastPeriod: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Slow Period</label>
                    <input
                      type="number"
                      min="2"
                      max="100"
                      value={(indicator.params as any).slowPeriod}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, slowPeriod: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Signal Period</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      value={(indicator.params as any).signalPeriod}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, signalPeriod: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                </>
              )}

              {indicator.type === 'bollinger' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Period</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      value={(indicator.params as any).period}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, period: parseInt(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Std Deviation</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={(indicator.params as any).stdDev}
                      onChange={(e) =>
                        updateIndicator(index, {
                          params: { ...indicator.params, stdDev: parseFloat(e.target.value) },
                        })
                      }
                      className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
