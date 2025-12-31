"use client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-montserrat)' }}>PLOZEN ADMIN</h1>
      <div style={{ padding: '32px', backgroundColor: 'var(--admin-surface)', borderRadius: '12px', border: '1px solid var(--admin-border)', width: '100%', maxWidth: '400px' }}>
          <p style={{ marginBottom: '24px', textAlign: 'center' }}>Please sign in to continue.</p>
          <button 
            onClick={() => router.push('/admin')}
            style={{ 
                width: '100%',
                padding: '12px', 
                backgroundColor: 'var(--admin-accent)', 
                color: '#000', 
                border: 'none', 
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
            }}
          >
            Sign In (Mock)
          </button>
      </div>
    </div>
  );
}
