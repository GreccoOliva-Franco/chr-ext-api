import { Router } from "express";
import { WordController } from "../controllers/word.controller.js";
import { createObjectCsvWriter } from "csv-writer";
import csvParser from "csv-parser";
import multer from "multer";
import fs from "fs";
import path from "path";

const route = Router();
const upload = multer({ dest: "uploads/" });

route
    .get("/", async (req, res) => {
        // gets the words in the DB and transforms them into a CSV file wich is served
        const filePath = path.join(process.cwd(), "uploads/words.csv");

        const controller = new WordController();
        const words = await controller.getWords();

        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: "_id", title: "_id", },
                { id: "originalWord", title: "originalWord", },
                { id: "text", title: "text", },
                { id: "textInfo", title: "textInfo", },
                { id: "source", title: "source", },
                { id: "active", title: "active", },
            ],
        });

        csvWriter.writeRecords(words).then(() => {
            res.setHeader("Content-Type", "text/csv");
            res.download(filePath);
        });
    })
    .post("/", upload.single("csvFile"), (req, res) => {
        const {
            filename: fileName,
            destination: uploadFolder,
            originalname: fileNameNew,
        } = req.file;

        const oldPath = uploadFolder + fileName;
        const newPath = uploadFolder + fileNameNew;

        fs.rename(oldPath, newPath, () => { });

        if (fileNameNew.split(".").pop() !== "csv") {
            fs.unlink(oldPath, () => { });

            res.send("El archivo debe ser en formato CSV");
        } else {
            const words = [];

            fs.createReadStream(newPath)
                .pipe(csvParser({ headers: true, separator: "," }))
                .on("data", (data) => {
                    words.push(data);
                })
                .on("end", () => {
                    // header excel csv
                    res.setHeader("Content-Type", "text/csv");
                    res.json(words);
                });
        }
    })
    .get("/active", async (req, res) => {
        // gets the active words in the DB
        const controller = new WordController();
        const words = await controller.getActiveWords();

        res.json(words);
    });

export default route;
