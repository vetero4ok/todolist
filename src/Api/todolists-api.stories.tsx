import React, {useEffect, useState} from 'react'
import {todolistAPi} from './Api';
import {Button, Input} from '@material-ui/core';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPi.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <>
        <div> {JSON.stringify(state)}</div>

    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const createTodolist = () => {

        todolistAPi.createTodolist(title)
            .then((res) => {

                    if (res.data.messages.length !== 0) {
                        setState(res.data.messages)
                        // console.log(res.data.data.item)
                    } else setState(res.data.data.item)

                }
            )
    }
    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={createTodolist}>
            Get Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')


    const deleteTodolist = () => {
        todolistAPi.deleteTodolist(todoID)
            .then((res) => {
                setState(`${JSON.stringify(res.data.data)} - todolist deleted`)
            })
    }

    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={todoID}
            onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={deleteTodolist}>
            Delete Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const updatedTodolistTitle = () => {
        todolistAPi.updateTodolist(title, todoID)
            .then((res) =>
                setState(`${JSON.stringify(res.data.data)} - todolist id '${todoID}' updated`))
    }

    return <>
        <Input
            autoFocus
            placeholder={'title for todolist'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todoID}
            onChange={(e) => setTodoID(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={updatedTodolistTitle}>
            Delete Todolist
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>
    </>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasksHandler = () => {
        todolistAPi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }

    return <>
        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={getTasksHandler}>
            Get Task
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>

    </>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const createTaskHandler = () => {
        todolistAPi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data.data.item)
            })
    }

    return <>
        <Input
            autoFocus
            placeholder={'Title for task'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={createTaskHandler}>
            Create Task
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>

    </>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const createTaskHandler = () => {
        todolistAPi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(`${JSON.stringify(res.data.data)} - task '${taskId}' => todolist '${todolistId}' is deleted`)
            })
    }

    return <>

        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for task'}
            value={taskId}
            onChange={(e) => setTaskId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={createTaskHandler}>
            Delete Task
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>

    </>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const updateTaskHandler = () => {
        let payload = {
            id: taskId,
            title: title,
            description: 'null | string',
            todoListId: todolistId,
            order: -3,
            status: 1,
            priority: 2,
            startDate: '2021-08-20T09:52:12.087',
            deadline: '2021-08-20T09:52:12.087',
            addedDate: '2021-08-20T09:52:12.087',
        }
        /** Put приймає до оновлення повний обєкт*/
        todolistAPi.updateTask(todolistId, taskId, payload)
            .then((res) => {
                setState(`${JSON.stringify(res.data.data)} - task '${taskId}' => todolist '${todolistId}' is updated`)
            })
    }

    return <>
        <Input
            autoFocus
            placeholder={'title for task'}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for todolist'}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Input
            autoFocus
            placeholder={'Id for task'}
            value={taskId}
            onChange={(e) => setTaskId(e.currentTarget.value)}
        />
        <br/>
        <br/>
        <Button
            color={'primary'}
            variant={'contained'}
            value={state}
            onClick={updateTaskHandler}>
            Update Task
        </Button>
        <br/>
        <br/>
        <div> {JSON.stringify(state)}</div>

    </>
}