type TimeframeSelectorProps = {
  timeframe: 'current' | 'previous';
  setTimeframe: (timeframe: 'current' | 'previous') => void;
};

export function TimeframeSelector({ timeframe, setTimeframe }: TimeframeSelectorProps) {
  return (
    <div className='inline-flex rounded-md shadow-sm'>
      <button
        type='button'
        onClick={() => setTimeframe('current')}
        className={`rounded-l-md border px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 ${
          timeframe === 'current'
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Current
      </button>
      <button
        type='button'
        onClick={() => setTimeframe('previous')}
        className={`rounded-r-md border px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 ${
          timeframe === 'previous'
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        Previous
      </button>
    </div>
  );
}
