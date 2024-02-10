import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    // console.log(newTask);
    return this.tasksService.createTask(newTask.title, newTask.description);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Task[] {
    // console.log(id);
    return this.tasksService.deleteTask(id);
  }

  // @Put(':id')
  @Patch(':id')
  updatedTask(
    @Param('id') id: string,
    @Body() updatedFields: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTasks(id, updatedFields);
  }
}
