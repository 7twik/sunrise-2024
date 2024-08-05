import type { NextApiRequest, NextApiResponse } from "next";
import { updateTask } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'PUT') {
    console.log(req.body);
    
    const { id, ...updatedTask } = req.body;
    console.log(id, updatedTask);
    if (id) {
        updatedTask.group=parseInt(updatedTask.group);
      updateTask(id, updatedTask);
      console.log("Task updated successfully");
      res.status(200).json({ success: true, message: "Task updated successfully" });
    } else {
      res.status(400).json({ success: false, message: "Missing task ID" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}