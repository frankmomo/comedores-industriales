import * as React from 'react';
import { cn } from '@/lib/utils';           //  usa clsx o concatena si no tienes cn

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}                            /*  <- ¡imprescindible para RHF! */
      className={cn(
        'w-full rounded border px-3 py-2 focus:outline-none focus:ring',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
