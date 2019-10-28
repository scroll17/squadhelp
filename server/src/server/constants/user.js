const TYPE_OF_UPDATE_BALANCE_FOR_USER = {
    CASH_OUT: "cashOut",
    REPLENISH: "replenish"
};

const USER_FIELDS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  DISPLAY_NAME: "displayName",
  AVATAR: "avatar",
  EMAIL: "email",
  PASSWORD: "password",
  BALANCE: "balance",
  IS_BANNED: 'isBanned',
};

const USER_FIELDS_TO_UPDATE = [
    USER_FIELDS.EMAIL,
    USER_FIELDS.FIRST_NAME,
    USER_FIELDS.LAST_NAME,
    USER_FIELDS.DISPLAY_NAME,
    USER_FIELDS.PASSWORD
];

const MIME_TYPE_USER_AVATAR = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

module.exports = {
    TYPE_OF_UPDATE_BALANCE_FOR_USER,
    USER_FIELDS_TO_UPDATE,
    USER_FIELDS,
    MIME_TYPE_USER_AVATAR
};