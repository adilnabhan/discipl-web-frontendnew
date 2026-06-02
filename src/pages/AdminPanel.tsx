import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, CreditCard, UserCheck, DollarSign, Activity, 
  Upload, FileSpreadsheet, CheckCircle2, Download, AlertCircle,
  LayoutDashboard, Dumbbell, Calendar, BarChart3, Settings, LogOut, ShieldAlert
} from 'lucide-react';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'plans' | 'slots' | 'analytics' | 'settings'>('dashboard');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Mock uploader triggers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  };

  const handleFileChange = () => {
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadComplete(false);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#111827] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111827] text-white flex flex-col flex-shrink-0 hidden md:flex border-r border-[#1F2937]">
        <div className="p-6 border-b border-[#1F2937] flex items-center gap-3">
          <Dumbbell className="w-8 h-8 text-[#DC2626]" />
          <div>
            <span className="font-extrabold text-lg tracking-tight block">DISCIPL</span>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Enterprise Manager</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'profile', label: 'Gym Profile', icon: Users },
            { id: 'plans', label: 'Membership Plans', icon: CreditCard },
            { id: 'slots', label: 'Time Slots', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#DC2626] text-white'
                    : 'text-gray-400 hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1F2937] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-extrabold text-sm">
              GE
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400">Current User</p>
              <p className="text-sm font-bold text-white truncate max-w-[120px]">{user?.email || 'gym_editor1'}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors pt-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-[#E5E7EB] h-20 px-8 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-extrabold text-[#111827] tracking-tight">
              Iron Forge Athletics - Editor Dashboard
            </h1>
            <p className="text-xs text-gray-500 font-medium">Logged in as Editor • Local PostgreSQL Connected</p>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'editor' && (
              <span className="bg-amber-50 text-amber-800 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Gym Editor
              </span>
            )}
            {user?.role === 'admin' && (
              <span className="bg-red-50 text-[#DC2626] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-red-200">
                System Admin
              </span>
            )}
            <div className="text-right">
              <span className="text-sm font-bold block text-[#111827]">{user?.name || 'Gym Editor'}</span>
              <span className="text-[10px] text-gray-400 font-semibold">{user?.email || 'gym_editor1@discipl.com'}</span>
            </div>
          </div>
        </header>

        {/* Inner Content Wrapper */}
        <main className="p-8 space-y-8 flex-1">
          {activeTab === 'dashboard' ? (
            <>
              {/* KPIs Metric Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { label: "Total Members", value: "1,248", desc: "+12% this month", icon: Users, color: "text-[#DC2626]" },
                  { label: "Active Memberships", value: "1,012", desc: "81% active rate", icon: CreditCard, color: "text-emerald-500" },
                  { label: "Today's Check-ins", value: "342", desc: "Live attendance", icon: UserCheck, color: "text-blue-500" },
                  { label: "MTD Revenue", value: "₹2,53,400", desc: "+8.4% vs last mo", icon: DollarSign, color: "text-purple-500" },
                  { label: "Slot Utilization", value: "84%", desc: "Peak hours 6-9 PM", icon: Activity, color: "text-amber-500" },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{kpi.label}</span>
                        <Icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-black text-gray-900">{kpi.value}</h3>
                        <p className="text-[11px] text-gray-400 font-semibold mt-1">{kpi.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts & Bulk Uploader Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left 2 Columns: Analytics Graphs */}
                <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Performance Charts</h2>
                      <p className="text-xs text-gray-500">Membership trends and revenue benchmarks</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* SVG Membership Growth Chart */}
                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                      <h3 className="text-sm font-bold text-gray-700 mb-4">Membership Growth (Active Members)</h3>
                      <div className="relative h-48 w-full flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <line x1="0" y1="10" x2="100" y2="10" stroke="#F3F4F6" strokeWidth="0.5" />
                          <line x1="0" y1="25" x2="100" y2="25" stroke="#F3F4F6" strokeWidth="0.5" />
                          <line x1="0" y1="40" x2="100" y2="40" stroke="#F3F4F6" strokeWidth="0.5" />
                          {/* Line Path */}
                          <path
                            d="M 0 45 Q 20 40 40 28 T 80 15 T 100 8"
                            fill="none"
                            stroke="#DC2626"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                          {/* Gradient under the line */}
                          <path
                            d="M 0 45 Q 20 40 40 28 T 80 15 T 100 8 L 100 50 L 0 50 Z"
                            fill="url(#redGrad)"
                            opacity="0.08"
                          />
                          <defs>
                            <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#DC2626" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Month labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-bold text-gray-400 px-1 pt-1 bg-white border-t border-gray-100">
                          <span>Nov</span>
                          <span>Dec</span>
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Weekly Revenue Bar Chart */}
                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                      <h3 className="text-sm font-bold text-gray-700 mb-4">Revenue Trend (Weekly blocks)</h3>
                      <div className="relative h-48 w-full flex items-end justify-between px-2">
                        {[40, 55, 48, 70, 85, 90, 100].map((val, idx) => (
                          <div key={idx} className="flex flex-col items-center flex-1 mx-1.5 h-full justify-end">
                            <div
                              className="w-full bg-[#111827] group-hover:bg-[#DC2626] rounded-t-md transition-all duration-500 hover:scale-y-105"
                              style={{ height: `${val * 0.8}%` }}
                            ></div>
                            <span className="text-[8px] font-bold text-gray-400 mt-2">W{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 1 Column: CSV/XLSX Bulk Uploader */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold tracking-tight">Bulk Slot/Gym Uploader</h2>
                      <FileSpreadsheet className="w-5 h-5 text-[#DC2626]" />
                    </div>
                    
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      Quickly populate or modify time slots, trainer link tables, and class schedules via a standardized CSV/XLSX.
                    </p>

                    {/* Drag and Drop Container */}
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                        isDragging 
                          ? "border-[#DC2626] bg-red-50/5" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input 
                        type="file" 
                        id="bulkFile" 
                        className="hidden" 
                        accept=".csv,.xlsx" 
                        onChange={handleFileChange}
                      />
                      <label htmlFor="bulkFile" className="cursor-pointer space-y-3 block">
                        <Upload className="w-10 h-10 mx-auto text-gray-400" />
                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-gray-700">Drag & Drop spreadsheet here</p>
                          <p className="text-gray-400">or click to browse local files</p>
                        </div>
                        <p className="text-[10px] text-gray-400">Supports CSV, XLSX up to 5MB</p>
                      </label>
                    </div>

                    {/* Upload progress & validation checks */}
                    {uploadProgress !== null && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span>Processing Data Sheets</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                              className="bg-[#DC2626] h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        {uploadComplete && (
                          <div className="space-y-2.5 bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs">
                            <div className="flex items-center gap-2 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                              <span>Validation Complete</span>
                            </div>
                            
                            <ul className="space-y-1.5 text-gray-600 pl-6 list-disc">
                              <li>Headers validated (slot_name, startTime, duration)</li>
                              <li>Verified user role credentials matches</li>
                              <li>Checked DB constraints on PostgreSQL server</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert("Template downloaded!"); }}
                      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#111827] py-3 rounded-xl text-xs font-bold transition-colors w-full"
                    >
                      <Download className="w-4 h-4" />
                      Download Upload Template
                    </a>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center shadow-sm">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Section Under Construction</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                The {activeTab} section is fully wired to our local Postgres database, and layout designs will be loaded here shortly.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
