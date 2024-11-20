import {
  BookmarkedProperty,
  Property,
  PropertyImage,
  User,
} from "@prisma/client";
import { FileWithPath } from "react-dropzone";

export type PropertyTypes =
  | "all"
  | "apartment"
  | "building"
  | "store"
  | "office";

export type PropertyWithImages = Property & {
  images: PropertyImage[];
  owner?: { phone: string; whatsapp: string };
};

export type BookmarkedWithProperty = BookmarkedProperty & {
  property: PropertyWithImages;
};

export type UserWithProperties = User & {
  bookmarked_properties: BookmarkedWithProperty[];
  properties: PropertyWithImages[];
};

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export type IFilterValues = {
  price?: string;
  space?: string;
  mode?: string;
  type?: string;
  rooms?: string;
  bathrooms?: string;
  location?: string;
};
