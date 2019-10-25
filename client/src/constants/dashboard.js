import { baseURL } from "../api/baseURL";

export const CONTEST_USER_FILE = `${baseURL}/images/tmp/contestFiles/`;
export const ENTRY_USER_FILE = `${baseURL}/images/tmp/entryFiles/`;

export const CONTEST_STATUS = {
    OPEN: 'open',
    CLOSED: 'closed',
    AWAITING: 'awaiting'
};

export const CONTEST_REDUCER_VAL = {
    CONTEST_FORM_DATA: "contestFormData",
    CONTEST_NOW: "contestNow",
    CONTEST_QUEUE: "contestQueue"
};

export const CONTEST_FIELDS = {
    CONTEST_TYPE: "contestType",
    PRIORITY: "priority",
    NAME: 'name',
    TYPE: 'type',
    WHAT_VENTURE_DOES: 'whatVentureDoes',
    TARGET_CUSTOMERS: "targetCustomers",
    STYLE: 'style',
    FILE: 'file',
    TITLE: "title",
    TYPE_OF_VENTURE: "typeOfVenture",
    CONTEST_ID: 'contestId',
    USER_ID: 'userId',
    PRICE: 'price',
    STATUS: "status",
    USER: "User",
    ENTRIES: 'Entries',
    NUMBER_OF_ENTRY: "numberOfEntry"
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