const { Op } = require("sequelize");
const Todo = require("./todos.model");

function responseBuilder(success, error, data) {
    return {
        success, error, data
    }
}

const getTodo = async (req, res) => {
    console.log(req.query);
    if(req.query.search) {
        try {
            const data = await Todo.findAll({
                where: {
                    [Op.or]: {
                        title: {
                            [Op.substring]: req.query.search
                         },
                        description: {
                            [Op.substring]: req.query.search,
                        },
                    },
                }
            });
            return res.status(200).json(responseBuilder(true, null, data ));
        } catch (error) {
            return res.status(500).json(responseBuilder(false, "Something went wrong", null));
        };
    };
    try {
        const todos = await Todo.findAll({raw: true}); 
        return res.status(200).json(responseBuilder(true, null, todos))
    } catch (error) {
        res.status(500).json( responseBuilder(true, 'something went wrong', [] ))
    };
};

const postTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description
        });
        return res.status(200).json(responseBuilder(true, null, todo ));
    } catch (error) {
        res.status(500).json( responseBuilder(true, 'something went wrong', [] ))
    };
};

const getSingleTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        if(todo) {
            return res.status(200).json(responseBuilder(true, null, todo))
        };
    } catch (error) {
        res.status(500).json( responseBuilder(true, 'something went wrong', [] ))
    };
};

const deleteTodo =  async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        const deleteTodo = await Todo.destroy({
            where: {
                id: id
            }
        });
        if(deleteTodo) {
            return res.status(200).json(responseBuilder(true, null, todo))
        }  else {
            return res.status(400).json(responseBuilder(false, 'id not found', {}))
        };
    } catch (error) {
        res.status(500).json( responseBuilder(true, 'something went wrong', [] ))
    };
};

const updateTodo = async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try {
        const updateTodo = await Todo.update(data, {
            where: {
                id: id
            }
        });
        if(updateTodo[0]) {
            return res.status(200).json(responseBuilder(true, null, todo))
        } else {
            return res.status(400).json(responseBuilder(false, 'id not found', {}))
        };
    } catch (error) {
        res.status(500).json( responseBuilder(true, 'something went wrong', [] ))
    };
};

module.exports= {getTodo, postTodo, deleteTodo, updateTodo, getSingleTodo};