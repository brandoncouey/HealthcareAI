import { cache } from 'react';
import { fetchInvoiceStats, fetchCustomerCount, fetchRevenueData } from './data';

export const getCachedInvoiceStats = cache(fetchInvoiceStats);
export const getCachedCustomerCount = cache(fetchCustomerCount);
export const getCachedRevenueData = cache(fetchRevenueData);

export const getCachedDashboardData = cache(async () => {
    const [invoiceStats, customerCount, revenue] = await Promise.all([
        getCachedInvoiceStats(),
        getCachedCustomerCount(),
        getCachedRevenueData(),
    ]);

    return {
        invoiceStats,
        customerCount,
        revenue,
    };
});
