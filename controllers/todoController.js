const { Todo } = require("../models/Todo");
const { UserData } = require("../models/userdata");

exports.addNewTodo = async (req, res) => {
  const Id = req.token._id;
  try {
    const user = UserData.findById(Id);
    console.log(user);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const updatedData = { Id, ...req.body, user_id: Id };
    const todo = new Todo(updatedData);
    const saveedData = await todo.save();
    return res.status(200).json({
      message: "item added successfully",
      saveedData: { todo_Id: saveedData._id },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getallTodo = async (req, res) => {
  const Id = req.token._id;
  console.log(Id);
  try {
    const user = await UserData.findById(Id);
    console.log(user);

    if (!user) {
      throw new Error({ message: "user not found" });
    }
    const todo = await Todo.find({ user_id  : Id });
    console.log(todo);
    res.status(200).json({ todo });
  } catch (error) {
    res.status(400).json({ message: "no item!" });
  }
};


exports.completeTodo = async (req, res) => {
  const Id = req.token._id;
  try {
    const user = await UserData.findById(Id);

    if (!user) {
      throw new Error({ message: "user not found" });
    }
    const todo = await Todo.findById({ _id :req.body._id} );
    console.log(todo,'==<<');


    if (todo) {
      todo.done = true;
      const updatedTodo = await todo.save();

      console.log(updatedTodo)
      if (updatedTodo) {
        res.status(200).json({ message: "updated Todo successfull " });
      }
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({ message: "item not found" });
  }
};

/*exports.showTodo = async (req, res) => {


  try {
    const showTodo = await Todo.findById(_id);
   console.log(showTodo)
    return res.status(200).json({  message:   { showTodo } });
  } catch (error) {
    res.status(400).json({ message: "user not show" });
  }
};*/

exports.deleteTodo = async (req, res) => {
  try {
    //const user_id = req.token.user_id;
    //let Id = req.token._id;
   // const user = await UserData.findById(user_id);

    const user =  await UserData.findById(req.token._id)
    if (!user)
    throw new Error({ message: "user not found" });

    const Id = req.body._id;
    const deleteTodo = await Todo.findByIdAndDelete(Id);
    return res.status(200).json({
      message: "todo deleted successfully. ",
      deletedTodo: deleteTodo._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




