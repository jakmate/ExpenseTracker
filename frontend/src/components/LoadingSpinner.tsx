import { CSSProperties } from 'react';

export const LoadingSpinner = ({ size = 40 }: { size?: number }) => (
  <div
    style={
      {
        width: size,
        height: size,
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #36A2EB',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto',
      } as CSSProperties
    }
  />
);
