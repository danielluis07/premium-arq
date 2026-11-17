import type { ReactNode } from "react";
import { Grid } from "@/components/ui/grid";

type TwoColumnCopyProps = {
  /** Paragraphs for the left (cols 9–15) and right (cols 17–23) columns. */
  columns: [string[], string[]];
  /** Extra content placed under the right column's paragraphs, e.g. a TextLink. */
  rightFooter?: ReactNode;
  className?: string;
};

/** Body copy in two columns on the 24-col grid; stacks into one column on mobile. */
export function TwoColumnCopy({
  columns: [left, right],
  rightFooter,
  className = "",
}: TwoColumnCopyProps) {
  return (
    <Grid className={`gap-y-6 ${className}`}>
      <div className="col-span-24 flex flex-col gap-6 md:col-start-9 md:col-span-7">
        {left.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="col-span-24 flex flex-col gap-6 md:col-start-17 md:col-span-7">
        {right.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {rightFooter}
      </div>
    </Grid>
  );
}
