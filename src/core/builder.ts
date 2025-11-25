// Node.ts --------------------------------------------------

export type SchemaItem = {
    key: string;
    type: any;
    required: boolean;
};

export interface NodeOptions {
    name: string;
    description: string;
    label?: string;
}

export class Node {
    options: NodeOptions;

    input_schema?: SchemaItem[] | undefined;
    output_schema?: SchemaItem[] | undefined;

    constructor(args: { options: NodeOptions, schema: { input?: SchemaItem[]; output?: SchemaItem[] } }) {
        // Misc data
        this.options = args.options;

        // Schemas
        this.output_schema = args.schema?.output;
        this.input_schema = args.schema?.input;
    }
}
