"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--admin-text)' }}>
      <h2 style={{ marginBottom: '16px' }}>Dashboard Error</h2>
      <p style={{ marginBottom: '24px', color: '#ff4d4f' }}>{error.message || "Something went wrong."}</p>
      <button
        onClick={reset}
        style={{
          padding: '8px 16px',
          backgroundColor: 'var(--admin-accent)',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}
