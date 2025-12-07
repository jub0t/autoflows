import crypto from "crypto";

export enum PrimitiveTypes {
    String,
    Number,
    Boolean,
    Object,
    Array,
};

export type SchemaType<T> = STRING | NUMBER | BOOLEAN | OBJECT<T> | ARRAY<T>

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
export class ARRAY<T> extends Primitive {
    type = PrimitiveTypes.Array
    value?: Array<T> | null;
    key: string;

    constructor(key: string, value?: Array<T> | null) {
        super();
        this.key = key;
        this.value = value;
    }
}

// todo()!
export class OBJECT<T> extends Primitive {
    type = PrimitiveTypes.Object
    value?: Record<string, SchemaType<T>> | null;
    key: string;

    constructor(key: string, value?: Record<string, SchemaType<T>> | null) {
        super();
        this.key = key;
        this.value = value;
    }

    set(value?: Record<string, SchemaType<T>> | null) {
        this.value = value;
    }
}

export const DataTypes = {
    STRING,
    NUMBER,
    BOOLEAN,
    ARRAY,
    OBJECT,
}
