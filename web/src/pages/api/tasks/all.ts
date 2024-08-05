import type { NextApiRequest, NextApiResponse } from "next";
import { initializeTasks, getAllTasks } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    const allTasks = getAllTasks();
    res.status(200).json({ success: true, data: allTasks });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}