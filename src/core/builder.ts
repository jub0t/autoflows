// Node.ts --------------------------------------------------

export type SchemaItem = {
    key: string;
    type: any;
    required: boolean;
};

export interface NodeOptions {
    name: string;
    description: string;
}

export class Node {
    name: string;
    description: string;
    schema: SchemaItem[];

    constructor(options: NodeOptions, schema: SchemaItem[]) {
        this.name = options.name;
        this.description = options.description;
        this.schema = schema;
    }
}
