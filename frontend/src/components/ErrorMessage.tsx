export const ErrorMessage = ({ error }: { error: string }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#666',
      padding: '20px',
    }}
  >
    ⚠️
    <br />
    {error}
  </div>
);
