export class Trait {
    constructor(name: string, options: { validator: () => boolean }) { }
}

new Trait("is_root", {
    validator: () => {
        return 1 === 1
    }
})