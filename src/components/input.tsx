import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, FC } from 'react';

const inputVariants = cva('w-full border border-gray-500 outline-none focus:border-yellow-dark text-gray-200 text-md p-3', {
  variants: { variant: { md: 'h-12 rounded-lg' } },
  defaultVariants: { variant: 'md' },
});

const inputIconVariants = cva('focus-within:border-yellow-dark border border-gray-500', {
  variants: { variant: { md: 'h-12 rounded-lg' } },
  defaultVariants: { variant: 'md' },
});

interface InputProps extends
  ComponentProps<'input'>,
  VariantProps<typeof inputVariants>,
  VariantProps<typeof inputIconVariants>
{
  icon?: FC<React.ComponentProps<'svg'>>;
}

export function Input({
  variant,
  className,
  icon: Icon,
  ...props
}: InputProps) {

  if (Icon) {
    return (
      <div className={inputIconVariants({
        variant,
        className: 'flex items-center px-3',
      })}>
        <Icon className="size-5 fill-yellow" />
        <input className={inputVariants({
          variant,
          className: 'bg-transparent border-none focus:ring-0 p-0',
        })} {...props} />
      </div>
    );
  }

  return (
    <input
      className={inputVariants({
        variant,
        className,
      })}
      {...props}
    />
  );
}
