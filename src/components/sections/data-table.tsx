import { Rich } from "@/components/rich";
import { Table, Td, Th } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * A table from translated strings. The first column can be mono (names of
 * tools) and the last muted (notes), as in the designs' engine tables.
 */
export function DataTable({
  columns,
  rows,
  monoFirst = false,
  mutedLast = false,
  frame = "card",
}: {
  columns?: readonly string[];
  rows: readonly (readonly string[])[];
  monoFirst?: boolean;
  mutedLast?: boolean;
  frame?: "thin" | "card";
}) {
  return (
    <Table frame={frame}>
      {columns && (
        <thead>
          <tr>
            {columns.map((c) => (
              <Th key={c}>{c}</Th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) => (
              <Td
                key={i}
                className={cn(
                  "whitespace-normal",
                  monoFirst && i === 0 && "font-mono",
                  mutedLast && i === row.length - 1 && "text-ink-muted",
                )}
              >
                <Rich text={cell} />
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

/** Two-column label/value table ("Specs and limits"). */
export function SpecsTable({
  rows,
}: {
  rows: readonly (readonly [string, string] | readonly string[])[];
}) {
  return (
    <Table frame="card">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <Td className="whitespace-normal">
              <strong>{label}</strong>
            </Td>
            <Td className="whitespace-normal">
              <Rich text={value ?? ""} />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
