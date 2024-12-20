import prisma from "@/lib/prisma_db";
import { PAGE_SIZE } from "../lib/constants";

import { cache } from "@/lib/utils";
import { IFilterValues } from "@/lib/types";

// export const getUser = cache(
//   async (email: string) => {
//     if (!email) return null;

//     const user = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//       include: {
//         properties: {
//           include: {
//             images: true,
//           },
//         },
//         bookmarked_properties: {
//           include: {
//             property: {
//               include: {
//                 images: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return user;
//   },
//   ["user"],
//   { revalidate: 3600 },
// );

export const getUser = async (email: string | undefined | null) => {
  if (!email) return null;

  return cache(
    async (email: string) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          properties: {
            include: {
              images: true,
            },
          },
          bookmarked_properties: {
            include: {
              property: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      });

      return user;
    },
    ["user", email],
    { revalidate: 3600 },
  )(email);
};

export const getFilteredProperties = cache(
  async ({
    page = 1,
    price,
    space,
    mode,
    type,
    rooms,
    bathrooms,
    location,
  }: IFilterValues & { page?: number }) => {
    const priceObj = {
      from: price?.split("-")[0],
      to: price?.split("-")[1],
    };

    const spaceObj = {
      from: space?.split("-")[0],
      to: space?.split("-")[1],
    };

    try {
      const properties = await prisma.property.findMany({
        include: {
          images: true,
        },
        where: {
          price: {
            gte: priceObj?.from ? Number(priceObj.from) : 0,
            lte: priceObj?.to ? Number(priceObj.to) : 100_000_000,
          },
          space: {
            gte: spaceObj?.from ? Number(spaceObj.from) : 10,
            lte: spaceObj?.to ? Number(spaceObj.to) : 10000,
          },
          mode: {
            contains: mode || "",
          },
          type: {
            contains: type == "all" ? "" : type || "",
          },
          rooms: {
            gte: rooms ? Number(rooms) : 0,
          },
          bathrooms: {
            gte: bathrooms ? Number(bathrooms) : 0,
          },
          location: {
            contains: location || "",
          },
          status: {
            equals: "approved",
          },
        },
        take: PAGE_SIZE,
        skip: PAGE_SIZE * (page - 1),
      });

      return properties;
    } catch (err) {
      console.log("err", err);
      throw new Error("Error fetching properties!");
    }
  },
  ["propertiesFiltered"],
  { revalidate: 3600 },
);

export const getFilteredPropertiesCount = cache(
  async ({
    price,
    space,
    mode,
    type,
    rooms,
    bathrooms,
    location,
  }: IFilterValues) => {
    const priceObj = {
      from: price?.split("-")[0],
      to: price?.split("-")[1],
    };

    const spaceObj = {
      from: space?.split("-")[0],
      to: space?.split("-")[1],
    };

    try {
      const count = await prisma.property.count({
        where: {
          price: {
            gte: priceObj?.from ? Number(priceObj.from) : 0,
            lte: priceObj?.to ? Number(priceObj.to) : 100_000_000,
          },
          space: {
            gte: spaceObj?.from ? Number(spaceObj.from) : 10,
            lte: spaceObj?.to ? Number(spaceObj.to) : 10000,
          },
          mode: {
            contains: mode || "",
          },
          type: {
            contains: type == "all" ? "" : type || "",
          },
          rooms: {
            gte: rooms ? Number(rooms) : 0,
          },
          bathrooms: {
            gte: bathrooms ? Number(bathrooms) : 0,
          },
          location: {
            contains: location || "",
          },
          status: {
            equals: "approved",
          },
        },
      });
      return count;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching properties count!");
    }
  },
  ["propertiesCountFiltered"],
  { revalidate: 3600 },
);

export const getProperty = cache(
  async (id: string) => {
    try {
      const property = await prisma.property.findUnique({
        where: {
          id,
          status: "approved",
        },
        include: {
          images: true,
          owner: {
            select: {
              phone: true,
              whatsapp: true,
            },
          },
        },
      });

      return property;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching property!");
    }
  },
  ["property"],
  { revalidate: 3600 },
);

export const getProperties = cache(
  async () => {
    try {
      const properties = await prisma.property.findMany({
        where: {
          status: "approved",
        },
        include: {
          images: true,
        },
      });

      return properties;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching properties!");
    }
  },
  ["properties"],
  { revalidate: 3600 },
);

export const getBookmarks = cache(
  async (userId: string) => {
    try {
      const bookmarks = await prisma.bookmarkedProperty.findMany({
        where: {
          userId,
        },
        include: {
          property: true,
        },
      });

      return bookmarks;
    } catch (err) {
      console.log(err);
      throw new Error("Error fetching bookmarks!");
    }
  },
  ["bookmarks"],
  { revalidate: 3600 },
);
