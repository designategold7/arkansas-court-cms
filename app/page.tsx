'use client';
import { useState } from 'react';

export default function SearchARCourts() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // MOCK DATA: Simulating the ASRP database response since we lack VPS access today.
  const mockCases = [
    { id: 1, docket: 'PC-CR-26-0042', title: 'State of Arkansas vs. John Doe', type: 'Felony', status: 'Active', date: '03/15/2026' },
    { id: 2, docket: 'PC-TR-26-0811', title: 'State of Arkansas vs. Jane Smith', type: 'Traffic', status: 'Closed', date: '02/01/2026' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Header Bar - Arkansas Authentic */}
      <header className="bg-blue-900 text-white py-4 px-8 shadow-md border-b-4 border-yellow-600">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif tracking-wide">ARKANSAS JUDICIARY</h1>
            <p className="text-sm font-light uppercase tracking-widest text-yellow-500">Search ARCourts Portal</p>
          </div>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-400 transition">Home</a>
            <a href="#" className="hover:text-yellow-400 transition">File a Case</a>
            <a href="#" className="hover:text-yellow-400 transition">Judge Portal</a>
          </nav>
        </div>
      </header>

      {/* Main Search Interface */}
      <main className="max-w-6xl mx-auto mt-10 bg-white p-8 shadow-sm border border-gray-300">
        <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-6 text-blue-900">
          ▼ SEARCH COURT CASES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Party Name (Defendant)</label>
            <input 
              type="text" 
              className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900 focus:outline-none"
              placeholder="e.g., Doe, John"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Case Number</label>
            <input 
              type="text" 
              className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900 focus:outline-none"
              placeholder="e.g., PC-CR-26-0001"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 border-b-2 border-gray-200 pb-8 mb-8">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded shadow transition">
            CLEAR
          </button>
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition">
            SEARCH RECORDS
          </button>
        </div>

        {/* Results Table */}
        <h3 className="text-lg font-bold mb-4 text-gray-800">Search Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
                <th className="p-3 border border-gray-300">Case Number</th>
                <th className="p-3 border border-gray-300">Case Title</th>
                <th className="p-3 border border-gray-300">Type</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">File Date</th>
                <th className="p-3 border border-gray-300 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-blue-50 transition border-b border-gray-200 text-sm">
                  <td className="p-3 border border-gray-300 font-mono text-blue-700">{caseItem.docket}</td>
                  <td className="p-3 border border-gray-300 font-semibold">{caseItem.title}</td>
                  <td className="p-3 border border-gray-300">{caseItem.type}</td>
                  <td className="p-3 border border-gray-300">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${caseItem.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300">{caseItem.date}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="text-blue-600 hover:text-blue-900 font-bold underline text-xs">VIEW</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      
      <footer className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-500 pb-8">
        Powered by the Administrative Office of the Courts (AOC)
      </footer>
    </div>
  );
}