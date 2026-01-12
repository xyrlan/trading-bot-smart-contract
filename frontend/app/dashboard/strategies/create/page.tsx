'use client';

import { useRouter } from 'next/navigation';
import { StrategyForm } from '@/components/strategies/StrategyForm';

export default function CreateStrategyPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Strategy</h1>
        <p className="text-muted-foreground">
          Configure your automated trading strategy with technical indicators
        </p>
      </div>

      <div className="rounded-lg bg-card border border-border p-6">
        <StrategyForm
          onSuccess={() => router.push('/dashboard/strategies')}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
