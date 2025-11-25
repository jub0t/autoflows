// Node.ts --------------------------------------------------
import { FieldTypes } from "./field"
export type SchemaFieldOptions = {
    key: string;
    type: new () => FieldTypes;
    nullable?: boolean;
};

export class SchemaField {
    options: SchemaFieldOptions;
    constructor(options: SchemaFieldOptions) {
        this.options = options;
    };

    set(value: FieldTypes | string | number | boolean | object) {

    }
}

export interface NodeOptions {
    name: string;
    description: string;
    label?: string;
}

export class Node {
    options: NodeOptions;

    input_schema?: SchemaField[] | undefined;
    output_schema?: SchemaField[] | undefined;

    constructor(args: { options: NodeOptions, schema: { input?: SchemaFieldOptions[]; output?: SchemaFieldOptions[] } }) {
        // Misc data
        this.options = args.options;

        // Schemas
        this.output_schema = args.schema?.output?.map((field) => new SchemaField(field));
        this.input_schema = args.schema?.input?.map((field) => new SchemaField(field));
    }
}
