import PlusIcon from "../icons/PlusIcon";
import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import Login from "../pages/Login";

// import
import { authApi } from "../api/auth.ts";
import { getTasksApi, postTasksApi } from "../api/tasksApi.ts";
import { client } from "../utils/client.ts";

function TrelloBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.column), [columns]);

  const [isLogin, setIsLogin] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const requestBody = (tasks: Task[], columns: Column[]) => {
    return tasks.map((task) => {
      const columnId = columns.find((col) => col.column === task.column);

      return {
        column: columnId?.column,
        content: task.content,
        columnName: columnId?.columnName,
      };
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      setIsLogin(false);
    }

    if (apiKey) {
      try {
        setIsLogin(true);
        const { data: dataTask } = await getTasksApi();
        const listTasks = dataTask.data.tasks;
        const listColumns = dataTask.data.columns;
        setTasks(listTasks);
        setColumns(listColumns);
      } catch (e) {
        setIsLogin(false);
        console.log(e);
      }
    }
  };

  // Login
  const handleLogin = async (email: string) => {
    try {
      const { data } = await authApi(email);
      if (data.code === 400) {
        throw new Error(data.message);
      }
      localStorage.setItem("apiKey", data.data.apiKey);
      client.setApiKey(data.data.apiKey);
      localStorage.setItem("userEmail", email);

      const { data: dataTask } = await getTasksApi();
      const listTasks = dataTask.data.tasks;
      const listColumns = dataTask.data.columns;
      setTasks(listTasks);
      setColumns(listColumns);

      setIsLogin(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLogin ? (
        <div
          className="
          m-auto
          flex
          min-h-screen
          w-full
          items-center
          overflow-x-auto
          overflow-y-hidden
          px-[40px]
      "
        >
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="m-auto flex gap-4">
              <div className="flex gap-4">
                <SortableContext items={columnsId}>
                  {columns.map((col) => (
                    <ColumnContainer
                      key={col.column}
                      column={col}
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      tasks={tasks.filter((task) => task.column === col.column)}
                    />
                  ))}
                </SortableContext>
              </div>
              <button
                onClick={() => {
                  createNewColumn();
                }}
                className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
              >
                <PlusIcon />
                Add Column
              </button>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter(
                      (task) => task.column === activeColumn.column
                    )}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );

  async function createTask(column: Id) {
    const newTask: Task = {
      _id: generateId(),
      column,
      content: `Task ${tasks.length + 1}`,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    const data = requestBody(newTasks, columns);
    await postTasksApi(data);
  }

  async function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);
    const data = requestBody(newTasks, columns);
    await postTasksApi(data);
  }

  async function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task._id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
    const data = requestBody(newTasks, columns);
    await postTasksApi(data);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      column: generateId(),
      columnName: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  async function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.column !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.column !== id);
    setTasks(newTasks);

    const data = requestBody(newTasks, filteredColumns);
    await postTasksApi(data);
  }

  async function updateColumn(id: Id, columnName: string) {
    const newColumns = columns.map((col) => {
      if (col.column !== id) return col;
      return { ...col, columnName };
    });

    setColumns(newColumns);

    const data = requestBody(tasks, newColumns);
    await postTasksApi(data);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.column === activeId
      );

      const overColumnIndex = columns.findIndex((col) => col.column === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  async function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      let newTasks: Task[] = [];
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);

        if (tasks[activeIndex].column != tasks[overIndex].column) {
          // Fix introduced after video recording
          tasks[activeIndex].column = tasks[overIndex].column;
          newTasks = arrayMove(tasks, activeIndex, overIndex - 1);
          return newTasks;
        }

        newTasks = arrayMove(tasks, activeIndex, overIndex);
        return newTasks;
      });
      const data = requestBody(newTasks, columns);
      await postTasksApi(data);
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      let newTasks: Task[] = [];
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);

        tasks[activeIndex].column = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        newTasks = arrayMove(tasks, activeIndex, activeIndex);
        return newTasks;
      });
      const data = requestBody(newTasks, columns);
      await postTasksApi(data);
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default TrelloBoard;
