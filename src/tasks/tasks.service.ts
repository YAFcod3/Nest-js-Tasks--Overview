import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'another task',
      description: 'some Tasks',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    console.log(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log(this.tasks);
    return this.tasks;
  }

  private getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  updateTasks(id: string, updatedFields: UpdateTaskDto): Task {
    const taskFound = this.getTaskById(id);
    const newTask = Object.assign(taskFound, updatedFields);
    console.log(newTask);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));

    return newTask;
  }
}
