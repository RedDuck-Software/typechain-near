"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearContract = exports.NearContractBase = exports.CallOverridesPayable = exports.CallOverrides = void 0;
class CallOverrides {
}
exports.CallOverrides = CallOverrides;
class CallOverridesPayable {
}
exports.CallOverridesPayable = CallOverridesPayable;
class NearContractBase {
    constructor(contractId, signerAccount) {
        this._contractId = contractId;
        this._signer = signerAccount;
    }
    get contractId() {
        return this._contractId;
    }
    get signer() {
        return this._signer;
    }
    connect(account) {
        //  TODO: implement
    }
    functionCall({ methodName, args, overrides = {}, }) {
        if (!this._signer)
            throw new Error('Signer is not defined');
        return this._signer.functionCall({
            contractId: this.contractId,
            methodName,
            args: args !== null && args !== void 0 ? args : {},
            gas: overrides === null || overrides === void 0 ? void 0 : overrides.gas,
            attachedDeposit: overrides === null || overrides === void 0 ? void 0 : overrides.attachedDeposit,
        });
    }
    functionView({ methodName, args, }) {
        if (!this._signer)
            throw new Error('Signer is not defined');
        return this._signer.viewFunction({
            contractId: this.contractId,
            methodName,
            args: args !== null && args !== void 0 ? args : {},
        });
    }
}
exports.NearContractBase = NearContractBase;
class NearContract extends NearContractBase {
    constructor(accountId, signerAccount) {
        super(accountId, signerAccount);
        this.call = new Proxy({}, {
            get: (_, key) => {
                return (args, overrides) => {
                    return this.functionCall({ methodName: key, args, overrides });
                };
            },
        });
        this.view = new Proxy({}, {
            get: (_, key) => {
                return (args) => {
                    return this.functionView({ methodName: key, args });
                };
            },
        });
    }
}
exports.NearContract = NearContract;
