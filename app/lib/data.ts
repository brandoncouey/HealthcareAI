import { PrismaClient } from '@prisma/client';
import {formatCurrency} from './utils';

const prisma = new PrismaClient();

export async function fetchRevenue() {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        // console.log('Fetching revenue data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await prisma.revenue.findMany();

        // console.log('Data fetch completed after 3 seconds.');

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

// Optimized dashboard data fetching - combines multiple queries into one
export async function fetchDashboardData() {
    try {
        // Use Promise.all to run queries in parallel for better performance
        const [revenue, latestInvoices, invoiceStats, customers] = await Promise.all([
            prisma.revenue.findMany(),
            
            prisma.invoice.findMany({
                include: {
                    customer: true,
                },
                orderBy: {
                    date: 'desc',
                },
                take: 5,
            }),
            
            // Invoice statistics in a single query
            prisma.invoice.groupBy({
                by: ['status'],
                _count: {
                    id: true,
                },
                _sum: {
                    amount: true,
                },
            }),
            
            prisma.customer.count(),
        ]);

        const paidInvoices = invoiceStats.find(stat => stat.status === 'paid');
        const pendingInvoices = invoiceStats.find(stat => stat.status === 'pending');
        
        const totalInvoices = invoiceStats.reduce((sum, stat) => sum + stat._count.id, 0);
        const totalPaidInvoices = paidInvoices?._sum.amount ?? 0;
        const totalPendingInvoices = pendingInvoices?._sum.amount ?? 0;
        const paidCount = paidInvoices?._count.id ?? 0;
        const pendingCount = pendingInvoices?._count.id ?? 0;

        // Format latest invoices
        const formattedLatestInvoices = latestInvoices.map((invoice) => ({
            amount: invoice.amount,
            id: invoice.id,
            name: invoice.customer.name,
            image_url: invoice.customer.image_url,
            email: invoice.customer.email,
        })).map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));

        return {
            revenue,
            latestInvoices: formattedLatestInvoices,
            numberOfInvoices: totalInvoices,
            totalPaidInvoices: formatCurrency(totalPaidInvoices),
            totalPendingInvoices: formatCurrency(totalPendingInvoices),
            paidCount,
            pendingCount,
            numberOfCustomers: customers,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch dashboard data.');
    }
}

export async function fetchDashboardDataWithSettled() {
    try {
        const results = await Promise.allSettled([
            prisma.revenue.findMany(),
            
            prisma.invoice.findMany({
                include: {
                    customer: true,
                },
                orderBy: {
                    date: 'desc',
                },
                take: 5,
            }),
            
            prisma.invoice.groupBy({
                by: ['status'],
                _count: {
                    id: true,
                },
                _sum: {
                    amount: true,
                },
            }),
            
            prisma.customer.count(),
        ]);

        const [revenueResult, latestInvoicesResult, invoiceStatsResult, customersResult] = results;

        if (revenueResult.status === 'rejected') {
            console.error('Revenue query failed:', revenueResult.reason);
        }
        if (latestInvoicesResult.status === 'rejected') {
            console.error('Latest invoices query failed:', latestInvoicesResult.reason);
        }
        if (invoiceStatsResult.status === 'rejected') {
            console.error('Invoice stats query failed:', invoiceStatsResult.reason);
        }
        if (customersResult.status === 'rejected') {
            console.error('Customers query failed:', customersResult.reason);
        }

        const revenue = revenueResult.status === 'fulfilled' ? revenueResult.value : [];
        const latestInvoices = latestInvoicesResult.status === 'fulfilled' ? latestInvoicesResult.value : [];
        const invoiceStats = invoiceStatsResult.status === 'fulfilled' ? invoiceStatsResult.value : [];
        const customers = customersResult.status === 'fulfilled' ? customersResult.value : 0;

        const paidInvoices = invoiceStats.find(stat => stat.status === 'paid');
        const pendingInvoices = invoiceStats.find(stat => stat.status === 'pending');
        
        const totalInvoices = invoiceStats.reduce((sum, stat) => sum + stat._count.id, 0);
        const totalPaidInvoices = paidInvoices?._sum.amount ?? 0;
        const totalPendingInvoices = pendingInvoices?._sum.amount ?? 0;
        const paidCount = paidInvoices?._count.id ?? 0;
        const pendingCount = pendingInvoices?._count.id ?? 0;

        const formattedLatestInvoices = latestInvoices.map((invoice) => ({
            amount: invoice.amount,
            id: invoice.id,
            name: invoice.customer?.name ?? 'Unknown Customer',
            image_url: invoice.customer?.image_url ?? '/customers/default.png',
            email: invoice.customer?.email ?? 'unknown@example.com',
        })).map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));

        return {
            revenue,
            latestInvoices: formattedLatestInvoices,
            numberOfInvoices: totalInvoices,
            totalPaidInvoices: formatCurrency(totalPaidInvoices),
            totalPendingInvoices: formatCurrency(totalPendingInvoices),
            paidCount,
            pendingCount,
            numberOfCustomers: customers,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch dashboard data.');
    }
}

export async function fetchInvoiceStats() {
    try {
        const stats = await prisma.invoice.groupBy({
            by: ['status'],
            _count: { id: true },
            _sum: { amount: true },
        });

        const totalInvoices = stats.reduce((sum, stat) => sum + stat._count.id, 0);
        const paidInvoices = stats.find(stat => stat.status === 'paid');
        const pendingInvoices = stats.find(stat => stat.status === 'pending');

        return {
            totalInvoices,
            paidCount: paidInvoices?._count.id ?? 0,
            pendingCount: pendingInvoices?._count.id ?? 0,
            totalPaidAmount: paidInvoices?._sum.amount ?? 0,
            totalPendingAmount: pendingInvoices?._sum.amount ?? 0,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice statistics.');
    }
}

export async function fetchCustomerCount(): Promise<number> {
    try {
        return await prisma.customer.count();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch customer count.');
    }
}

export async function fetchRevenueData() {
    try {
        return await prisma.revenue.findMany();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchAllInvoices(): Promise<number> {
    try {
        return await prisma.invoice.count();
    } catch (error) {
        console.error('Database error', error);
        return -1;
    }
}

export async function fetchPaidInvoices(): Promise<number> {
    try {
        return await prisma.invoice.count({
            where: { status: 'paid' }
        });
    } catch (error) {
        console.error('Database error', error);
        return -1;
    }
}

export async function fetchPendingInvoices(): Promise<number> {
    try {
        return await prisma.invoice.count({
            where: { status: 'pending' }
        });
    } catch (error) {
        console.error('Database error', error);
        return -1;
    }
}

export async function fetchLatestInvoices() {
    try {
        const data = await prisma.invoice.findMany({
            include: {
                customer: true,
            },
            orderBy: {
                date: 'desc',
            },
            take: 5,
        });

        const latestInvoices = data.map((invoice) => ({
            amount: invoice.amount,
            id: invoice.id,
            name: invoice.customer.name,
            image_url: invoice.customer.image_url,
            email: invoice.customer.email,
        })).map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));

        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchCardData() {
    try {
        // Single optimized query using groupBy for all invoice statistics
        const [invoiceStats, customerCount] = await Promise.all([
            prisma.invoice.groupBy({
                by: ['status'],
                _count: {
                    id: true,
                },
                _sum: {
                    amount: true,
                },
            }),
            prisma.customer.count(),
        ]);

        const totalInvoices = invoiceStats.reduce((sum, stat) => sum + stat._count.id, 0);
        const paidInvoices = invoiceStats.find(group => group.status === 'paid');
        const pendingInvoices = invoiceStats.find(group => group.status === 'pending');

        return {
            numberOfCustomers: customerCount,
            numberOfInvoices: totalInvoices,
            totalPaidInvoices: formatCurrency(paidInvoices?._sum.amount ?? 0),
            totalPendingInvoices: formatCurrency(pendingInvoices?._sum.amount ?? 0),
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                customer: true,
            },
            where: {
                OR: [
                    {customer: {name: {contains: query, mode: 'insensitive'}}},
                    {customer: {email: {contains: query, mode: 'insensitive'}}},
                    {status: {contains: query, mode: 'insensitive'}},
                ],
            },
            orderBy: {
                date: 'desc',
            },
            take: ITEMS_PER_PAGE,
            skip: offset,
        });

        return invoices.map(invoice => ({
            id: invoice.id,
            amount: invoice.amount,
            date: invoice.date,
            status: invoice.status,
            name: invoice.customer?.name ?? 'Unknown Customer',
            email: invoice.customer?.email ?? 'unknown@example.com',
            image_url: invoice.customer?.image_url ?? '/customers/default.png',
        }));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await prisma.invoice.count({
            where: {
                OR: [
                    {customer: {name: {contains: query, mode: 'insensitive'}}},
                    {customer: {email: {contains: query, mode: 'insensitive'}}},
                    {status: {contains: query, mode: 'insensitive'}},
                ],
            },
        });

        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchInvoiceById(id: string) {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: {id},
            select: {
                id: true,
                customer_id: true,
                amount: true,
                status: true,
            },
        });

        if (!invoice) {
            throw new Error('Invoice not found');
        }

        return {
            ...invoice,
            amount: invoice.amount / 100,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function fetchCustomers() {
    try {
        const customers = await prisma.customer.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return customers;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const customers = await prisma.customer.findMany({
            include: {
                invoices: true,
            },
            where: {
                OR: [
                    {name: {contains: query, mode: 'insensitive'}},
                    {email: {contains: query, mode: 'insensitive'}},
                ],
            },
            orderBy: {
                name: 'asc',
            },
        });

        const customersWithTotals = customers.map((customer) => {
            const total_invoices = customer.invoices.length;
            const total_pending = customer.invoices
                .filter(invoice => invoice.status === 'pending')
                .reduce((sum, invoice) => sum + invoice.amount, 0);
            const total_paid = customer.invoices
                .filter(invoice => invoice.status === 'paid')
                .reduce((sum, invoice) => sum + invoice.amount, 0);

            return {
                ...customer,
                total_invoices,
                total_pending: formatCurrency(total_pending),
                total_paid: formatCurrency(total_paid),
                invoices: undefined, // Remove the invoices array from the result
            };
        });

        return customersWithTotals;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}
