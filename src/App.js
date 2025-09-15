import React from 'react';
import './index.css';

function App() {
  const handleTestReact = () => {
    alert('React is working perfectly!');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Parts Finder
        </h1>
        
        <p className="text-center text-gray-600 text-lg mb-8">
          Multi-Store Search for Electronic Parts & Security Equipment
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-green-800 font-semibold mb-3">React is Working!</h3>
          <p className="text-green-700">Your application is successfully deployed and running.</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="text-yellow-800 font-semibold mb-3">Next Steps:</h3>
          <ol className="text-yellow-700 list-decimal list-inside space-y-2">
            <li>Verify Tailwind CSS is working</li>
            <li>Test the main search component</li>
            <li>Connect to your backend API</li>
          </ol>
        </div>
        
        <div className="text-center space-x-4">
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleTestReact}
          >
            Test React Events
          </button>
          
          <button 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleReload}
          >
            Reload Page
          </button>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-center font-medium">
            Success! Your deployment is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
