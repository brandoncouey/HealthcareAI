import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock data functions since the actual data file doesn't exist
const fetchInvoiceStats = async () => ({ total: 0, pending: 0, paid: 0 });
const fetchCustomerCount = async () => 0;
const fetchRevenueData = async () => [];

interface DataContextType {
  invoiceStats: { total: number; pending: number; paid: number };
  customerCount: number;
  revenueData: any[];
  loading: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoiceStats, setInvoiceStats] = useState<DataContextType['invoiceStats']>({ total: 0, pending: 0, paid: 0 });
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [stats, count, revenue] = await Promise.all([
        fetchInvoiceStats(),
        fetchCustomerCount(),
        fetchRevenueData(),
      ]);
      setInvoiceStats(stats);
      setCustomerCount(count);
      setRevenueData(revenue);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ invoiceStats, customerCount, revenueData, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
