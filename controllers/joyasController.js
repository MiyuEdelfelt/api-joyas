const pool = require("../db/connection");

const getJoyas = async (req, res) => {
    try {
        const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
        const [campo, direccion] = order_by.split("_");
        const offset = (page - 1) * limits;

        const consulta = `SELECT * FROM inventario ORDER BY ${campo} ${direccion} LIMIT $1 OFFSET $2`;
        const { rows } = await pool.query(consulta, [limits, offset]);

        const joyas = rows.map(j => ({
            ...j,
            links: [{ rel: "self", href: `/joyas/${j.id}` }]
        }));

        res.json({ total: joyas.length, data: joyas });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las joyas", detalle: error.message });
    }
};

const getJoyasFiltradas = async (req, res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;

        let filtros = [];
        let valores = [];
        let contador = 1;

        if (precio_min) {
            filtros.push(`precio >= $${contador++}`);
            valores.push(precio_min);
        }
        if (precio_max) {
            filtros.push(`precio <= $${contador++}`);
            valores.push(precio_max);
        }
        if (categoria) {
            filtros.push(`categoria = $${contador++}`);
            valores.push(categoria);
        }
        if (metal) {
            filtros.push(`metal = $${contador++}`);
            valores.push(metal);
        }

        const whereClause = filtros.length > 0 ? `WHERE ${filtros.join(" AND ")}` : "";
        const query = `SELECT * FROM inventario ${whereClause}`;

        const { rows } = await pool.query(query, valores);
        res.json({ total: rows.length, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar joyas", detalle: error.message });
    }
};

module.exports = { getJoyas, getJoyasFiltradas };
