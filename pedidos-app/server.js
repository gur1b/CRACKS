import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/test", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Backend funcionando"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});