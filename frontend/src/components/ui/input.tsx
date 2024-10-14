import * as React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'fTitle' | 'jTitle' | 'search';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    const variantClasses = {
      default:
        'border border-input px-3 rounded-md bg-background text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
      fTitle:
        'border-none text-[18px] font-bold bg-custom-background text-custom-placeholder rounded-lg focus-visible:ring-2 focus-visible:ring-custom focus-visible:ring-offset-2 focus-visible:outline-none',
      jTitle: 'border-none px-3 focus:outline-none focus:border-none font-bold text-[20px] mb-2 mt-2 w-full',
      search:
        'border border-input h-12 absolute top-0 font-semibold px-10 rounded-md bg-background text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
    };

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
