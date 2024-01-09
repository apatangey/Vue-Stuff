<template>
    <li>
        <div>
            <div>
                <span v-if="!todo.isEditing">{{ todo.text }}</span>
            </div>
            <input v-if="todo.isEditing" v-model="todo.text" @blur="saveChanges" @keyup.enter="saveChanges" />
            <button @click="toggleEdit">Edit</button>
            <button @click="deleteTodo">Delete</button>
        </div>
        <br />
    </li>
</template>
  
<script>
export default {
    props: {
        todo: Object,
    },
    methods: {
        toggleEdit() {
            this.$emit("editTodo", this.todo);
        },
        deleteTodo() {
            this.$emit("deleteTodo", this.todo);
        },
        saveChanges() {
            this.toggleEdit();
        },
    },
};
</script>
  
<style scoped></style>
  