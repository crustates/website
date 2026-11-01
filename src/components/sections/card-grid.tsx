import { Rich } from "@/components/rich";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

type Item = { title: string; body: string };

const grid = "grid gap-6";
const columns = {
  /** About three across at full width. */
  3: "grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]",
  /** About four across at full width. */
  4: "grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]",
  2: "md:grid-cols-2",
};

/** Small cards with a title and a short text ("What you get", FAQ strips). */
export function CardGrid({
  items,
  cols = 3,
  className,
}: {
  items: readonly Item[];
  cols?: keyof typeof columns;
  className?: string;
}) {
  return (
    <div className={cn(grid, columns[cols], className)}>
      {items.map((item) => (
        <Card key={item.title} padding="tight" className="flex flex-col gap-3">
          <h3 className="text-heading-4">{item.title}</h3>
          <p className="text-body-s">
            <Rich text={item.body} />
          </p>
        </Card>
      ))}
    </div>
  );
}

/** Numbered steps ("How it works"). */
export function StepGrid({ items, className }: { items: readonly Item[]; className?: string }) {
  return (
    <ol className={cn("m-0 list-none p-0", grid, columns[4], className)}>
      {items.map((item, i) => (
        <Card key={item.title} asChild className="flex flex-col gap-2.5">
          <li>
            <Tag className="self-start">{i + 1}</Tag>
            <h3 className="text-heading-4">{item.title}</h3>
            <p className="text-body-s">
              <Rich text={item.body} />
            </p>
          </li>
        </Card>
      ))}
    </ol>
  );
}
