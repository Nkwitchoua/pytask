import express from "express";
import { exec, spawn } from "child_process";
import cors from "cors";
import bodyParser from "body-parser";

import Sk from "skulpt"

console.log(Sk.builtinFiles.files["src/lib/webgl/__init__.js"])

export const app = express();

app.use(cors({
    origin:'http://localhost:5173', 
    credentials: true,
    optionSuccessStatus: 200
}));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = 5000;
const dbPort = 8000;

const command = `json-server --watch db.json --port ${dbPort}`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log('Error running exec', err);
    return;
  }
  return;
});

app.get("/tasks", (req, res) => {
    exec(`curl http://localhost:${dbPort}/tasks`, (error, stdout, stderr) => {
        if (error) {
            console.error(`get tasks error: ${error}`);
            return;
        }
        const data = JSON.parse(stdout);

        data.map(task => [task.id, task.title]);

        res.status(200).json(data);
    })
});

app.get("/tasks/:id", (req, res) => {
    console.log("id", req.params.id);

    exec(`curl http://localhost:${dbPort}/tasks/${req.params.id}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`get one task error: ${error}`);
            return;
        }
        const data = JSON.parse(stdout);

        res.status(200).json(data);
    })
});

app.post("/code", (req, res) => {
    
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));