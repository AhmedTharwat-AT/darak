import prisma from "./db";

export const getProperties = async () => {
  try {
    const properties = await prisma.properties.findMany();
    return properties;
  } catch (err) {
    console.log(err);
  }
};
