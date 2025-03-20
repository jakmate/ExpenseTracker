import { ReactNode } from 'react';

type FormModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function FormModal({ title, show, onClose, children }: FormModalProps) {
  if (!show) return null;

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm'>
      <div className='relative w-full max-w-lg rounded-xl bg-white shadow-xl'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 flex size-8 items-center justify-center
          rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-900'
          aria-label='Close form'
        >
          ×
        </button>
        <div className='p-6'>
          <h3 className='mb-4 text-2xl font-bold'>{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}