A core feature of this tool is to allow the creation and invocation of pre-defined workflows.

```ts
GET /workflow/{workflowId}/{trigger_id}/params

{
    type: string,
    key: string,
    allowNull: boolean
}[]

// Example

[{type: string, key: 'prompt', allowNull: false}]
```

```ts
POST /workflow/{workflowId}/invoke

{
    trigger_id: string,
    params: {
        prompt: string,
    }
}
```

Response
```ts
{
    success: boolean,
    message: string,
    execution_id: string,
}
```

```ts
GET /workflow/{execution_id}/progress

{
    nodes: {
            node_id: string, // unique id for every execution
            node: string // name
            status: awaiting | inprogress | completed | errored,
    }[]
}
```