export enum PrimitiveTypes {
    String,
    Number,
    Boolean,
    Object,
    Array,
};

// ** Drivers ** //
// todo()!
export class STRING {
    type = PrimitiveTypes.String
    constructor() { }
}

// todo()!
export class NUMBER {
    type = PrimitiveTypes.Number
    constructor() { }
}

// todo()!
export class BOOLEAN {
    type = PrimitiveTypes.Boolean
    constructor() { }
}

// todo()!
export class ARRAY {
    type = PrimitiveTypes.Array
    constructor() { }
}

// todo()!
export class OBJECT {
    type = PrimitiveTypes.Object
    constructor() { }
}

export const DataTypes = {
    STRING,
    NUMBER,
    BOOLEAN,
    ARRAY,
    OBJECT,
}