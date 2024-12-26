import { cn } from '@/utils/cn';

interface IDividerProps {
  type?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider = ({
  type = 'horizontal',
  className = '',
}: IDividerProps) => {

  return (
    <div
      className={cn(
        'bg-border',
        type === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
        className
      )}
    />
  );
};

export default Divider;
