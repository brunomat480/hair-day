import { Text } from '@/components/text';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

const buttonVariants = cva('w-full rounded-lg transition disabled:bg-yellow/30 border select-none border-transparent disabled:pointer-events-none cursor-pointer', {
  variants: {
    variant: { primary: 'bg-yellow hover:border-yellow-light' },
    size: { lg: 'h-14 max-w-sm' },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

interface ButtonProps extends
Omit<ComponentProps<'button'>, 'size'>,
VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({
      variant, className,
    })} {...props}>
      <Text variant="sm" className="text-gray-900 font-bold">{children}</Text>
    </button>
  );
}
