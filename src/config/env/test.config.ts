const testConfig = {
  databaseUrl: process.env.TEST_DATABASE_URL,
  debug: true,
  PORT: process.env.PORT || 3000,
};

export default testConfig;
