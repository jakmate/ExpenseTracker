export const TimeframeSelector = ({
  timeframe,
  setTimeframe,
}: {
  timeframe: 'current' | 'previous';
  setTimeframe: (value: 'current' | 'previous') => void;
}) => (
  <div
    style={{
      position: 'absolute',
      right: '16px',
      top: '16px',
      zIndex: 1,
    }}
  >
    <select
      value={timeframe}
      onChange={(e) => setTimeframe(e.target.value as 'current' | 'previous')}
      style={{
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
      }}
    >
      <option value='current'>Current Month</option>
      <option value='previous'>Previous Month</option>
    </select>
  </div>
);
