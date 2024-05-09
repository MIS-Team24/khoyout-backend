import { PrismaClient } from '@prisma/client';
import { randFullName, randEmail, randParagraph, randProductDescription, randJobTitle, randUrl, randNumber } from '@ngneat/falso';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    const name = randFullName();
    const email = randEmail();
    const about = randParagraph();

    const designer = await prisma.designer.create({
      data: {
        name: name,
        address: faker.location.streetAddress(), // Updated to use location instead of address
        about: about,
        workingDays: JSON.stringify({
          "Monday": "12:00 PM - 10:00 PM",
          "Tuesday": "12:00 PM - 10:00 PM",
          "Wednesday": "12:00 PM - 10:00 PM"
        }),
        avatarUrl: randUrl() + '.jpg',
        services: {
          create: [
            {
              title: 'Design from scratch',
              description: randProductDescription(),
              price: randNumber({ min: 200, max: 500 }),
            },
            {
              title: 'Hand made',
              description: randProductDescription(),
              price: randNumber({ min: 300, max: 600 }),
            }
          ]
        },
        teamMembers: {
          create: [
            {
              name: randFullName(),
              role: randJobTitle(),
              avatarUrl: randUrl() + '.jpg'
            },
            {
              name: randFullName(),
              role: randJobTitle(),
              avatarUrl: randUrl() + '.jpg'
            }
          ]
        },
        reviews: {
          create: [
            {
              customerName: randFullName(),
              rating: faker.number.int({ min: 1, max: 5 }), // Updated to use number.int
              comment: randParagraph(),
              postedOn: faker.date.past({ years: 1 }) // Correctly using the object parameter
            }
          ]
        }
      }
    });
    console.log(`Designer created: ${designer.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
