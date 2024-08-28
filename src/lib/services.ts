import prisma from "./db";
import { PAGE_SIZE } from "../lib/constants";

export const getProperties = async (page = 1) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
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

export const getPropertiesCount = async () => {
  try {
    const count = await prisma.properties.count();
    return count;
  } catch (err) {
    console.log(err);
  }
};

export async function getProperty(id: string) {
  const property = await prisma.properties.findUnique({
    where: {
      id,
    },
  });
  return property;
}

export async function delay() {
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve("data loaded"), 5000)
  );
  return data;
}
