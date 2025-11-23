import { Node } from "../builder";

export class AutoflowsBuilder {
    public nodes: Node[] = [];

    add(node: Node) {
        this.nodes.push(node);
        return this;
    }
}