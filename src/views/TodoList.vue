<template>
    <div>
        <h2>Todo List</h2>
        <ul>
            <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @editTodo="editTodo" @deleteTodo="deleteTodo" />
        </ul>
        <AddTodo @addTodo="addTodo" />
    </div>
</template>
  
<script>
import TodoItem from "../views/TodoItem.vue";
import AddTodo from "../views/AddTodo.vue";

export default {
    data() {
        return {
            todos: [
                { id: 1, text: "go to walmart", isEditing: false },
                { id: 2, text: "upload to git", isEditing: false },
            ],
        };
    },
    methods: {
        addTodo(newTodoText) {
            const newTodo = {
                id: this.todos.length + 1,
                text: newTodoText,
                isEditing: false,
            };
            this.todos.push(newTodo);
        },
        editTodo(todo) {
            todo.isEditing = !todo.isEditing;
        },
        deleteTodo(todo) {
            const index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
    },
    components: {
        TodoItem,
        AddTodo,
    },
};
</script>
  
<style scoped></style>