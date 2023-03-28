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
  //console.log(Id);
  try {
    const user = await UserData.findById(Id);
    //console.log(user);

    if (!user) {
      throw new Error({ message: "user not found" });
    }
    const todo = await Todo.find({ user_id: Id });
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
    const todo = await Todo.findById({ _id: req.body._id });
    console.log(todo, "==<<");

    if (todo) {
      todo.done = true;
      const updatedTodo = await todo.save();

      console.log(updatedTodo);
      if (updatedTodo) {
        res.status(200).json({ message: "updated Todo successfull " });
      }
    }
  } catch (error) {
    //console.log(error)
    res.status(400).json({ message: "item not found" });
  }
};

exports.deleteTodo = async (req, res) => {
  const Id = req.token._id;
  //console.log(Id)
  try {
    const user = await UserData.findById(Id);

    if (!user) {
      throw new Error({ message: "user not found" });
    }
    const TodoId = req.body._id;
    const todo = await Todo.findByIdAndDelete(TodoId);
    console.log(todo, "==<<");
    if (todo != null)
      res.status(200).json({ message: "todo deleted successflly" });
    else {
      res.status(400).json({ message: "todo not found" });
    }
  } catch (error) {
    console.log(error, "===============>>>>>>");
    res.status(400).json({ message: "user not show" });
  }
};

exports.editTodo = async (req, res) => {
  const { _id, title, discription } = req.body;
  try {
    const Id = req.token._id 
   // const user = await UserData.findById({ Id: req.token._id });
   const user = await UserData.findById( Id);
    if (!user) throw new Error({ message: "user not found" });
    const EditId = req.body._id;
    const edit = await Todo.findByIdAndUpdate(EditId, {
      title:title, discription:discription }, { new: true,});
     
    if(title != '' || discription != '')  
      res.status(200).json({message : ' Todo edit successfully'});
      else {
        res.status(400).json({message : ' title or discription can not blank'});
       }
     } catch (error) {
    res.status(400).json({ message: " Todo  successully not Edit"  });
  };
}


