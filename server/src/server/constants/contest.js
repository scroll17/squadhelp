const CONTEST_TYPE = {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
};

const CONTEST_PRICE = new Map([
    [CONTEST_TYPE.NAME, 33],
    [CONTEST_TYPE.LOGO, 33],
    [CONTEST_TYPE.TAGLINE, 33],
]);

module.exports = {
    CONTEST_TYPE,
    CONTEST_PRICE
};