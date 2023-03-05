import express from 'express';

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

/**
 * Liste aller ToDos. 
 * Wird später durch Datenbank ersetzt!
 */
let TODOS = [
    {
        "id": 1671056616571,
        "title": "Übung 4 machen",
        "due": "2022-11-12T00:00:00.000Z",
        "status": 0
    },
    {
        "id": 1671087245763,
        "title": "Für die Klausur Webentwicklung lernen",
        "due": "2023-01-14T00:00:00.000Z",
        "status": 2
    },
];

// GET Anforderung
const port = 3000

app.get('/todos', (req, res) => {
  res.send(TODOS)
})

// PUT Anforderung
app.put("/todos/:id", (request, response) => {
  const todo = TODOS.find((todo) => todo.id === request.params.id);
  if (todo) {
    const { id, title, due, status } = request.body;
    todo.id = id;
    todo.title = title;
    todo.due = due;
    todo.status = status;
    response.status(200).json({ msg: "Todo updated successfully" });
    return;
  }
  response.status(404).json({ msg: "Todo not found" });
});

// Delete Anforderung
app.delete("/todos/:id", (request, response) => {
  const todoIndex = TODOS.findIndex((todo) => (todo.id = request.params.id));
  if (todoIndex) {
    TODOS.splice(todoIndex, 1);
    response.status(200).json({ msg: "Todo deleted successfully" });
  }
  response.status(404).json({ msg: "Todo not found" });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

