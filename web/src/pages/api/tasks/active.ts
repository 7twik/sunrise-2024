import type { NextApiRequest, NextApiResponse } from "next";
import { initializeTasks, getActiveTasks } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    const activeTasks = getActiveTasks();
    res.status(200).json({ success: true, data: activeTasks });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}