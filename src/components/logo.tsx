import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SoroLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <MessageSquare className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold tracking-tighter text-foreground">
        SORO<span className="text-xs font-normal align-super">™</span>
      </span>
    </div>
  );
}
