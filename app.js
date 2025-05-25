const express = require("express");
const cors = require("cors"); 
const app = express();

const pool = require("./db/connection");
const joyasRoutes = require("./routes/joyasRoutes");
const logger = require("./middlewares/logger");

app.use(cors()); 
app.use(express.json());
app.use(logger);
app.use("/joyas", joyasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);

  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  }
});
