# Autoflows

A framework/library to build embeddable Workflows for your web-app quickly.

```ts
  // Client-side node building...
  const node = new NodeBuilder(
    "condition",
    [
      { key: "id", type: STRING, required: false },
      { key: "success", type: BOOLEAN, required: false }
    ] as const
  );

  // Server-side Virtual Machine...
  const autoflows = new Autoflows()
    .add(node)
    .define("condition", {
      onExecute: () => { }
    });
```