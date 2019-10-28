const CONTEST_TYPE = {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
};

const CONTEST_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  AWAITING: 'awaiting'
};

const CONTEST_PRIORITY = new Map([
    [CONTEST_TYPE.NAME, 1],
    [CONTEST_TYPE.TAGLINE, 2],
    [CONTEST_TYPE.LOGO, 3],
]);

const CONTEST_PRICE = new Map([
    [CONTEST_TYPE.NAME, 33],
    [CONTEST_TYPE.LOGO, 33],
    [CONTEST_TYPE.TAGLINE, 33],
]);

const CONTEST_FIELDS = {
    CONTEST_ID: "contestId",
    USER_ID: 'userId',
    CONTEST_TYPE: "contestType",
    PRIORITY: "priority",
    TITLE: 'title',
    NAME: 'name',
    STATUS: 'status',
    PRICE: 'price',
    TYPE: 'type',
    WHAT_VENTURE_DOES: 'whatVentureDoes',
    TYPE_OF_VENTURE: 'typeOfVenture',
    TARGET_CUSTOMERS: "targetCustomers",
    STYLE: 'style',
    FILE: 'file'
};

const CONTEST_FIELDS_TO_UPDATE = [
    CONTEST_FIELDS.TITLE,
    CONTEST_FIELDS.TYPE_OF_VENTURE,
    CONTEST_FIELDS.WHAT_VENTURE_DOES,
    CONTEST_FIELDS.TARGET_CUSTOMERS,
    CONTEST_FIELDS.FILE,
    CONTEST_FIELDS.TYPE,
    CONTEST_FIELDS.NAME,
    CONTEST_FIELDS.STYLE,
];

module.exports = {
    CONTEST_TYPE,
    CONTEST_PRICE,
    CONTEST_STATUS,
    CONTEST_PRIORITY,
    CONTEST_FIELDS,
    CONTEST_FIELDS_TO_UPDATE
};