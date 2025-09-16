import React, { useState } from 'react';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  // Your GitHub Codespaces URL
  const API_URL = 'https://parts-finder-backend-production.up.railway.app';
  
  // Store configurations matching Flutter app
  const stores = [
    { id: 'door-controls-usa', name: 'Door Controls USA', color: 'bg-blue-600' },
    { id: 'sdepot', name: 'SDEPOT', color: 'bg-orange-600' },
    { id: 'silmar', name: 'Silmar Electronics', color: 'bg-red-600' },
    { id: 'adiglobal', name: 'ADI Global', color: 'bg-gray-700' },
    { id: 'imlss', name: 'IMLSS', color: 'bg-green-600' },
    { id: 'wesco', name: 'Wesco', color: 'bg-purple-600' },
    { id: 'bannersolutions', name: 'Banner Solutions', color: 'bg-indigo-600' },
    { id: 'seclock', name: 'SecLock', color: 'bg-teal-600' }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults({});
    setActiveTab('');
    
    try {
      console.log(`Starting streaming search for: ${searchTerm}`);
      console.log(`API URL: ${API_URL}/search-stream?q=${encodeURIComponent(searchTerm)}`);
      
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Transform backend response to frontend format
      const transformedResults = {};
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach(result => {
          if (result.success && result.data && result.data.products) {
            // Filter products that contain search term (like Flutter app does)
            const filteredProducts = result.data.products.filter(product => 
              product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (filteredProducts.length > 0) {
              // Map site names to store IDs
              const siteMapping = {
                'Door Controls USA': 'doorcontrols',
                'SDEPOT': 'sdepot',
                'Silmar Electronics': 'silmar',
                'ADI Global': 'adiglobal',
                'IMLSS': 'imlss',
                'Wesco': 'wesco',
                'Banner Solutions': 'bannersolutions',
                'Seclock': 'seclock'
              };
              
              const storeId = siteMapping[result.site] || result.site.toLowerCase().replace(/\s+/g, '');
              transformedResults[storeId] = filteredProducts;
            }
          }
        });
      }
      
      console.log('Transformed Results:', transformedResults);
      setResults(transformedResults);
      
      // Set the first store with results as active tab
      const storesWithResults = Object.keys(transformedResults).filter(storeId => 
        transformedResults[storeId] && Array.isArray(transformedResults[storeId]) && transformedResults[storeId].length > 0
      );
      if (storesWithResults.length > 0) {
        setActiveTab(storesWithResults[0]);
      }
      
      setLoading(false);

    } catch (err) {
      console.error('Search error:', err);
      setError(`Error connecting to backend: ${err.message}`);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTotalResults = () => {
    return Object.values(results).reduce((total, storeResults) => {
      return total + (Array.isArray(storeResults) ? storeResults.length : 0);
    }, 0);
  };

  const getStoresWithResults = () => {
    const storeKeys = Object.keys(results).filter(key => 
      results[key] && Array.isArray(results[key]) && results[key].length > 0
    );
    
    return storeKeys.map(key => {
      const store = stores.find(s => s.id === key || s.name.toLowerCase().replace(/\s+/g, '') === key);
      return store || { id: key, name: key, color: 'bg-gray-600' };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            PartsFinder
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Multi-Store Search for Electronic Parts & Security Equipment
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tools, arduino, sensors..."
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
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            Backend: {API_URL}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Searching across all stores...</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-red-800 font-semibold mb-2">Connection Error</h3>
              <p className="text-red-700">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Try refreshing the page or check if your backend is running.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && Object.keys(results).length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results
              </h2>
              <p className="text-gray-600">
                Found {getTotalResults()} products in {getStoresWithResults().length} stores
              </p>
            </div>

            {/* Store Tabs */}
            {getStoresWithResults().length > 0 && (
              <div className="mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-1 overflow-x-auto pb-2">
                    {getStoresWithResults().map((store) => (
                      <button
                        key={store.id}
                        onClick={() => setActiveTab(store.id)}
                        className={`flex-shrink-0 py-2 px-4 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                          activeTab === store.id
                            ? `${store.color} text-white`
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {store.name}
                        <span className="ml-2 px-2 py-1 text-xs bg-white bg-opacity-20 rounded-full">
                          {results[store.id]?.length || 0}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {activeTab && results[activeTab] && Array.isArray(results[activeTab]) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results[activeTab].map((product, index) => (
                  <div key={product.sku || product.id || index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="mb-4">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name || 'Product'}
                    </h3>
                    {product.sku && (
                      <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        {product.price || 'Price not available'}
                      </span>
                      {product.link && (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          View Product
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Available at {product.site || activeTab}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* No results for search */}
            {getTotalResults() === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">?</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try different search terms or wait for more stores to complete
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!searchTerm && !loading && Object.keys(results).length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-blue-600 text-6xl mb-4">+</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Search
            </h3>
            <p className="text-gray-600 mb-4">
              Enter a product name or part number to get started
            </p>
            <div className="text-sm text-gray-500">
              Try searching for: arduino, tools, sensors, cameras
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
