# Autoflows

A framework/library to build embeddable Workflows for your web-app quickly.

```ts
// shared/schema.ts

export const CronNode = new Node(
  {
    options: { name: "Cronjob", label: "Cron Job", description: "Execute precisely timed actions." },
    schema: {
      output: [
        { key: "date", type: DATE },
      ],
    }
  }
);
```

```ts
// server/index.ts
import { CronNode }from "shared/schema.ts"

// Server-side Virtual Machine...
const autoflows = new Autoflows()
  .add(CronNode)
  .define("Cronjob", {
    onAct: (data) => { }
  });
```

```ts
import { CronNode }from "shared/schema.ts"

// Client-side (React) builder.
const builder = new AutoflowsBuilder().add(myNode)
```

## Contribution

- Entrypoint directory starts at `/src`
- For client-side testing use `cd test` followed by `npm run dev`.