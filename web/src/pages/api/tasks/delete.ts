import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTask } from "@/modules/taskManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (id) {
      deleteTask(parseInt(id as string));
      res.status(200).json({ success: true, message: "Task deleted successfully" });
    } else {
      res.status(400).json({ success: false, message: "Missing task ID" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}