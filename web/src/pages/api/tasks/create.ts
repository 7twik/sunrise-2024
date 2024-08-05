import type { NextApiRequest, NextApiResponse } from "next";
import { initializeTasks, createTask } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const { title, description, persona, group } = req.body;

    if (title && description && persona && group) {
      createTask(title, description, persona, parseInt(group));
      res.status(201).json({ success: true, message: "Task created successfully" });
    } else {
      res.status(400).json({ success: false, message: "Missing required fields" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}