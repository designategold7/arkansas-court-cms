'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function JudgePortal() {
  const { data: session, status } = useSession();

  const [pendingReview, setPendingReview] = useState([
    {
      id: 1,
      docket: 'PC-CR-26-0043',
      defendant: 'Doe, John',
      filedBy: 'Casey Martin (District Attorney)',
      type: 'Criminal',
      charges: '5-13-204 Aggravated Assault',
      narrative: 'On the date of 03/20/2026, the defendant was observed brandishing a firearm outside of the Legion Square bank. Officers responded and the suspect fled in a silver vehicle.',
      status: 'Awaiting Judicial Review'
    }
  ]);

  // Security Gate
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 font-sans">
        <p className="text-xl font-bold text-black animate-pulse">Accessing Judicial Mainframe...</p>
      </div>
    );
  }

  // Kick out anyone who isn't explicitly a Judge
  if (!session || session.user.accessLevel !== 'Judge') {
    redirect('/');
  }

  const handleAction = (id, actionType) => {
    alert(`ACTION LOGGED: ${actionType} for Docket ${pendingReview.find(c => c.id === id).docket}`);
    setPendingReview(pendingReview.filter(caseItem => caseItem.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans text-gray-900">
      <header className="bg-black text-white py-4 px-8 shadow-md border-b-4 border-yellow-600">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif tracking-wide">STATE OF ARKANSAS</h1>
            <p className="text-sm font-light uppercase tracking-widest text-yellow-500">Judicial Workspace - Restricted Access</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">Honorable {session.user.name}</p>
            <p className="text-xs text-gray-400">Pulaski County District Court</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <div className="bg-white p-6 shadow-sm border border-gray-300 rounded mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 text-black">
            Action Required: Pending Dockets & Motions
          </h2>
          <p className="text-sm text-gray-600 mb-6">Review new filings, sign warrants, or set initial hearing dates.</p>

          {pendingReview.length === 0 ? (
            <div className="bg-green-50 text-green-800 p-4 border border-green-200 rounded text-center font-bold">
              The docket is clear. No pending motions to review.
            </div>
          ) : (
            <div className="space-y-6">
              {pendingReview.map((caseItem) => (
                <div key={caseItem.id} className="bg-gray-50 border border-gray-300 rounded shadow-sm">
                  <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-blue-900 mr-4">{caseItem.docket}</span>
                      <span className="font-bold text-gray-800 uppercase">State vs. {caseItem.defendant}</span>
                    </div>
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-3 py-1 rounded border border-yellow-400">
                      {caseItem.status}
                    </span>
                  </div>
                  
                  <div className="p-4 grid grid-cols-3 gap-4">
                    <div className="col-span-1 border-r border-gray-300 pr-4">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Filed By</p>
                      <p className="text-sm text-gray-800 mb-4">{caseItem.filedBy}</p>
                      
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Charges</p>
                      <p className="text-sm text-gray-800 font-mono bg-gray-100 p-1 border">{caseItem.charges}</p>
                    </div>
                    
                    <div className="col-span-2 pl-2">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Affidavit / Narrative</p>
                      <p className="text-sm text-gray-700 bg-white border border-gray-200 p-3 h-24 overflow-y-auto italic">
                        "{caseItem.narrative}"
                      </p>
                    </div>
                  </div>

                  <div className="bg-white px-4 py-3 border-t border-gray-300 flex justify-end space-x-3">
                    <button 
                      onClick={() => handleAction(caseItem.id, 'DENIED / DISMISSED')}
                      className="text-red-700 hover:bg-red-50 border border-red-200 font-bold py-2 px-4 rounded text-sm transition"
                    >
                      DENY / REJECT
                    </button>
                    <button 
                      onClick={() => handleAction(caseItem.id, 'WARRANT ISSUED')}
                      className="text-yellow-700 hover:bg-yellow-50 border border-yellow-300 font-bold py-2 px-4 rounded text-sm transition"
                    >
                      ISSUE ARREST WARRANT
                    </button>
                    <button 
                      onClick={() => handleAction(caseItem.id, 'APPROVED - DOCKETED')}
                      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded text-sm shadow transition"
                    >
                      SIGN & DOCKET CASE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}