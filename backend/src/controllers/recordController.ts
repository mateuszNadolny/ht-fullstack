import type { Request, Response } from "express";
import prisma from "../prismaClient.js";

export const getAllRecords = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { habitId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await prisma.record.findMany({
      where: {
        habitId: habitId,
      },
    });

    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const addNewRecord = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { date, habitId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const record = await prisma.record.create({
      data: {
        habitId: habitId,
        date: date,
      },
    });

    if (!record) {
      return res.status(404).json({ message: "Wrong habit" });
    }

    res.json(record);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const userId = req.userId;
  const habitId = +req.params.id;
  const { date } = req.body;

  if (!userId || !habitId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      return res.status(404).json({ message: "nonexistent habit" });
    }

    if (habit.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // const updatedHabit = await prisma.habit.update({
    //   where: {
    //     id: habit.id,
    //   },
    //   data: {
    //     date: date,
    //   },
    // });

    // res.json(updatedHabit);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const userId = req.userId;
  const habitId = +req.params.id;

  if (!userId || !habitId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      return res.status(404).json({ message: "nonexistent habit" });
    }

    if (habit.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.habit.delete({
      where: {
        id: habit.id,
      },
    });

    res.status(200).json({ message: "Habit removed successfully" });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
