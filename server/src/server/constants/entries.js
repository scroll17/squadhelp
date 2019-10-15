const ENTRIES_STATUS = {
    RESOLVE: 'resolve',
    REJECT: 'reject',
    EXPECTATION: 'expectation',
};

const ENTRY_VALIDATION_STATUS = {
    VALID: 'valid',
    INVALID: 'invalid',
    PENDING: 'pending',
};


const ENTRY_FIELDS = {
    USER_ID: "userId",
    CONTEST_ID: 'contestId',
    STATUS: "status",
    IS_VALID: 'isValid',
    LIKED: 'liked',
    TEXT: 'text',
    FILE: 'file'
};

module.exports = {
    ENTRIES_STATUS,
    ENTRY_VALIDATION_STATUS,
    ENTRY_FIELDS
};