import { createSlice } from "@reduxjs/toolkit";
export const taskSlice=createSlice({
    name:'task',
    initialState:{
        value:JSON.parse(localStorage.getItem('todo_hackzeal')) || [],
    },
    reducers:{
        addTodo:(state,action)=>{
            state.value.push(action.payload);
            localStorage.setItem('todo_hackzeal',JSON.stringify(state.value))
            return state;
        },
        removeTodo:(state,action)=>{
            state.value=state.value.filter((item)=>item.taskname!==action.payload);
            localStorage.setItem('todo_hackzeal',JSON.stringify(state.value))
            return state;
        },
        completeTodo:(state,action)=>{
            state.value=state.value.map((item)=>{
                if(item.taskname===action.payload){
                    return{
                        ...item,
                        completed:!item.completed,
                    }
                }
                return item;
            })
            localStorage.setItem('todo_hackzeal',JSON.stringify(state.value))
            return state;
        }
        
    }
})

export const selectTask = (state) => state.task.value
export const {addTodo,removeTodo,completeTodo}=taskSlice.actions;
export const reducer=taskSlice.reducer;