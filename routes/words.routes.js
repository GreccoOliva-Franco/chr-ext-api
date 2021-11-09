import { Router } from "express";
import { WordController } from "../controllers/word.controller.js";
import multer from "multer";
import path from "path";
import { csvToJson, jsonToCsv } from '../utils/csvUtils.js';
import { readFile } from 'fs/promises';
import { Word } from '../models/word.model.js';
const route = Router();
const upload = multer({ dest: "uploads/" });

route
    .get("/", async (req, res) => {
        // gets the words in the DB and transforms them into a CSV file wich is served
        const filePath = path.join(process.cwd(), "uploads/words.csv");

        const controller = new WordController();
        const words = await controller.getWords();
        const csvData = jsonToCsv(words);

        res.setHeader("Content-Type", "text/csv");
        res.send(csvData);
    })
    .post("/", upload.single("csvFile"), async (req, res) => {
        try {
            // read file from request object express
            const file = req.file;
            const filePath = path.join(process.cwd(), file.path);
            const csvData = await readFile(filePath);
            const wordsData = csvToJson(csvData);


            wordsData.forEach(async word => {
                await Word.collection.findAndModify({
                    query: { _id: word._id, active: true },
                    update: {
                        $setOnInsert: {
                            word: word.word,
                            originalWord: word.originalWord,
                            text: word.text,
                            textInfo: word.textInfo,
                            source: word.source,
                        }
                    },
                    upsert: true,
                    new: true
                });
            });

            res.json({ status: "ok" });
        } catch (error) {
            res.json({ status: "error", error });
        }
    })
    .get("/active", async (req, res) => {
        // gets the active words in the DB
        const controller = new WordController();
        const words = await controller.getActiveWords();

        res.json(words);
    });

export default route;
