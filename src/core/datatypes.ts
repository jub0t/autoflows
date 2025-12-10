import crypto from "crypto";

export enum PrimitiveTypes {
    String,
    Number,
    Boolean,
    Object,
    Array,
    Blob,
};

export type SchemaType = STRING | NUMBER | BOOLEAN | OBJECT | ARRAY

class Primitive {
    unique_id = crypto.randomBytes(8).toString("hex");
    nullable: boolean = false;
}

// ** Drivers ** //
// todo()!
export class STRING extends Primitive {
    type = PrimitiveTypes.String
    value?: string | null;
    key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }

    set(value: string | null) {
        if (value == null && !this.nullable) throw `String DataType does not accept 'null' value`
        this.value = value;
    }
}

// todo()!
export class NUMBER extends Primitive {
    type = PrimitiveTypes.Number
    value?: number | null;
    key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }
}

// todo()!
export class BOOLEAN extends Primitive {
    type = PrimitiveTypes.Boolean
    value?: boolean | null;
    key: string;
    constructor(key: string) {
        super();
        this.key = key;
    }
}

// todo()!
export class ARRAY extends Primitive {
    type = PrimitiveTypes.Array
    value?: SchemaType[] | null;
    key: string;

    constructor(key: string, value?: SchemaType[] | null) {
        super();
        this.key = key;
        this.value = value;
    }
}

// todo()!
export class OBJECT extends Primitive {
    type = PrimitiveTypes.Object
    fields: SchemaType[] = [];
    key: string;

    constructor(key: string, fields?: SchemaType[]) {
        super();
        this.key = key;
        this.fields = fields || [];
    }

    set(fields?: SchemaType[]) {
        this.fields = fields || [];
    }
}

// todo()!
export class BLOB extends Primitive {
    type = PrimitiveTypes.Blob
    key: string;

    constructor(key: string) {
        super();
        this.key = key;
    }

    set(value: Blob) {
    }
}

export const DataTypes = {
    STRING,
    NUMBER,
    BOOLEAN,
    ARRAY,
    OBJECT,
    BLOB,
}
