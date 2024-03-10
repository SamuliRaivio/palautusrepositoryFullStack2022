//index käynnistää sovelluksen

//app tuo itse express sovelluksen
const app = require("./app");
//config tuo portin ja tietokannan URL
const config = require("./utils/config");
//logger tuo console login
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
