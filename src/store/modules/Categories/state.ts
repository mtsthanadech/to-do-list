import { category } from "@/types/category";
import uniqid from "uniqid";

export type State = {
  categories: category[] | [];
};

export const state: State = {
  categories: [
    {
      categoryId: uniqid("cate-"),
      date: new Date(),
      name: "Uncategorized",
      permanently: true,
    },
  ],
};
