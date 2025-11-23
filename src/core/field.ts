import { ARRAY, BOOLEAN, NUMBER, OBJECT, STRING } from "./datatypes";

export type FieldTypes = STRING | NUMBER | BOOLEAN | OBJECT | ARRAY;
export class NodeField {
    private primitive: FieldTypes;
    private key: string;

    constructor(key: string, Primitive: new () => FieldTypes) {
        this.key = key;
        this.primitive = new Primitive();
    }
}