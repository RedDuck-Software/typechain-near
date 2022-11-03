type KeysMatching<T, V> = NonNullable<
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;

export type PrimitiveType = 'string' | 'number' | 'boolean';

export type ComplexType = {
    [key:string]: PrimitiveType | ComplexType
}

type NearFunction = {
    name: string,
    returnType: "string",
    args: Array<{
        name: string,
        type: PrimitiveType | ComplexType
    }>
}

export type NearContractAbi = {
    methods: {
        view: Array<NearFunction>,
        call: Array<NearFunction>,
    },
    byteCode: string
}


export const parseAbi = (abiJson: string) =>{
    return JSON.parse(abiJson) as NearContractAbi;
}