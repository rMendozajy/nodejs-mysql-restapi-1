import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(202)
      .json({ message: "eEter the id in the parameters please." });
  }
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(202)
      .json({ message: "eEter the id in the parameters please." });
  }

  try {
    const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.sendStatus(204).json({
      message: "Product delete successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  if ((name, description, price, stock)) {
    try {
      const [rows] = await pool.query(
        "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
        [name, description, price, stock]
      );
      res
        .status(201)
        .json({ id: rows.insertId, name, description, price, stock });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  } else {
    return res.status(202).json({ message: "The data is empty" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  if (!id) {
    return res
      .status(202)
      .json({ message: "eEter the id in the parameters please." });
  }
  if ((name, description, price, stock)) {
    try {
      const [result] = await pool.query(
        "UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), price = IFNULL(?, price), stock = IFNULL(?, stock)  WHERE id = ?",
        [name, description, price, stock, id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Product not found" });
      const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
        id,
      ]);

      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  } else {
    return res.status(202).json({ message: "The data is empty" });
  }
};
