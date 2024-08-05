import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Inter } from "next/font/google";
import Task from "@/model/Task";
const inter = Inter({ subsets: ["latin"] });
import { Badge} from "antd";
import CreateModal from "./CreateModal";

type RestType = {
  name: string;
  data: any;
};
type FormatDataType = {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
};

export default function Home() {

  const getActiveData = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/active");
    const data = await res.json();
    return data.data;
  };
  const getCompletedData = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/completed");
    const data = await res.json();
    return data.data;
  };
  const getAllData = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/all");
    const data = await res.json();
    return data.data;
  };
  const formatData = async () => {
    const completedData = await getCompletedData();
    const activeData = await getActiveData();
    console.log(activeData);
    const allData = await getAllData();
    console.log(allData);
    let inProgress = [];
    let todo = allData.filter(
      (item: Task) =>
        item !== undefined &&
        item.id !== undefined &&
        !item.completed &&
        activeData.findIndex((i: Task) => i.id === item.id) === -1
    );

    if (activeData.length === 1) {
      if(todo.length>0)
      {
        inProgress.push(
          activeData[0],
          todo[0]
        );
        todo = todo.slice(1);
      }
      else
      {
        inProgress.push(
          activeData[0]
        );
      }
    } else if (activeData.length > 1) {
      inProgress.push(activeData[0],
        activeData[1]
      );
      const actdata=activeData.slice(2);
      todo=[...actdata,...todo];
    }
    console.log("todo",todo)
    if(todo[0]==undefined)
      todo=todo.slice(1);
    console.log("todo",todo)
    return {
      todo: todo,
      inProgress:inProgress,
      completed: completedData,
    };
  };

  const [data, setData] = useState<FormatDataType>();
  useEffect(() => {
    const f = async () => {
      const d: FormatDataType = await formatData();
      console.log(d);
      setData(d);
    };
    f();
  }, []);

  return (
    <>
    <h1 className="text-center font-bold text-3xl w-[100%] mt-4">Task Board</h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-15 my-8 w-screen px-[2vw]">
      <CreateModal />
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <h3 className="text-center font-semibold text-lg w-[100%]">
            To-Do&nbsp;{" "}
            <Badge
              count={data !== undefined && data.todo.length}
              showZero
              color="green"
            />
          </h3>
        </div>
          <div className="grid grid-cols-2 gap-4 w-[100vw] lg:w-[30vw]">
            {data !== undefined &&
              data.todo.map((task: Task, index: number) => (
                <>
                  {" "}
                  {task !== undefined && (
                    <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} persona={task.persona} group={task.group} completed={task.completed} task={task} boolValue={false} />
                  )}{" "}
                </>
              ))}
          </div>
        </div>
      <div className="flex flex-col gap-5 w-[100vw] lg:w-[30vw]">
        <div className="flex gap-2">
          <h3 className="text-center font-semibold text-lg w-[100%]">
            In-Progress &nbsp;
            <Badge
              count={data !== undefined && data.inProgress.length}
              showZero
              color="green"
            />
          </h3>
        </div>
        <div className="gap-6 flex flex-col">
          <div className="grid grid-cols-2 gap-4 w-[100vw] lg:w-[30vw]">
              {data!==undefined && data.inProgress.length>0 &&
              <TaskCard task={data.inProgress[0]} 
                id={data.inProgress[0].id}
                title={data.inProgress[0].title}
                description={data.inProgress[0].description}
                persona={data.inProgress[0].persona}
                group={data.inProgress[0].group}
                completed={data.inProgress[0].completed}
                boolValue={true}
              />}
              {data!==undefined && data.inProgress.length>1 && data.inProgress[0].group!==data.inProgress[1].group && <br/>}      

              {data!==undefined && data.inProgress.length>1 && <TaskCard task={data.inProgress[1]} 
              id={data.inProgress[1].id} 
              title={data.inProgress[1].title}
              description={data.inProgress[1].description}
              persona={data.inProgress[1].persona}
              group={data.inProgress[1].group}
              completed={data.inProgress[1].completed}
              boolValue={data.inProgress[0].group===data.inProgress[1].group}/>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <h3 className="text-center font-semibold text-lg w-[100%]">
            Completed &nbsp;
            <Badge
              count={data !== undefined && data.completed.length}
              showZero
              color="green"
            />
          </h3>
        </div>
        <div className="gap-6 flex flex-col">
          <div className="grid grid-cols-2 gap-4 w-[30vw]">
            {data !== undefined &&
              data.completed.map((task: Task, index: number) => (
                <>
                  {" "}
                  {task !== undefined && (
                    <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} persona={task.persona} group={task.group} completed={task.completed} task={task} boolValue={false}/>
                  )}{" "}
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}














// const formatData = async () => {
//   const [completedData, activeData, allData] = await Promise.all([
//     fetchData("completed"),
//     fetchData("active"),
//     fetchData("all"),
//   ]);

//   let inProgress = [];
//   let todo = allData.filter(
//     (item: Task) =>
//       item?.id !== undefined &&
//       !item.completed &&
//       !activeData.some((i: Task) => i.id === item.id)
//   );

//   if (activeData.length === 1) {
//     inProgress.push(activeData[0]);
//     if (todo.length > 0) {
//       inProgress.push(todo[0]);
//       todo = todo.slice(1);
//     }
//   } else if (activeData.length > 1) {
//     inProgress.push(
//      activeData[0],
//       activeData[1]
//     );
//     todo = [...activeData.slice(2), ...todo];
//   }

//   todo = todo.filter(Boolean);

//   return {
//     todo,
//     inProgress ,
//     completedData,
//   };
// };