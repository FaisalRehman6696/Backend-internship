import express from "express";
import router from "./routes/app-routes.js";

const PORT = 3000;
const app = express();

// parses application/json
app.use(express.json()); // express also has built-in json parser (can use either one)

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
