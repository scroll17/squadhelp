import { baseURL } from "../api/baseURL";

export const CONTEST_USER_FILE = `${baseURL}/images/tmp/contestFiles/`;
export const ENTRY_USER_FILE = `${baseURL}/images/tmp/entryFiles/`;

export const STATUS_OF_CONTEST_AND_ENTRY = {
    RESOLVE: 'resolve',
    REJECT: 'reject',
    EXPECTATION: 'expectation',

    VALID: 'valid',
    INVALID: 'invalid',
    PENDING: 'pending',
};