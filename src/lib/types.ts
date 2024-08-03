export type PropertyTypes =
  | "all"
  | "apartment"
  | "building"
  | "store"
  | "office";

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  mode: string;
  images: string;
  price: number;
  space: number;
  rooms: number;
  bathrooms: number;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IProperties = Property[];
