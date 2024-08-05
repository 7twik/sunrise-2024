import type { NextApiRequest, NextApiResponse } from "next";
import { completeTask } from "@/modules/taskManager";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    
    const {title}= req.body;
    console.log(title);
    if (title) {
      completeTask(title);
      res.status(200).json({ success: true, message: "Task completed successfully" });
    } else {
      res.status(400).json({ success: false, message: "Missing required fields" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}