"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useTasks from "@/hooks/use-tasks";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

// import useTasks from "@/hooks/use-tasks";

export default function Home() {
  const [task, setTask]: any = useState({
    title: "",
    description: "",
    completed: false,
  });

  const { data: tasks, isLoading, isFetching, create, update, remove } = useTasks();

  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    create({
      ...task,
      description: "description",
      completed: false,
    });
    setTask({
      ...task,
      title: "",
      description: "",
      completed: false,
    });
  };

  const onRemove = (id: any) => remove(id);
  const onUpdate = (task: any) => update(task);

  return (
    <div className="flex pt-32 justify-center h-screen">
      <div className="flex flex-col gap-4 w-[350px]">
        <h1 className="font-bold text-xl uppercase">Tasky</h1>
        <form onSubmit={handleSubmit}>
          <Input className="shadow" name="tasl.title" id="task.title" type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
        </form>
        {isFetching || (
          <>
            {tasks && tasks.length > 0 && (
              <Card className="shadow">
                <ul className="flex flex-col max-h-80 overflow-auto">
                  {tasks.map((task: any, index: any) => (
                    <li key={index} className="flex gap-2 justify-between border-b">
                      <div className="flex items-center space-x-2 pl-4">
                        <Checkbox id="terms" checked={task.completed} onCheckedChange={() => onUpdate({ ...task, completed: !task.completed })} />
                        <label htmlFor="terms" className={`text-sm ${task.completed ? "line-through" : ""}`}>
                          {task.title}
                        </label>
                      </div>
                      <Button variant="link" type="button" size="icon" onClick={() => onRemove(task.id)}>
                        <X className="size-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5">
                  <div className="text-xs">{tasks.length} tasks</div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
