type AddButtonProps = {
    label: string;
    onClick: () => void;
};
  
export function AddButton({ label, onClick }: AddButtonProps) {
    return (
      <button
        onClick={onClick}
        className='flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-200 p-6 shadow-md transition-shadow hover:shadow-lg'
        type='button'
      >
        <div className='text-2xl font-bold text-gray-500'>+</div>
        <div className='ml-2 text-2xl font-bold text-gray-500'>{label}</div>
      </button>
    );
}