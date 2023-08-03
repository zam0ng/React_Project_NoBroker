const config = {
    dev: {
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      dialect: "mysql",
      timezone: "+09:00",
      dateStrings: "date",
    },
  };
  
  module.exports = config;
  