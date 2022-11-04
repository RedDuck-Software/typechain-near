import { Account } from 'near-api-js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
export declare type NearBigint = number | string | bigint;
export declare class CallOverrides {
    gas?: NearBigint;
}
export declare class CallOverridesPayable {
    attachedDeposit?: NearBigint;
}
export declare abstract class NearContractBase {
    private _contractId;
    private _signer?;
    constructor(contractId: string, signerAccount?: Account);
    get contractId(): string;
    get signer(): Account | undefined;
    connect(account: Account): void;
    protected functionCall<TArgs extends object = object>({ methodName, args, overrides, }: {
        methodName: string;
        args?: TArgs;
        overrides?: CallOverrides & CallOverridesPayable;
    }): Promise<FinalExecutionOutcome>;
    protected functionView<TArgs extends object = object, TReturn = unknown>({ methodName, args, }: {
        methodName: string;
        args?: TArgs;
    }): Promise<any>;
}
export declare class NearContract extends NearContractBase {
    constructor(accountId: string, signerAccount: Account);
    call: {
        [key: string]: (args: object, overrides?: CallOverrides) => Promise<FinalExecutionOutcome>;
    };
    view: {
        [key: string]: (args: object) => Promise<FinalExecutionOutcome>;
    };
}
