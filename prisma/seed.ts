import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      properties: {
        create: {
          title: "شقه للايجار فى المعادى",
          description: "ممتاز جدا",
          location: "معادى",
          type: "rent",
          images: "defaly.jpg",
          price: 1500,
          space: 100,
          rooms: 3,
          bathrooms: 1,
        },
      },
    },
  });
  const ahmed = await prisma.user.upsert({
    where: { email: "ahmed@example.com" },
    update: {},
    create: {
      email: "ahmed@example.com",
      name: "ahmed",
      properties: {
        create: {
          title: "Villa for Sale in Downtown",
          description: "Luxurious villa with stunning views",
          location: "Downtown",
          type: "sale",
          images: "image4.jpg",
          price: 500000,
          space: 500,
          rooms: 5,
          bathrooms: 3,
        },
      },
    },
  });
  const charlie = await prisma.user.upsert({
    where: { email: "charlie@example.com" },
    update: {},
    create: {
      email: "charlie@example.com",
      name: "Charlie",
      properties: {
        create: {
          title: "Apartment for Rent in New York City",
          description: "Modern apartment in the heart of NYC",
          location: "New York City",
          type: "rent",
          images: "image7.jpg",
          price: 3000,
          space: 120,
          rooms: 2,
          bathrooms: 2,
        },
      },
    },
  });
  const david = await prisma.user.upsert({
    where: { email: "david@example.com" },
    update: {},
    create: {
      email: "david@example.com",
      name: "David",
      properties: {
        create: {
          title: "Commercial Building for Sale in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "sale",
          images: "image10.jpg",
          price: 1000000,
          space: 1000,
          rooms: 10,
          bathrooms: 5,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
