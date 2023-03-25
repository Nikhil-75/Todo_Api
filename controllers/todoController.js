const { Todo } =  require('../models/Todo');
const { UserData } = require('../models/userdata');

exports.addNewTodo = async (req, res) => {
    const Id =  req.token.user_id;
    try {
      const user = UserData.findById(Id);
      if(!user) {
        res.status(400).json({message:"user not found"});
      }
      const  updatedData = {Id, ...req.body };
      const todo = new Todo(updatedData);
      const saveedData = await todo.save();
      return res.status(200).json({message: "item added successfully",
    saveedData: {todo_Id: saveedData.id},})
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  };


  exports.getallTodo =  async (req,res) => {
    const user_Id = req.token.user_id;
    try {
      const user = await UserData.findById(user_Id);
      if (!user) {
        res.status(400).json({ message: "user not found" });
      }
      const todos = await Todo.find({ user: req.user._id });
      res.status(200).json(todos);
    } catch (error) {
      res.status(400).json({ message: 'No items!' });
    }
  }

  exports.deleteTodo = async (req, res) => {
    try {
      const user_id = req.token.user_id;
      const user = await UserData.findById(user_id);
      if (!user)
     res.status(400).json({ message: "user not found" });
  
      const Id = req.body._id;
      const deleteTodo = await Todo.findByIdAndDelete(Id);
      return res.status(200).json({ message: "todo deleted successfully. ",
      deletedTodo: deleteTodo._id,});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  
exports.completeTodo = async (req, res) => {
   try {
    const user = await UserData.findById(req.token.user_id);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }

  const todo = await Todo.findById(_id);

  if (todo) {
    todo.done = true;
    const updatedTodo = await todo.save();
    if (updatedTodo) {
      res.status(200).json({message: "updated Todo successfull "});
    }
  }
   } catch (error) {
    
    res.status(400).json({ message: "item not found" })
   }
}


  