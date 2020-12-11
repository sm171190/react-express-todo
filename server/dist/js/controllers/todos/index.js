"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
// HardCoded starts....        
let todos = new Array();
let newTodo = new todo_1.default({
    name: 'Hardcoded ToDos',
    description: 'Just Show hardcoded ToDos',
    status: true
});
todos.push(newTodo);
newTodo = new todo_1.default({
    name: 'Locally shared ToDos',
    description: 'CRUD from locally stored list of ToDos. Does not use DB',
    status: false
});
todos.push(newTodo);
newTodo = new todo_1.default({
    name: 'Full App',
    description: 'Integrate DB to perform CRUD operations',
    status: false
});
todos.push(newTodo);
let counter = 0;
// HardCoded ends....
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Requires DB
        // const todos: ITodo[] = await Todo.find()        
        console.log('got request:' + req);
        console.log('sending response:' + res);
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('got request:' + req);
        console.log('got body:' + req.body);
        //const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>        
        // const todo: ITodo = new Todo({            
        //     name: body.name,
        //     description: body.description,
        //     status: body.status,
        // }) 
        //const newTodo: ITodo = await todo.save()
        //const allTodos: ITodo[] = await Todo.find()
        const newTodo = new todo_1.default({
            name: `Post call ${++counter}`,
            description: 'JGD',
            status: false
        });
        todos.push(newTodo);
        res.status(201).json({ message: 'Todo added', todo: newTodo });
        //res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
