type AddButtonProps = {
  label: string;
  onClick: () => void;
};

export function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg
               flex items-center gap-2 transition-colors shadow-sm'
    >
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
      </svg>
      {label}
    </button>
  );
}
