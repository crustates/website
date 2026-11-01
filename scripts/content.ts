// Builds the content collections into .content-collections/ (types and data),
// so `vp check` and `vp test` can run before `vp build`. Exits non-zero on
// invalid content. Runs from `vp install` (prepare) and as `vp run content`.
import { createBuilder } from "@content-collections/core";

const builder = await createBuilder("content-collections.ts");
let failed = false;
for (const event of [
  "collector:read-error",
  "collector:parse-error",
  "transformer:validation-error",
  "transformer:result-error",
  "transformer:error",
] as const) {
  builder.on(event, (error) => {
    failed = true;
    console.error(`content: ${event}`, error);
  });
}
await builder.build();
if (failed) process.exit(1);
