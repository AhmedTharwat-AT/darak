import {
  BookmarkedProperty,
  Property,
  PropertyImage,
  User,
} from "@prisma/client";

export type PropertyTypes =
  | "all"
  | "apartment"
  | "building"
  | "store"
  | "office";

export type PropertyWithImages = Property & {
  images: PropertyImage[];
  owner?: { phone: string };
};

export type BookmarkedWithProperty = BookmarkedProperty & {
  property: PropertyWithImages;
};

export type UserWithProperties = User & {
  bookmarked_properties: BookmarkedWithProperty[];
  properties: PropertyWithImages[];
};
