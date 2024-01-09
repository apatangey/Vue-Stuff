<template>
    <div>
        <input v-model="newTodo" @keyup.enter="addTodo" />
        <button @click="addTodo">Add Todo</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            newTodo: "",
        };
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() !== "") {
                this.$emit("addTodo", this.newTodo);
                this.newTodo = "";
            }
        },
    },
};
</script>
  
<style scoped></style>
  