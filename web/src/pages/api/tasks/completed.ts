import type { NextApiRequest, NextApiResponse } from "next";
import { getCompletedTasks } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    const completedTasks = getCompletedTasks();
    res.status(200).json({ success: true, data: completedTasks });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}