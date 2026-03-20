'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SearchARCourts() {
  const [searchParams, setSearchParams] = useState({
    lastName: '',
    firstName: '',
    caseNumber: '',
    county: '60 - Pulaski County' // Defaulting to your server's primary county
  });
  
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);

    // Build the query. For simplicity in V1, we search by a combined term or case number
    const queryTerm = searchParams.caseNumber || searchParams.lastName;

    try {
      const response = await fetch(`/api/cases?q=${encodeURIComponent(queryTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Failed to fetch cases');
        setResults([]);
      }
    } catch (error) {
      console.error('Error querying database:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchParams({ lastName: '', firstName: '', caseNumber: '', county: '60 - Pulaski County' });
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans text-gray-900">
      
      {/* Official Arkansas Judiciary Header */}
      <header className="bg-[#002855] text-white border-b-[5px] border-[#e5a823]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Placeholder for the AR State Seal */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#002855] font-bold text-xs border-2 border-[#e5a823]">
              SEAL
            </div>
            <div>
              <h1 className="text-3xl font-serif tracking-tight">Arkansas Judiciary</h1>
              <p className="text-sm text-gray-300 mt-1">Administrative Office of the Courts</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <Link href="/file-case" className="text-sm font-semibold text-white hover:underline mr-6">Attorney eFiling</Link>
            <Link href="/judge-portal" className="text-sm font-semibold text-white hover:underline">Judicial Secure Access</Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs & Page Title */}
      <div className="bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-xs text-gray-500 mb-1">
            Home &gt; Online Services &gt; <span className="font-bold text-gray-800">Search ARCourts</span>
          </div>
          <h2 className="text-2xl font-bold text-[#002855]">Search ARCourts (CourtConnect)</h2>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Search Criteria Box */}
        <div className="bg-white border border-gray-300 shadow-sm mb-8">
          <div className="bg-[#e9ecef] px-4 py-3 border-b border-gray-300">
            <h3 className="font-bold text-gray-800 text-lg">Search Criteria</h3>
          </div>
          
          <form onSubmit={handleSearch} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Party Search */}
              <div>
                <h4 className="font-bold text-[#002855] border-b border-gray-200 pb-2 mb-4">Search by Party Name</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Last Name or Company Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-[#002855] focus:ring-1 focus:ring-[#002855]"
                      value={searchParams.lastName}
                      onChange={(e) => setSearchParams({...searchParams, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-[#002855] focus:ring-1 focus:ring-[#002855]"
                      value={searchParams.firstName}
                      onChange={(e) => setSearchParams({...searchParams, firstName: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Case & Location Search */}
              <div>
                <h4 className="font-bold text-[#002855] border-b border-gray-200 pb-2 mb-4">Search by Case Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Case ID (Docket Number)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 60CR-26-1042"
                      className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-[#002855] focus:ring-1 focus:ring-[#002855]"
                      value={searchParams.caseNumber}
                      onChange={(e) => setSearchParams({...searchParams, caseNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Court Location</label>
                    <select 
                      className="w-full border border-gray-400 p-2 text-sm bg-white focus:outline-none focus:border-[#002855] focus:ring-1 focus:ring-[#002855]"
                      value={searchParams.county}
                      onChange={(e) => setSearchParams({...searchParams, county: e.target.value})}
                    >
                      <option value="All">All Courts</option>
                      <option value="60 - Pulaski County">60 - Pulaski County District Court</option>
                      <option value="Statewide">Statewide System</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={handleClear}
                className="bg-white border border-gray-400 text-gray-700 font-bold py-2 px-6 hover:bg-gray-100 transition text-sm"
              >
                Clear
              </button>
              <button 
                type="submit" 
                disabled={isSearching}
                className="bg-[#002855] text-white font-bold py-2 px-8 hover:bg-[#001a38] transition text-sm"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {hasSearched && (
          <div className="bg-white border border-gray-300 shadow-sm">
            <div className="bg-[#e9ecef] px-4 py-3 border-b border-gray-300 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Search Results</h3>
              <span className="text-sm text-gray-600">{results.length} records found</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-full">
                <thead>
                  <tr className="bg-[#002855] text-white text-xs uppercase tracking-wider">
                    <th className="p-3 border-r border-[#001a38] font-semibold w-1/6">Case ID</th>
                    <th className="p-3 border-r border-[#001a38] font-semibold w-2/6">Description</th>
                    <th className="p-3 border-r border-[#001a38] font-semibold w-1/6">Filing Date</th>
                    <th className="p-3 border-r border-[#001a38] font-semibold w-1/6">Status</th>
                    <th className="p-3 font-semibold text-center w-1/6">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {results.length > 0 ? (
                    results.map((caseItem, index) => (
                      <tr key={caseItem.case_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border-b border-gray-200 border-r text-[#002855] font-bold">
                          <Link href={`/cases/${caseItem.case_id}`} className="hover:underline">
                            {caseItem.docket_number}
                          </Link>
                        </td>
                        <td className="p-3 border-b border-gray-200 border-r text-gray-800">
                          {caseItem.case_title}
                          <div className="text-xs text-gray-500 mt-1">{caseItem.case_type}</div>
                        </td>
                        <td className="p-3 border-b border-gray-200 border-r text-gray-700">
                          {new Date(caseItem.filing_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                        </td>
                        <td className="p-3 border-b border-gray-200 border-r">
                           <span className={`font-semibold ${caseItem.status === 'Closed' ? 'text-gray-600' : 'text-green-700'}`}>
                            {caseItem.status}
                           </span>
                        </td>
                        <td className="p-3 border-b border-gray-200 text-center">
                          <Link href={`/cases/${caseItem.case_id}`} className="bg-[#002855] text-white text-xs px-3 py-1 rounded hover:bg-[#001a38] transition inline-block">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 font-semibold border-b border-gray-200">
                        No cases found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Placeholder */}
            {results.length > 0 && (
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-end text-sm text-gray-600">
                Page 1 of 1
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Official Footer */}
      <footer className="bg-[#212529] text-gray-400 py-8 mt-12 text-sm text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2">This application is provided by the ASRP Administrative Office of the Courts.</p>
          <p>Data is strictly for roleplay purposes within the Arkansas State Roleplay server environment.</p>
        </div>
      </footer>
    </div>
  );
}