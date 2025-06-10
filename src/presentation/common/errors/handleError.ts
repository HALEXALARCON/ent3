import { Response } from "express";

export function handleError(error: any, res: Response): void {
  console.error("🔴 ERROR:", error.message);

  if (error.message === "User not found") {
    res.status(404).json({ message: error.message });
    return;
  }

  if (error.message.startsWith("Error deleting user:")) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(500).json({
    message: "internal server error",
  });
}
