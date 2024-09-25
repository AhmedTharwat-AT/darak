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
          type: "office",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "rent",
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
          title: "Villa for sell in Downtown",
          description: "Luxurious villa with stunning views",
          location: "Downtown",
          type: "apartment",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
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
          type: "store",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "rent",
          price: 3000,
          space: 120,
          rooms: 2,
          bathrooms: 2,
        },
      },
    },
  });
  const edward = await prisma.user.upsert({
    where: { email: "edward@example.com" },
    update: {},
    create: {
      email: "edward@example.com",
      name: "edward",
      properties: {
        create: {
          title: "Commercial Building for sell in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "building",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
          price: 1000000,
          space: 1000,
          rooms: 10,
          bathrooms: 5,
        },
      },
    },
  });
  const shaun = await prisma.user.upsert({
    where: { email: "shaun@example.com" },
    update: {},
    create: {
      email: "shaun@example.com",
      name: "shaun",
      properties: {
        create: {
          title: "Commercial Building for sell in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "building",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
          price: 1000000,
          space: 1000,
          rooms: 10,
          bathrooms: 5,
        },
      },
    },
  });
  const hossam = await prisma.user.upsert({
    where: { email: "hossam@example.com" },
    update: {},
    create: {
      email: "hossam@example.com",
      name: "hossam",
      properties: {
        create: {
          title: "Commercial Building for sell in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "building",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
          price: 1000000,
          space: 1000,
          rooms: 10,
          bathrooms: 5,
        },
      },
    },
  });
  const ezio = await prisma.user.upsert({
    where: { email: "ezio@example.com" },
    update: {},
    create: {
      email: "ezio@example.com",
      name: "ezio",
      properties: {
        create: {
          title: "Commercial Building for sell in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "building",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
          price: 1000000,
          space: 1000,
          rooms: 10,
          bathrooms: 5,
        },
      },
    },
  });
  const shoeb = await prisma.user.upsert({
    where: { email: "shoeb@example.com" },
    update: {},
    create: {
      email: "shoeb@example.com",
      name: "shoeb",
      properties: {
        create: {
          title: "Commercial Building for sell in Business District",
          description: "Spacious building suitable for offices",
          location: "Business District",
          type: "building",
          images: {
            create: {
              url: "https://loremflickr.com/300/200",
            },
          },
          mode: "sell",
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
