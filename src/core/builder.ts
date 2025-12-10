import { SchemaType } from "./datatypes";

// Node.ts --------------------------------------------------
export enum NodeTraits {
    IS_ROOT,
    IS_TERMINAL,
}

export interface NodeOptions {
    name: string;
    description: string;
    label?: string;
    category?: string | null

    // Settings
    traits?: NodeTraits[]

    // JSX
    // TODO: Get rid of this later, keep it for now
    icon?: React.JSX.Element,
}

export class Node<T> {
    options: NodeOptions;

    input_schema?: SchemaType<T>[] | undefined;
    output_schema?: SchemaType<T>[] | undefined;

    constructor(args: {
        options: NodeOptions,
        schema: {
            input?: SchemaType<T>[];
            output?: SchemaType<T>[]
        }
    }) {
        // Misc data
        this.options = args.options;

        // Schemas
        this.output_schema = args.schema?.output
        this.input_schema = args.schema?.input
    }
}
