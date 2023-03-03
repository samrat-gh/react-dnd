import { useContext, useState } from "react";
import itemTypes, { Task } from "./data";
import { DndProvider, useDrag, useDrop } from "React-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createContext } from "vm";
import { type } from "os";

type TaskType = {
  title: string;
  description: string;
  taskId?: number;
};

type FunProp = {
  dragTasks: (taskId: number) => void;
  tasklist: Task[];
};

export default function Main() {
  const [tasklist, setTaskList] = useState<Task[]>([
    {
      title: "Wash your clothes",
      description: "Past week clothes",
      id: 1,
      status: true,
    },
    {
      title: "Wash your shoes",
      description: "Past week shoes",
      id: 2,
      status: true,
    },
    {
      title: "Wash your pants",
      description: "Past week pants",
      id: 3,
      status: true,
    },
    {
      title: "Wash your hair",
      description: "personal hygiene",
      id: 4,
      status: true,
    },
  ]);

  const dragTasks = (id: number) => {
    const updatedTasks = tasklist.map((task) =>
      task.id === id ? { ...task, status: false } : task
    );
    setTaskList(updatedTasks);
  };

  return (
    <main className="flex">
      <DndProvider backend={HTML5Backend}>
        <div className=" bg-zinc-600 w-1/2 h-auto">
          <h1 className="text-center text-white"> Pending </h1>
          {tasklist
            .filter((task, i) => task.status === true)
            .map((task, i) => (
              <TaskCard
                title={task.title}
                description={task.description}
                key={task.id}
                taskId={task.id}
              />
            ))}
        </div>
        <Completion dragTasks={dragTasks} tasklist={tasklist} />
      </DndProvider>
    </main>
  );
}

function TaskCard(props: TaskType) {
  const { title, description, taskId } = props;

  const [isDragging, drag] = useDrag({
    type: itemTypes.Card,
    item: {
      id: { taskId },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      key={taskId}
      ref={drag}
      className="bg-slate-200 text-black mb-2 rounded p-1 px-3 w-fit mx-auto"
    >
      <h3> {title} </h3>
      <p className="text-slate-700 text-xs">{description}</p>
    </div>
  );
}

type MyItem = {
  type: string;
  id: {
    taskId: number;
  };
};

const Completion = (props: FunProp) => {
  const { dragTasks, tasklist } = props;
  const [isOver, drop] = useDrop({
    accept: itemTypes.Card,
    drop: (item: MyItem, monitor) => dragTasks(item.id.taskId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div className="bg-slate-700 w-1/2 h-auto" ref={drop}>
      <h1 className="text-center text-white"> Completed </h1>;
      <div
        className={`w-36 h-36
      ${isOver ? "bg-orange-500" : "transaparent"}
      `}
      >
        {tasklist
          .filter((task) => task.status === false)
          .map((task, id) => (
            <TaskCard
              title={task.title}
              description={task.description}
              key={task.id}
            />
          ))}
      </div>
    </div>
  );
};

//TaskCard Component is working very well
// Get Clear about key things
