import { ArrowRightIcon, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { AnimatedShinyText } from '@/components/ui/AnimatedShinyText';

export function HeroBadge() {
  return (
    <div className="z-10 flex min-h-16 items-center justify-center">
      <div
        className={cn(
          'group rounded-full border border-border bg-secondary/60 text-base text-secondary-foreground transition-all ease-in hover:cursor-pointer hover:bg-secondary/40'
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-muted-foreground hover:duration-300">
          <span>⭐ Welcome to my portfolio!</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
}
