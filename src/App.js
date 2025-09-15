import React from 'react';

function App() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '2.5rem'
        }}>
          🚀 Parts Finder
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.2rem',
          marginBottom: '30px'
        }}>
          Multi-Store Search for Electronic Parts & Security Equipment
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{color: '#28a745', marginBottom: '15px'}}>✅ React is Working!</h3>
          <p>Your application is successfully deployed and running.</p>
        </div>
        
        <div style={{
          backgroundColor: '#fff3cd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffeaa7'
        }}>
          <h3 style={{color: '#856404', marginBottom: '15px'}}>🔧 Next Steps:</h3>
          <ol style={{color: '#856404', paddingLeft: '20px'}}>
            <li>Verify Tailwind CSS is working</li>
            <li>Test the main search component</li>
            <li>Connect to your backend API</li>
          </ol>
        </div>
        
        <div style={{
          textAlign: 'center'
        }}>
          <button 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
            onClick={() => {
              document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>🎉 JavaScript Events Working!</h1><p>React is fully functional.</p></div>';
            }}
          >
            Test React Events
          </button>
          
          <button 
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload Page
          </button>
        </div>
        
        <div style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#d4edda',
          borderRadius: '6px',
          border: '1px solid #c3e6cb'
        }}>
          <p style={{color: '#155724', margin: 0, textAlign: 'center'}}>
            <strong>Success!</strong> Your Vercel deployment is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
