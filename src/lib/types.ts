import { Property, PropertyImage } from "@prisma/client";

export type PropertyTypes =
  | "all"
  | "apartment"
  | "building"
  | "store"
  | "office";

export type PropertyWithImages = Property & { images: PropertyImage[] };
// export type IUser = User;

// export type IPropertyImage = PropertyImage;

// export type IProperty = Properties & { images: PropertyImage[] };

// export type IProperties = IProperty[];

// export interface Property  {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   type: string;
//   mode: string;
//   images: PropertyImage[];
//   price: number;
//   space: number;
//   rooms: number;
//   bathrooms: number;
//   ownerId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
