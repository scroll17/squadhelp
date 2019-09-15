import { STATUS_OF_CONTEST_AND_ENTRY, ICON } from "../constants";

export default (status) => {
    const { EXPECTATION, REJECT, RESOLVE } = STATUS_OF_CONTEST_AND_ENTRY;
    switch (status) {
        case EXPECTATION:
            return ICON.TIMES;
        case RESOLVE:
            return ICON.CHECK;
        case REJECT:
            return ICON.CLOSE;
        default:
            return null
    }
};