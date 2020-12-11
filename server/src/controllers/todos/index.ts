import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'


// HardCoded starts....        
let todos = new Array<ITodo>();
let newTodo = new Todo({
    name: 'Hardcoded ToDos',
    description: 'Just Show hardcoded ToDos',
    status: true
    })
todos.push(newTodo)
newTodo = new Todo({
    name: 'Locally shared ToDos',
    description: 'CRUD from locally stored list of ToDos. Does not use DB',
    status: false
    })
todos.push(newTodo)
newTodo = new Todo({
    name: 'Full App',
    description: 'Integrate DB to perform CRUD operations',
    status: false
    })    
todos.push(newTodo)    

let counter = 0
// HardCoded ends....
        
const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        //Requires DB
        // const todos: ITodo[] = await Todo.find()                
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('got request:' + req)
        console.log('got body:' + req.body)
        
        //const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>        

        // const todo: ITodo = new Todo({            
        //     name: body.name,
        //     description: body.description,
        //     status: body.status,
        // }) 

        //const newTodo: ITodo = await todo.save()
        //const allTodos: ITodo[] = await Todo.find()
        const newTodo = new Todo({
            name: `Post call ${++counter}`,
            description: 'JGD',
            status: false
        })
        todos.push(newTodo)
        res.status(201).json({ message: 'Todo added', todo: newTodo })
        //res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos:allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
