'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function FileCasePortal() {
  const { data: session, status } = useSession();
  
  const [formData, setFormData] = useState({
    defendant: '',
    caseType: 'Criminal',
    charges: '',
    narrative: ''
  });

  // Security Gate: Protect the route
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <p className="text-xl font-bold text-blue-900 animate-pulse">Authenticating with ASRP Secure Servers...</p>
      </div>
    );
  }

  // Kick out anyone who isn't the DA or a Judge
  if (!session || (session.user.accessLevel !== 'DistrictAttorney' && session.user.accessLevel !== 'Judge')) {
    redirect('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`SUCCESS: Case filed for State of Arkansas vs. ${formData.defendant}. It has been sent to the Judicial Docket.`);
    // In production, this will be an await fetch('/api/cases', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-blue-900 text-white py-4 px-8 shadow-md border-b-4 border-yellow-600">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif tracking-wide">ARKANSAS JUDICIARY</h1>
            <p className="text-sm font-light uppercase tracking-widest text-yellow-500">Official eFiling Portal</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-bold">Logged in as: {session.user.name}</p>
            <p className="text-yellow-400">{session.user.accessLevel}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-sm border border-gray-300">
        <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Case Initiation</h2>
            <p className="text-sm text-gray-600">Submit official charging documents or civil suits.</p>
          </div>
          <div className="text-right text-xs font-mono text-gray-500">
            Form AOC-44A <br/> Rev. 2026
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Parties */}
          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h3 className="text-sm font-bold uppercase text-blue-900 mb-4 border-b pb-2">I. Party Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Filing Attorney</label>
                <input 
                  type="text" 
                  disabled 
                  value={`${session.user.name} - ${session.user.accessLevel}`} 
                  className="w-full border border-gray-300 bg-gray-200 p-2 rounded text-gray-600 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Defendant / Respondent Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., John Doe"
                  className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900"
                  value={formData.defendant}
                  onChange={(e) => setFormData({...formData, defendant: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Case Details */}
          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <h3 className="text-sm font-bold uppercase text-blue-900 mb-4 border-b pb-2">II. Case Particulars</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Case Category</label>
                <select 
                  className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900"
                  value={formData.caseType}
                  onChange={(e) => setFormData({...formData, caseType: e.target.value})}
                >
                  <option value="Criminal">Criminal (CR)</option>
                  <option value="Civil">Civil (CV)</option>
                  <option value="Traffic">Traffic (TR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Primary Charges (ACA Codes)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., 5-13-204 Aggravated Assault"
                  className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900"
                  value={formData.charges}
                  onChange={(e) => setFormData({...formData, charges: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Probable Cause / Incident Narrative</label>
              <p className="text-xs text-gray-500 mb-2">This text will be automatically formatted into the official court affidavit.</p>
              <textarea 
                rows="6" 
                required
                className="w-full border border-gray-400 p-2 rounded focus:ring-2 focus:ring-blue-900"
                placeholder="On the date of..."
                value={formData.narrative}
                onChange={(e) => setFormData({...formData, narrative: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Submission */}
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition">
              SIGN AND FILE DOCUMENT
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}