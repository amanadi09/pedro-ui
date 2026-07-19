export type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-small">
        <thead>
          <tr className="border-b border-border bg-surface-hover text-left">
            <th className="px-4 py-2.5 font-medium text-text-primary">Prop</th>
            <th className="px-4 py-2.5 font-medium text-text-primary">Type</th>
            <th className="px-4 py-2.5 font-medium text-text-primary">Default</th>
            <th className="px-4 py-2.5 font-medium text-text-primary">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border last:border-0">
              <td className="px-4 py-2.5 font-mono text-code text-primary-700 dark:text-primary-400">
                {row.name}
              </td>
              <td className="px-4 py-2.5 font-mono text-code text-text-secondary">{row.type}</td>
              <td className="px-4 py-2.5 font-mono text-code text-text-secondary">
                {row.default ?? '—'}
              </td>
              <td className="px-4 py-2.5 text-text-secondary">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
