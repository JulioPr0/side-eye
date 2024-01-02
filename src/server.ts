import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { Item } from "./entity/Item";

createConnection().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    const itemRepository = connection.getRepository(Item);

    app.post("/items", async (req, res) => {
        const item = itemRepository.create(req.body);
        const results = await itemRepository.save(item);
        return res.send(results);
    });

    app.get("/items", async (req, res) => {
        const items = await itemRepository.find();
        return res.json(items);
    });

    app.get("/items/:id", async (req, res) => {
        const itemId = parseInt(req.params.id);
        const item = await itemRepository.findOne({ where: { id: itemId } });
        if (item) return res.json(item);
        return res.status(404).send("Item not found");
    });

    app.put("/items/:id", async (req, res) => {
        const itemId = parseInt(req.params.id);
        let item = await itemRepository.findOne({ where: { id: itemId } });
        if (item) {
            itemRepository.merge(item, req.body);
            const results = await itemRepository.save(item);
            return res.send(results);
        }
        return res.status(404).send("Item not found");
    });

    app.delete("/items/:id", async (req, res) => {
        const itemId = parseInt(req.params.id);
        const result = await itemRepository.delete(itemId);
        return res.send(result);
    });

    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });

}).catch(error => console.log(error));
