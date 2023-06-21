import Vue from "vue";
import Router from "vue-router";
import Welcomelist from "@/components/Welcomelist";
import ToDoList from "@/components/ToDoList";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/main",
      name: "Welcomelist",
      component: Welcomelist
    },
    {
      path: "/tasks",
      name: "ToDoList",
      component: ToDoList
    }
  ]
});
