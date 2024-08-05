export type PropertyTypes =
  | "all"
  | "apartment"
  | "building"
  | "store"
  | "office";

export interface PropertyImage {
  id: number;
  url: string;
  properityId: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  mode: string;
  images: PropertyImage[];
  price: number;
  space: number;
  rooms: number;
  bathrooms: number;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IProperties = Property[];
