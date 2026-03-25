import { ObjectId } from "mongodb";

export interface Product {
  _id: ObjectId;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}