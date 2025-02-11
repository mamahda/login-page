import { app, port } from "./main.js";
import db from "./database-config.js";

app.get('/api/dev/test', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
