import React from 'react';
import { Shield, Users, Database, Lock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="h-full w-full bg-stone-100 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
          <Shield className="text-stone-700" size={32} /> Admin Console
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <AdminCard title="User Management" icon={<Users />} value="12 Active" />
           <AdminCard title="Data Connections" icon={<Database />} value="4 Connected" />
           <AdminCard title="Security Status" icon={<Lock />} value="Enforced" color="text-green-600" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-12 text-center">
           <p className="text-stone-400">Restricted Area. Administrative controls are currently locked for this session.</p>
        </div>
      </div>
    </div>
  );
};

const AdminCard = ({ title, icon, value, color = 'text-stone-900' }: any) => (
  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
    <div className="flex items-center justify-between mb-4 text-stone-400">
       {icon}
    </div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-stone-500 uppercase font-bold mt-1">{title}</div>
  </div>
);

export default AdminDashboard;