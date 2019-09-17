import { STATUS_OF_CONTEST_AND_ENTRY, ICON } from "../constants";

export default (status) => {
    const {
        EXPECTATION, REJECT, RESOLVE,
        PENDING, INVALID, VALID
    } = STATUS_OF_CONTEST_AND_ENTRY;

    switch (status) {
        case EXPECTATION:
        case PENDING:
            return ICON.TIMES;
        case RESOLVE:
        case VALID:
            return ICON.CHECK;
        case REJECT:
        case INVALID:
            return ICON.CLOSE;
        default:
            return null
    }
};