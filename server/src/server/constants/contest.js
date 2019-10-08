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

module.exports = {
    CONTEST_TYPE,
    CONTEST_PRICE,
    CONTEST_STATUS,
    CONTEST_PRIORITY
};