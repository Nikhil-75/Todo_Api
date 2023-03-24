const mongoose =  require('mongoose')
const {Schema} =  mongoose 

const todoSchema =  new mongoose.Schema({
    user_id: { type: String },
    title: { type: String, required: true },
    discription: {type: String, required: true},
    tags: [ { title: String,color: String },],
    isDone: { type: Boolean, default: false },
    isDoneAt: { type: Date},
},
 { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);


module.exports = { Todo }

