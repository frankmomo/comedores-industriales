import { cn } from '@/lib/utils';

export function Button({ className, asChild, ...props }: any) {
  const Comp: any = asChild ? 'span' : 'button';
  return <Comp className={cn('px-4 py-2 rounded bg-primary text-white', className)} {...props} />;
}
