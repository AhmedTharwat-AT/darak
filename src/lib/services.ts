import prisma from "./db";

export const getProperties = async (page = 1) => {
  try {
    const properties = await prisma.properties.findMany({
      include: {
        images: true,
      },
      take: 6,
      skip: 6 * (page - 1),
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
