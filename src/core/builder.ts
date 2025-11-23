// ---- Types ----

import { FieldTypes } from "./field";

export type SchemaItem = {
    key: string;
    type: new () => FieldTypes;
    required: boolean;
};

export type NodeConfig = {
    onExecute: () => void;
};

// ---- NodeBuilder ----

export class NodeBuilder<B extends readonly SchemaItem[], Name extends string> {
    constructor(
        public readonly name: Name,
        public readonly schema: B,
    ) { }
}

// ---- Autoflows ----

class Autoflows<Nodes extends Record<string, NodeBuilder<any, any>> = {}> {
    private nodes = new Map<string, NodeBuilder<any, any>>();
    private nodeConfigs = new Map<string, NodeConfig>();

    add<N extends string, B extends readonly SchemaItem[]>(
        node: NodeBuilder<B, N>
    ) {
        this.nodes.set(node.name, node);
        return new Autoflows<Nodes & { [K in N]: NodeBuilder<B, N> }>();
    }

    define<Name extends keyof Nodes & string>(
        nodeName: Name,
        config: NodeConfig
    ) {
        this.nodeConfigs.set(nodeName, config);
        return this;
    }

    async process<Name extends keyof Nodes & string>(nodeName: Name) {
        const config = this.nodeConfigs.get(nodeName);
        if (!config) throw new Error(`Node "${nodeName}" has no onExecute handler`);
        config.onExecute();
    }
}

export default Autoflows;
