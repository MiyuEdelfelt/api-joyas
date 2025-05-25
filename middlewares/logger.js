const logger = (req, res, next) => {
    const ruta = `${req.method} ${req.url}`;
    console.log(`📌 Ruta consultada: ${ruta}`);
    next();
  };
  
  module.exports = logger;
  