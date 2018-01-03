// Accessing the Service that we just created

let TodoService = require("../services/todos.service");

// Saving the context of this module inside the _the letiable

_this = this;

// Async Controller function to get the To do List

exports.getTodos = async function(req, res, next) {
  // Check the existence of the query parameters, If the exists doesn't exists assign a default value

  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 10;

  try {
    let todos = await TodoService.getTodos({}, page, limit);

    // Return the todos list with the appropriate HTTP Status Code and Message.

    return res.status(200).json({
      status: 200,
      data: todos,
      message: "Succesfully Todos Recieved"
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.

    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createTodo = async function(req, res, next) {
  // Req.Body contains the form submit values.

  let todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };

  try {
    // Calling the Service function with the new object from the Request Body

    let createdTodo = await TodoService.createTodo(todo);
    return res.status(201).json({
      status: 201,
      data: createdTodo,
      message: "Succesfully Created ToDo"
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.

    return res
      .status(400)
      .json({ status: 400, message: "Todo Creation was Unsuccesfull" });
  }
};

exports.updateTodo = async function(req, res, next) {
  // Id is necessary for the update

  if (!req.body._id) {
    return res.status(400).json({ status: 400, message: "Id must be present" });
  }

  let id = req.body._id;

  console.log(req.body);

  let todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  try {
    let updatedTodo = await TodoService.updateTodo(todo);
    return res.status(200).json({
      status: 200,
      data: updatedTodo,
      message: "Succesfully Updated Tod"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.removeTodo = async function(req, res, next) {
  let id = req.params.id;

  try {
    let deleted = await TodoService.deleteTodo(id);
    return res
      .status(204)
      .json({ status: 204, message: "Succesfully Todo Deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
