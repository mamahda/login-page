import { app, port } from "../main.js";
import db from "./database-config.js";

// api for testing server
app.get('/api/dev/test', (req, res) => {
  res.send('Hello World!');
});

// inisialize server 
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// connect to database 
db.connect((err) => {
  if (err) {
    // handle error
    throw err;
  }
  console.log('Connected to database');
});
