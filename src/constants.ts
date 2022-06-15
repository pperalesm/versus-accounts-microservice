export const Constants = {
  EMAIL_FROM: '"Versus Information" <info@versus.gg>',
  EMAIL_PATTERN:
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
  USERNAME_PATTERN: "^[a-zA-Z0-9]*$",
  ACCOUNTS_DB: "accounts-microservice",
  MAX_EMAIL_CHARACTERS: 254,
  MIN_PASSWORD_CHARACTERS: 8,
  MIN_USERNAME_CHARACTERS: 4,
  MAX_USERNAME_CHARACTERS: 50,
  SALT_ROUNDS: 12,
};
