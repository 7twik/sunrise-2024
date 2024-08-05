import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];
let currentGroup = 1;
let nextId = tasks[tasks.length - 1].id + 1;
export function initializeTasks() {
   currentGroup = 1;
}

export function getActiveTasks(): Task[] {
    const allTasks = getAllTasks();
    const completedTasks = getCompletedTasks();
    if(allTasks.length===0 || allTasks.length === completedTasks.length) {
        return [];
    }
  const activeTasks = tasks.filter(task => task.group === currentGroup && !task.completed);
  if(activeTasks.length === 0) {
    currentGroup++;
    return getActiveTasks();
  }
  else
    return activeTasks;
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find(t => t.title === taskTitle);
  if (task && !task.completed && task.group === currentGroup) {
    task.completed = true;
    
    const allCompletedInGroup = tasks.filter(t => t.group === currentGroup).every(t => t.completed);
    
    // If all tasks in the current group are completed, activate tasks in the next group
    if (allCompletedInGroup) {
      let data= getActiveTasks();
      console.log(data);
    }
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask = new Task(nextId++, title, description, persona, group);
  tasks.push(newTask);
  currentGroup = Math.min(group, currentGroup);
  console.log(tasks);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(t => t.id !== taskId);
}