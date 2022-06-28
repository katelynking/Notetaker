const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.json(db);
  });

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
)

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db), (err) => {
      if (err) throw err;
    });
    res.send(db);
  })

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
)

app.delete("/api/notes/:id", (req, res) => {
  db.forEach((note, i) => {
    if (note.id === req.params.id) {
      db.splice(i, 1);
    }
  })

  fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
  });
  res.send(db);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
