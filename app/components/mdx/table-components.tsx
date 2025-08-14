import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Table = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>) => (
  <div className="overflow-x-auto mb-4">
    <table
      className="min-w-full border border-neutral-300 dark:border-neutral-600 divide-y divide-neutral-300 dark:divide-neutral-600"
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHead = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) => (
  <thead className="bg-neutral-50 dark:bg-neutral-800" {...props}>
    {children}
  </thead>
);

export const TableBody = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>) => (
  <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-300 dark:divide-neutral-600" {...props}>
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>) => <tr {...props}>{children}</tr>;

export const TableHeader = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) => (
  <th
    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>) => (
  <td
    className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
    {...props}
  >
    {children}
  </td>
);
