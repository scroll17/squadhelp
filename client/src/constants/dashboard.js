import { baseURL } from "../api/baseURL";

export const CONTEST_USER_FILE = `${baseURL}/images/tmp/contestFiles/`;
export const ENTRY_USER_FILE = `${baseURL}/images/tmp/entryFiles/`;

export const CONTEST_STATUS = {
    OPEN: 'open',
    CLOSED: 'closed',
    AWAITING: 'awaiting'
};

export const TYPE_UPDATE_ENTRY = {
    STATUS: 'status',
    LIKED: 'liked',
};

export const STATUS_OF_CONTEST_AND_ENTRY = {
    RESOLVE: 'resolve',
    REJECT: 'reject',
    EXPECTATION: 'expectation',

    VALID: 'valid',
    INVALID: 'invalid',
    PENDING: 'pending',
};