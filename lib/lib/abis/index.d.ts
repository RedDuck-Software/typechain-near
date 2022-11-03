export declare type PrimitiveType = 'string' | 'number' | 'boolean';
export declare type ComplexType = {
    [key: string]: PrimitiveType | ComplexType;
};
declare type NearFunction = {
    name: string;
    returnType: "string";
    args: Array<{
        name: string;
        type: PrimitiveType | ComplexType;
    }>;
};
export declare type NearContractAbi = {
    methods: {
        view: Array<NearFunction>;
        call: Array<NearFunction>;
    };
    byteCode: string;
};
export declare const parseAbi: (abiJson: string) => NearContractAbi;
export {};
