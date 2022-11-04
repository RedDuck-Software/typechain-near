export declare type PrimitiveType = 'string' | 'number' | 'boolean';
export declare type ComplexType = {
    [key: string]: PrimitiveType | ComplexType;
};
export declare const isPrimitive: (type: PrimitiveType | ComplexType) => boolean;
declare type NearFunctionBase = {
    name: string;
    args: Array<{
        name: string;
        type: PrimitiveType | ComplexType;
    }>;
};
export declare type NearFunctionView = {
    returnType?: PrimitiveType | ComplexType | 'void';
} & NearFunctionBase;
export declare type NearFunctionCall = {
    isPayable: boolean;
} & NearFunctionBase;
export declare type NearContractAbi = {
    contractName: string;
    methods: {
        view: Array<NearFunctionView>;
        call: Array<NearFunctionCall>;
    };
    byteCode: string;
};
export declare const parseAbi: (abiJson: string) => NearContractAbi;
export {};
