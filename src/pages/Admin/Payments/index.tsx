import React from 'react';

const PaymentPage: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '$18,430', icon: '💰' },
    { label: 'Active Subscriptions', value: '234', icon: '📈' },
    { label: 'Refunds Processed', value: '12', icon: '↩️' },
    { label: 'Pending Payments', value: '7', icon: '⏳' },
  ];

  const plans = [
    { name: 'Free', clients: 87, revenue: 0 },
    { name: 'Plus', clients: 94, revenue: 846 },
    { name: 'Pro', clients: 43, revenue: 1247 },
    { name: 'Team', clients: 10, revenue: 990 },
  ];

  const paymentMethods = [
    { method: 'Visa', icon: '💳', count: 102 },
    { method: 'MasterCard', icon: '💳', count: 87 },
    { method: 'Amex', icon: '💳', count: 45 },
    { method: 'Cash', icon: '💵', count: 61 },
  ];

  const transactions = [
    { id: '#T001', user: 'Alice', amount: '$29', method: 'Visa', status: 'Paid', date: '2025-04-21' },
    { id: '#T002', user: 'Bob', amount: '$9', method: 'Amex', status: 'Pending', date: '2025-04-20' },
    { id: '#T003', user: 'Charlie', amount: '$99', method: 'MasterCard', status: 'Paid', date: '2025-04-19' },
    { id: '#T004', user: 'Daisy', amount: '$29', method: 'Cash', status: 'Refunded', date: '2025-04-17' },
  ];

  const statusColor: { [key: string]: string } = {
    Paid: 'text-green-600',
    Pending: 'text-yellow-600',
    Refunded: 'text-red-500',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Payments Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition">
            <span className="text-3xl">{stat.icon}</span>
            <p className="text-xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Plan Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-gradient-to-tr from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition">
            <h4 className="text-lg font-semibold">{plan.name}</h4>
            <p className="text-sm mt-1">{plan.clients} Clients</p>
            <p className="text-2xl font-bold mt-2">${plan.revenue}</p>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {paymentMethods.map((method, idx) => (
            <div key={idx} className="p-4 border rounded-lg text-center hover:bg-gray-50 transition">
              <div className="text-2xl">{method.icon}</div>
              <div className="mt-2 font-medium">{method.method}</div>
              <div className="text-sm text-gray-500">{method.count} Payments</div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{tx.id}</td>
                  <td>{tx.user}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.method}</td>
                  <td className={statusColor[tx.status]}>{tx.status}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
