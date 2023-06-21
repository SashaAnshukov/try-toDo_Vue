<template>
  <div class="list" lid="ToDoList">
    <a>
      <router-link to="/main">Go to main</router-link>
    </a>
    <input
      class="mainInput"
      placeholder="Добавьте задачу и нажмите Enter"
      minlength="1"
      maxlength="40"
      type="text"
      @keyup.enter="addTask"
      v-model="currentTask"
    />
    <ul>
      <li class="card" v-for="(task, index) in tasks">
        <input
          class="inputCard"
          minlength="1"
          maxlength="40"
          type="text"
          :value="task.text"
          v-if="!task.isEditing"
          readonly
        />
        <input
          v-else
          minlength="1"
          maxlength="40"
          type="text"
          class="inputEditCard"
          v-model="editValue"
        />
        <span
          @click="toggleComplete(task)"
          v-bind:class="{
            'is-completed': task.isCompleted,
            'is-editing': task.isEditing,
          }"
        >
        </span>
        <label class="buttons">
          <button
            class="button buttonEdit"
            type="button"
            aria-label="edit"
            @click="toggleEdit(task)"
          ></button>
          <button
            class="button buttonDelete"
            type="button"
            aria-label="delete"
            @click="removeTask(index)"
          ></button>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  data() {
    return {
      currentTask: "",
      editValue: "",
      tasks: [
        {
          text: "Задача1",
          isCompleted: false,
          isEditing: false,
        },
        {
          text: "Задача2",
          isCompleted: false,
          isEditing: false,
        },
        {
          text: "Задача13",
          isCompleted: true,
          isEditing: false,
        },
      ],
    };
  },
  async mounted() {
    const data = await localStorage.getItem("todos");
    if (data) {
      this.tasks = JSON.parse(data);
    }
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.currentTask,
        isCompleted: false,
        isEditing: false,
      });
      localStorage.setItem("todos", JSON.stringify(this.tasks));
      this.currentTask = "";
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.tasks));
    },
    toggleComplete(task) {
      task.isCompleted = !task.isCompleted;
      localStorage.setItem("todos", JSON.stringify(this.tasks));
    },
    toggleEdit(task) {
      if (task.isEditing) {
        task.text = this.editValue;
        task.isEditing = false;
        localStorage.setItem("todos", JSON.stringify(this.tasks));
      } else {
        this.editValue = task.text;
        task.isEditing = true;
      }
    },
    saveTask(index) {
      this.tasks[index].text = this.editValue;
      this.tasks[index].isEditing = false;
      localStorage.setItem("todos", JSON.stringify(this.tasks));
    },
  },
};
</script>

<style scoped>
.list {
  background: rgb(44, 44, 44);
  padding: 50px;
  height: 100vh;
}
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
ul {
  padding: 0;
}
.mainInput {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 50px auto;
  padding: 7px 16px;
  width: 600px;
  border: 1px solid #42b983;
  border-radius: 10px;
}
.inputCard {
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: center;
  padding: 7px 16px;
  border: 2px solid rgb(44, 44, 44);
  border-radius: 10px;
  min-width: 400px;
  max-height: 20px;
  outline: none;
  background-color: rgb(44, 44, 44);
  color: #ffff;
  cursor: default;
}
.inputEditCard {
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: center;
  padding: 7px 16px;
  border: 2px solid #42b983;
  border-radius: 10px;
  min-width: 400px;
  max-height: 20px;
  outline: none;
}
::placeholder {
  color: #42b983;
}
.mainInput:hover {
  transition-duration: 0.5s;
  background: #90ee90;
}
.mainInput:focus {
  background: #98fb98;
}
.mainInput:focus-visible {
  outline: #fa8072;
}
.card {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 25px auto;
  padding: 7px 16px;
  width: 600px;
  border: 1px solid #42b983;
  border-radius: 10px;
}
.button {
  border: none;
  width: 54px;
  height: 54px;
  padding: 0;
  align-self: center;
  outline: none;
  cursor: pointer;
}
.buttonEdit {
  background: url("../assets/Edit.svg");
  background-position: center;
  background-repeat: no-repeat;
}
.buttonDelete {
  background: url("../assets/Trash_white.svg");
  background-position: center;
  background-repeat: no-repeat;
}
</style>
