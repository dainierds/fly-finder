import React, { useState } from 'react';

const MultiStoreSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  // Security and electrical supply stores
  const stores = [
    { id: 'iml-home', name: 'IML Home', color: 'bg-blue-600' },
    { id: 'wesco', name: 'Wesco', color: 'bg-orange-600' },
    { id: 'banner-solutions', name: 'Banner Solutions', color: 'bg-red-600' },
    { id: 'seclock', name: 'SECLOCK', color: 'bg-gray-700' },
    { id: 'door-controls-usa', name: 'Door Controls USA', color: 'bg-green-600' },
    { id: 'systems-depot', name: 'The Systems Depot Inc', color: 'bg-purple-600' },
    { id: 'adi-global', name: 'ADI Global', color: 'bg-indigo-600' },
    { id: 'silmar-electronics', name: 'Silmar Electronics', color: 'bg-teal-600' }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setResults({});
    setActiveTab('');

    try {
      // Call to your backend API
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
      
      // Set the first store with results as active
      const firstStoreWithResults = Object.keys(data)[0];
      if (firstStoreWithResults) {
        setActiveTab(firstStoreWithResults);
      }

    } catch (err) {
      console.error('Search error:', err);
      setError('Error performing search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTotalResults = () => {
    return Object.values(results).reduce((total, storeResults) => total + storeResults.length, 0);
  };

  const getStoresWithResults = () => {
    return stores.filter(store => results[store.id] && results[store.id].length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <span className="text-blue-600 text-4xl">🛍️</span>
            Multi-Store Search
          </h1>
          <p className="text-gray-600 text-lg">
            Search for security, electrical, and door hardware products across specialized suppliers
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for security systems, door hardware, electrical components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 pr-16 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none shadow-lg"
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="absolute right-2 top-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="text-white">🔍</span>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Searching in all stores...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && Object.keys(results).length > 0 && (
          <div className="max-w-7xl mx-auto">
            {/* Results Summary */}
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-700">
                Found <span className="font-semibold text-blue-600">{getTotalResults()}</span> products 
                in <span className="font-semibold text-blue-600">{getStoresWithResults().length}</span> stores
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-1 overflow-x-auto">
                  {getStoresWithResults().map((store) => (
                    <button
                      key={store.id}
                      onClick={() => setActiveTab(store.id)}
                      className={`flex-shrink-0 py-3 px-6 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
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

            {/* Products Grid */}
            {activeTab && results[activeTab] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results[activeTab].map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="text-6xl text-gray-400" style={{display: product.image ? 'none' : 'flex'}}>
                        📦
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          {product.price}
                        </span>
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View product
                          <span>🔗</span>
                        </a>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Available at {product.store}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && searchTerm && Object.keys(results).length === 0 && !error && (
          <div className="text-center py-12">
            <span className="text-6xl text-gray-400 block mb-4">🛍️</span>
            <p className="text-gray-600 text-lg">No products found for "{searchTerm}"</p>
            <p className="text-gray-500">Try different search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStoreSearchApp;
