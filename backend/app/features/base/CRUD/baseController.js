class BaseController {
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        try {
            const result = await this.service.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            console.error("Error create:", err);
            res.status(500).json({ message: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const result = await this.service.findAll();
            res.json(result);
        } catch (err) {
            console.error("Error getAll:", err);
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req, res) {
        try {
            const result = await this.service.findById(req.params.id);
            if (!result) return res.status(404).json({ message: "Not found" });
            res.json(result);
        } catch (err) {
            console.error("Error getById:", err);
            res.status(500).json({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            const result = await this.service.update(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            console.error("Error update:", err);
            res.status(500).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            await this.service.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            console.error("Error delete:", err);
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = BaseController;
