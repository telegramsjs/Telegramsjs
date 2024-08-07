export class RevenueWithdrawalState {
    /**
     * @param {import("@telegram.ts/types").RevenueWithdrawalState} data - Data about the describes the state of a revenue withdrawal operation
     */
    constructor(data: import("@telegram.ts/types").RevenueWithdrawalState);
    /** Date the withdrawal was completed in Unix time */
    createdTimestamp: number | undefined;
    /** An HTTPS URL that can be used to see transaction details */
    url: string | undefined;
    /** Type of the state, always “failed” */
    failed: boolean | undefined;
    /** Type of the state, always “pending” */
    pending: boolean | undefined;
    /**
     * Date the withdrawal was completed
     * @type {Date}
     */
    get createdAt(): Date;
    /**
     * @return {this is this & { createdTimestamp: number; url: string; }}
     */
    isSucceeded(): this is this & {
        createdTimestamp: number;
        url: string;
    };
}
//# sourceMappingURL=RevenueWithdrawalState.d.ts.map