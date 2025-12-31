export default function AdminDashboardPage() {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', color: 'var(--admin-text)' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Placeholder Widgets */}
        <div style={{ padding: '24px', backgroundColor: 'var(--admin-surface)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '8px' }}>Total Quotes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--admin-accent)' }}>-</p>
        </div>
        <div style={{ padding: '24px', backgroundColor: 'var(--admin-surface)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '8px' }}>New Inquiries</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--admin-accent)' }}>-</p>
        </div>
         <div style={{ padding: '24px', backgroundColor: 'var(--admin-surface)', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
            <h3 style={{ color: 'var(--admin-text)', marginBottom: '8px' }}>System Status</h3>
            <p style={{ fontSize: '1rem', color: 'var(--admin-text)' }}>All systems operational</p>
        </div>
      </div>
    </div>
  );
}
