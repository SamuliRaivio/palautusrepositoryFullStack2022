//logger eristää vain console.login sekä console.errorin omaan moduuliin ja exporttaa ne käytettäviksi
//...params = mitä tulostetaan
//esim logger.info("testi") --> console.log("testi")

const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
