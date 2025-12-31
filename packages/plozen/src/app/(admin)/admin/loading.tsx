export default function AdminLoading() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          style={{ 
            height: '150px', 
            backgroundColor: 'var(--admin-surface)', 
            borderRadius: '12px', 
            border: '1px solid var(--admin-border)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }} 
        />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
