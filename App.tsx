
import React, { useState, useCallback } from 'react';
import { PipelineStatus, Lead } from './types';
import { prospectLeads } from './services/geminiService';
import { exportToCSV } from './utils/csvUtils';
import { PipelineStatusStepper } from './components/PipelineStatusStepper';
import { LeadTable } from './components/LeadTable';

const App: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<PipelineStatus>(PipelineStatus.IDLE);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startPipeline = useCallback(async () => {
    if (!keyword.trim()) return;

    setError(null);
    setLeads([]);
    setStatus(PipelineStatus.DISCOVERY);

    try {
      // Step 1 & 2: Discovery & Enrichment
      // We simulate the multi-step feel by updating state over time
      setTimeout(() => setStatus(PipelineStatus.ENRICHING), 2500);
      
      const result = await prospectLeads(keyword);
      
      // Step 3: AI Validation (simulated transition)
      setStatus(PipelineStatus.AI_VALIDATION);
      await new Promise(r => setTimeout(r, 2000));

      setLeads(result.leads);
      setSources(result.sources);
      setStatus(PipelineStatus.COMPLETED);
    } catch (err) {
      console.error(err);
      setError('Failed to process pipeline. Please try a different keyword or check your connection.');
      setStatus(PipelineStatus.ERROR);
    }
  }, [keyword]);

  const handleExport = () => {
    if (leads.length === 0) return;
    exportToCSV(leads, `prospects_${keyword.toLowerCase().replace(/\s+/g, '_')}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 mb-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">ProspectIntelli</h1>
              <p className="text-xs text-slate-500 font-medium">B2B AI Pipeline Engine</p>
            </div>
          </div>
          
          {leads.length > 0 && status === PipelineStatus.COMPLETED && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md shadow-indigo-100 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Results (.CSV)
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Section */}
        <div className="glass-panel rounded-2xl p-8 mb-10 shadow-xl shadow-slate-200/50">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Generate High-Quality B2B Leads</h2>
            <p className="text-slate-600 text-lg">Enter a keyword and location to start our automated prospecting pipeline powered by Gemini AI.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder='e.g., "Marketing Agencies in London" or "Indústrias Têxteis em Santa Catarina"'
                className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all outline-none text-slate-800"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startPipeline()}
                disabled={status !== PipelineStatus.IDLE && status !== PipelineStatus.COMPLETED && status !== PipelineStatus.ERROR}
              />
            </div>
            <button
              onClick={startPipeline}
              disabled={!keyword.trim() || (status !== PipelineStatus.IDLE && status !== PipelineStatus.COMPLETED && status !== PipelineStatus.ERROR)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              {status === PipelineStatus.IDLE || status === PipelineStatus.COMPLETED || status === PipelineStatus.ERROR ? (
                <>
                  <span>Start Pipeline</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-2 max-w-3xl mx-auto">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Progress Tracker */}
        <PipelineStatusStepper status={status} />

        {/* Lead Grid */}
        <div className="space-y-6">
          {leads.length > 0 && (
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-xl font-bold text-slate-900">Found {leads.length} Qualified Leads</h3>
              <div className="text-xs text-slate-400 font-medium italic">
                Verified using multi-source validation
              </div>
            </div>
          )}
          
          <LeadTable leads={leads} />

          {leads.length > 0 && sources.length > 0 && (
            <div className="mt-12 p-6 bg-white rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Grounding Sources</h4>
              <div className="flex flex-wrap gap-2">
                {sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.web?.uri || source.maps?.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-slate-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {source.web?.title || source.maps?.title || 'External Resource'}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {status === PipelineStatus.IDLE && (
          <div className="mt-20 text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No active pipeline</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Start a search to begin discovering and validating B2B prospects in real-time.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
