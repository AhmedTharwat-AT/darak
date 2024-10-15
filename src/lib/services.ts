import prisma from "./db";
import { PAGE_SIZE } from "../lib/constants";
import { unstable_cache as nextCache } from "next/cache";
import { IFilterValues } from "@/app/(Main)/properties/page";

// export const getProperties = async (page = 1) => {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   console.log("run ");
//   try {
//     const properties = await prisma.properties.findMany({
//       include: {
//         images: true,
//       },
//       take: PAGE_SIZE,
//       skip: PAGE_SIZE * (page - 1),
//     });
//     return properties;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getProperties = nextCache(
  async (page = 1) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const properties = await prisma.properties.findMany({
        include: {
          images: true,
        },
        take: PAGE_SIZE,
        skip: PAGE_SIZE * (page - 1),
      });

      return properties;
    } catch (err) {
      console.log("err", err);
    }
  },
  ["properties"],
  { revalidate: 15 }
);

export const getFilteredProperties = nextCache(
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
    console.log("fetching properties");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const priceObj = {
      from: price?.split("-")[0],
      to: price?.split("-")[1],
    };

    const spaceObj = {
      from: space?.split("-")[0],
      to: space?.split("-")[1],
    };

    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const properties = await prisma.properties.findMany({
        include: {
          images: true,
        },
        where: {
          price: {
            gte: priceObj?.from ? Number(priceObj.from) : 0,
            lte: priceObj?.to ? Number(priceObj.to) : 10_000_000,
          },
          space: {
            gte: spaceObj?.from ? Number(spaceObj.from) : 10,
            lte: spaceObj?.to ? Number(spaceObj.to) : 1000,
          },
          mode: {
            contains: mode || "",
          },
          type: {
            contains: type == "all" ? "" : type || "",
          },
          rooms: {
            gte: rooms ? Number(rooms) : 1,
          },
          bathrooms: {
            gte: bathrooms ? Number(bathrooms) : 1,
          },
          location: {
            contains: location || "",
          },
        },
        take: PAGE_SIZE,
        skip: PAGE_SIZE * (page - 1),
      });

      return properties;
    } catch (err) {
      console.log("err", err);
    }
  },
  ["propertiesFiltered"],
  { revalidate: 20 }
);

// export const getPropertiesCount = async () => {
//   console.log("run");
//   await new Promise((resolve) => setTimeout(resolve, 5000));

//   try {
//     const count = await prisma.properties.count();
//     return count;
//   } catch (err) {
//     console.log(err);
//   }
// };
export const getFilteredPropertiesCount = nextCache(
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

    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      const count = await prisma.properties.count({
        where: {
          price: {
            gte: priceObj?.from ? Number(priceObj.from) : 0,
            lte: priceObj?.to ? Number(priceObj.to) : 10_000_000,
          },
          space: {
            gte: spaceObj?.from ? Number(spaceObj.from) : 10,
            lte: spaceObj?.to ? Number(spaceObj.to) : 1000,
          },
          mode: {
            contains: mode || "",
          },
          type: {
            contains: type == "all" ? "" : type || "",
          },
          rooms: {
            gte: rooms ? Number(rooms) : 1,
          },
          bathrooms: {
            gte: bathrooms ? Number(bathrooms) : 1,
          },
          location: {
            contains: location || "",
          },
        },
      });
      return count;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["propertiesCountFiltered"],
  { revalidate: 1 }
);

export const getPropertiesCount = nextCache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const count = await prisma.properties.count();
      return count;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["propertiesCount"],
  { revalidate: 15 }
);

export const getProperty = nextCache(
  async (id: string) => {
    await delay();
    const property = await prisma.properties.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
    return property;
  },
  ["property"],
  { revalidate: 3600 }
);

export async function delay() {
  await new Promise((resolve) =>
    setTimeout(() => resolve("data loaded"), 5000)
  );
}
