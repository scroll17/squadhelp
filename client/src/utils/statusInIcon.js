import { STATUS_OF_CONTEST_AND_ENTRY, CONTEST_STATUS , ICON } from "../constants";

export default (status) => {
    const {
        EXPECTATION, REJECT, RESOLVE,
        PENDING, INVALID, VALID
    } = STATUS_OF_CONTEST_AND_ENTRY;

    const { OPEN, AWAITING, CLOSED } = CONTEST_STATUS;

    switch (status) {
        case EXPECTATION:
        case PENDING:
        case AWAITING:
            return ICON.TIMES;
        case RESOLVE:
        case VALID:
        case OPEN:
            return ICON.CHECK;
        case REJECT:
        case INVALID:
        case CLOSED:
            return ICON.CLOSE;
        default:
            return null
    }
};