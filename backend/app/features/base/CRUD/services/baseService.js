class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findAll(options = {}) {
        return await this.model.findAll(options);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async update(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error("Not found");
        return await instance.update(data);
    }

    async delete(id) {
        console.log("model", this.model, "id", id);
        
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error("Not found");
        return await instance.destroy();
    }
}

module.exports = BaseService;
