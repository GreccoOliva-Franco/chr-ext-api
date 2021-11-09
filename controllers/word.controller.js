import { Word } from "../models/word.model.js";

class WordController {
  async getWords() {
    const filter = {};
    const fields = [
      "_id",
      "originalWord",
      "text",
      "textInfo",
      "source",
      "active",
    ];

    const words = await Word.find(filter, fields);

    return words;
  }

  async getActiveWords() {
    const filter = { active: true };
    const fields = ["originalWord", "text", "textInfo", "source"];

    const words = await Word.find(filter, fields);

    return words;
  }

  saveMany(records) {
    records.forEach(async (record) => {
      if (record._id) {
        const doc = await Word.findById(record._id);

        if (!doc) {
          Word.create(record);
        } else {
          if (record.active === false) record.deletedAt = Date.now();
          Word.findByIdAndUpdate(record._id, record);
        }
      } else {
        Word.create(record);
      }
    });
  }
}

export { WordController };
