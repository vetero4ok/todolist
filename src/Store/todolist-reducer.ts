import {todolistAPi, TodolistType} from '../Api/Api';
import {AppThunk} from './Strore';
import {Dispatch} from 'redux';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListsID: string
}
type changeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListsID: string
    filter: FilterValuesType

}
type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListsID: string
    title: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export type TodolistActionType = RemoveTodoListAT
    | AddTodoListAT
    | changeTodoListFilterAT
    | changeTodoListTitleAT
    | SetTodolistsAT

const initialState: Array<TodolistDomainType> = []

export const todoListsReducer = (state = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListsID)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoListsID ? {...tl, title: action.title} : tl)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }
        default:
            return state
    }
}

export const removeTodoListAC = (todoListsID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListsID
    } as const
}
export const addTodoListAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
    } as const
}
export const ChangeTodoListFilterAC = (todoListsID: string, filter: FilterValuesType): changeTodoListFilterAT => {
    return ({
        type: 'CHANGE-TODOLIST-FILTER',
        todoListsID,
        filter
    });
}
export const changeTodoListTitleAC = (todoListsID: string, title: string): changeTodoListTitleAT => {
    return ({
        type: 'CHANGE-TODOLIST-TITLE',
        todoListsID,
        title
    });
}
const setTodolists = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}
export type RemoveTodolistAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodolistsAT = ReturnType<typeof setTodolists>

export const fetchTodolistsTC = (): AppThunk => (dispatch: Dispatch) => {
    todolistAPi.getTodolist()
        .then((res) => {
            dispatch(setTodolists(res.data))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistAPi.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const changeTodolistTitleTC = (title:string, todolistId:string): AppThunk => (dispatch) => {
    todolistAPi.updateTodolist(title,todolistId)
        .then((res)=> {

            dispatch(changeTodoListTitleAC(todolistId,title))
        })
}