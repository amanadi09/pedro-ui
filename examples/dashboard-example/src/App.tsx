import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
} from 'lucide-react';
import { Card, Badge, Avatar, Button, IconButton, Input, Alert, useTheme } from '@pedro-ui/react';
import { formatCurrency, formatNumber } from '@pedro-ui/utils';
import { useDebounce } from '@pedro-ui/hooks';

type Metric = {
  label: string;
  value: string;
  delta: number;
  icon: typeof Users;
};

const metrics: Metric[] = [
  { label: 'Monthly revenue', value: formatCurrency(48290), delta: 12.4, icon: DollarSign },
  { label: 'Active users', value: formatNumber(8342, 'compact'), delta: 4.1, icon: Users },
  { label: 'Conversion rate', value: '3.2%', delta: -0.6, icon: Activity },
];

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
};

const orders: Order[] = [
  { id: 'NV-1042', customer: 'Ada Lovelace', amount: 1290, status: 'paid' },
  { id: 'NV-1041', customer: 'Grace Hopper', amount: 480, status: 'pending' },
  { id: 'NV-1040', customer: 'Alan Turing', amount: 2100, status: 'paid' },
  { id: 'NV-1039', customer: 'Katherine Johnson', amount: 90, status: 'failed' },
];

const statusColorScheme: Record<Order['status'], 'success' | 'warning' | 'danger'> = {
  paid: 'success',
  pending: 'warning',
  failed: 'danger',
};

export default function App() {
  const { resolvedMode, toggleMode } = useTheme();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [dismissedBanner, setDismissedBanner] = useState(false);

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-heading text-text-primary">Overview</h1>
            <p className="text-small text-text-secondary">
              Pedro UI dashboard example — every element on this page is a Pedro UI component.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              aria-label="Toggle theme"
              icon={
                <span className="text-caption font-medium">
                  {resolvedMode === 'dark' ? '☀' : '🌙'}
                </span>
              }
              variant="ghost"
              colorScheme="neutral"
              onClick={toggleMode}
            />
            <IconButton
              aria-label="Notifications"
              icon={<Bell />}
              variant="ghost"
              colorScheme="neutral"
              isRound
            />
            <Avatar name="Ada Lovelace" size="sm" colorScheme="primary" status="online" />
          </div>
        </header>

        {!dismissedBanner && (
          <Alert
            status="info"
            title="This is a static example"
            onDismiss={() => setDismissedBanner(true)}
            className="mb-6"
          >
            Data on this page is hard-coded — it's here to demonstrate real component composition,
            not to be a working product.
          </Alert>
        )}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.delta >= 0;
            return (
              <Card key={metric.label} variant="elevated">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-small text-text-secondary">{metric.label}</p>
                    <p className="mt-1 text-heading text-text-primary">{metric.value}</p>
                  </div>
                  <span className="dark:bg-primary-950/40 flex size-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:text-primary-400">
                    <Icon className="size-4" />
                  </span>
                </div>
                <Badge
                  className="mt-3"
                  size="sm"
                  variant="subtle"
                  colorScheme={isPositive ? 'success' : 'danger'}
                >
                  {isPositive ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {Math.abs(metric.delta)}%
                </Badge>
              </Card>
            );
          })}
        </div>

        <Card variant="elevated" noPadding>
          <Card.Header className="px-6 pt-6">
            <h2 className="text-title text-text-primary">Recent orders</h2>
            <div className="flex items-center gap-2">
              <div className="w-56">
                <Input
                  aria-label="Search orders"
                  placeholder="Search customer..."
                  size="sm"
                  leftElement={<Search />}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button size="sm" leftIcon={<Plus />}>
                New order
              </Button>
            </div>
          </Card.Header>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-small">
              <thead>
                <tr className="border-b border-border text-left text-text-secondary">
                  <th className="px-6 py-2.5 font-medium">Order</th>
                  <th className="px-6 py-2.5 font-medium">Customer</th>
                  <th className="px-6 py-2.5 font-medium">Amount</th>
                  <th className="px-6 py-2.5 font-medium">Status</th>
                  <th className="px-6 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3 font-mono text-code text-text-secondary">
                      {order.id}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={order.customer} size="xs" />
                        <span className="text-text-primary">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-text-primary">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-3">
                      <Badge
                        size="sm"
                        variant="subtle"
                        colorScheme={statusColorScheme[order.status]}
                        withDot
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <IconButton
                        aria-label={`More actions for order ${order.id}`}
                        icon={<MoreHorizontal />}
                        variant="ghost"
                        colorScheme="neutral"
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                      No orders match &ldquo;{debouncedSearch}&rdquo;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
