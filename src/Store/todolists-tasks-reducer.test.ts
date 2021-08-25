import {tasksReducer, TasksStateType} from './tasks-reducer';
import {AddTodoListAC, TodolistDomainType, todoListsReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    let startTodolistsState: Array<TodolistDomainType>;
    startTodolistsState = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListsID);
    expect(idFromTodolists).toBe(action.todoListsID);
});
