import React, { useState } from 'react';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        { id: 1, name: 'Electronic Component A', price: '$25.99', store: 'Store 1' },
        { id: 2, name: 'Security Camera B', price: '$89.99', store: 'Store 2' },
        { id: 3, name: 'Door Lock C', price: '$45.50', store: 'Store 3' }
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Parts Finder
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Multi-Store Search for Electronic Parts & Security Equipment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for electronic parts, security equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Searching across all stores...</p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({results.length} items)
            </h2>
            <div className="grid gap-4">
              {results.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">Available at {item.store}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">
                        {item.price}
                      </span>
                      <br />
                      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && searchTerm && results.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">?</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try different search terms or check spelling
            </p>
          </div>
        )}

        {/* Welcome State */}
        {!searchTerm && !loading && results.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-blue-600 text-6xl mb-4">+</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Search
            </h3>
            <p className="text-gray-600">
              Enter a product name or part number to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
