import type { Request, Response } from "express";
import prisma from "../prismaClient.ts";

export const getAllHabits = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
    });

    if (result.length < 1) {
      return `<h2>No habits yet</h2>`;
    }

    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addNewHabit = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { title } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const habit = await prisma.habit.create({
      data: {
        userId: userId,
        title: title,
      },
    });

    if (!habit) {
      return `<h2>No habits yet</h2>`;
    }

    res.json(habit);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  const userId = req.userId;
  const habitId = +req.params.id;
  const { title } = req.body;

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

    const updatedHabit = await prisma.habit.update({
      where: {
        id: habit.id,
      },
      data: {
        title: title,
      },
    });

    res.json(updatedHabit);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
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
    throw new Error(err.message);
  }
};
