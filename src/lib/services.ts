import prisma from "./db";
import { PAGE_SIZE } from "../lib/constants";
import { unstable_cache as nextCache } from "next/cache";

export const getProperties = async (page = 1) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("run ");
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
    console.log(err);
  }
};

// export const getProperties = nextCache(
//   async (page = 1) => {
//     // await new Promise((resolve) => setTimeout(resolve, 1000));
//     try {
//       const properties = await prisma.properties.findMany({
//         include: {
//           images: true,
//         },
//         take: PAGE_SIZE,
//         skip: PAGE_SIZE * (page - 1),
//       });

//       return properties;
//     } catch (err) {
//       console.log("err", err);

//       return null;
//     }
//   },
//   ["properties"],
//   { revalidate: 15 }
// );

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
  console.log("delay start");
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve("data loaded"), 5000)
  );
  console.log("delay end");
  return data;
}
