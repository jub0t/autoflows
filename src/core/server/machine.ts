import { Node } from "../builder";

export type NodeConfig = {
    onAct: () => any | Promise<any>;
};

export class AutoflowsMachine {
    private nodes = new Map<string, Node>();
    private configs = new Map<string, NodeConfig>();

    // Add a node
    add(node: Node) {
        this.nodes.set(node?.options.name, node);
        return this;
    }

    // Define behavior for a node
    define(nodeName: string, config: NodeConfig) {
        if (!this.nodes.has(nodeName)) {
            throw new Error(`Node "${nodeName}" was not added.`);
        }
        this.configs.set(nodeName, config);
        return this;
    }

    // Run a node
    async process(nodeName: string) {
        const config = this.configs.get(nodeName);
        if (!config) {
            throw new Error(`Node "${nodeName}" has no onAct handler.`);
        }
        return await config.onAct();
    }
}
