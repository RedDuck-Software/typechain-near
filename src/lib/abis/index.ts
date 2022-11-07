export type PrimitiveType = 'string' | 'number' | 'boolean';

export type ComplexType = {
  [key: string]: PrimitiveType | ComplexType;
};

export const isPrimitive = (type: PrimitiveType | ComplexType) => {
  if (typeof 0 === type || typeof '' === type || typeof false === type) return true;
  return false;
};

type NearFunctionBase = {
  name: string;
  args: Array<{
    name: string;
    type: PrimitiveType | ComplexType;
  }>;
};

export type NearFunctionView = {
  returnType?: PrimitiveType | ComplexType | 'void';
} & NearFunctionBase;

export type NearFunctionCall = {
  isPayable: boolean;
} & NearFunctionBase;

export type NearContractAbi = {
  contractName: string;
  methods: {
    view: Array<NearFunctionView>;
    call: Array<NearFunctionCall>;
  };
  byteCode: string;
};

export const parseAbi = (abiJson: string) => {
  return JSON.parse(abiJson) as NearContractAbi;
};
