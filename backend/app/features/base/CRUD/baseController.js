const helper = require("./../../../helpers/helpers.helper");

class BaseController {
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        try {
            const result = await this.service.create(req.body);
            res.send(result);
        } catch (err) {           
            helper.sendError(res, err);
        }
    }

    async getAll(req, res) {
        try {
            const result = await this.service.findAll();
            res.json(result);
        } catch (err) {
            helper.sendError(res, err);
        }
    }

    async getById(req, res) {
        try {
            const result = await this.service.findById(req.params.id);
            if (!result) return res.status(404).json({ message: "Not found" });
            res.json(result);
        } catch (err) {
            helper.sendError(res, err);
        }
    }

    async update(req, res) {
        try {
            const result = await this.service.update(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            helper.sendError(res, err);
        }
    }

    async delete(req, res) {
        try {
            await this.service.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            helper.sendError(res, err);
        }
    }
}

module.exports = BaseController;
