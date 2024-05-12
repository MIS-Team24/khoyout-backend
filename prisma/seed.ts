import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Predefined values for reviews, services, and team members
const predefinedReviewers = [
  "Laila Fares", "Noor Saleh", "Amira Nassar", "Yasmin Karam", "Farah Sabbagh"
];

const reviewTexts = [
  "Her ability to design from scratch and bring my vision to life is truly unparalleled.",
  "Expertly executed design that matched my vision perfectly."
];

const serviceDetails = [
  { title: "Design from scratch", description: "Crafting your vision from the ground up – our design from scratch service brings your ideas to life with creativity and precision.", price: 250 },
  { title: "Hand made", description: "Artisanal elegance tailored just for you – where every stitch tells a story.", price: 300 }
];

const teamMemberNames = ["Laila", "Noor", "Amira", "Farah", "Yasmin"];
const teamMemberRoles = ["Hand made specialist", "Redesign specialist"];

// Predefined categories
const categories = [{ name: "Classic" }, { name: "Soiree" }];

async function seedDatabase() {
  // Seed categories
  const seededCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({ data: { name: category.name } })
    )
  );

  // Seed predefined designers and link entities
  for (let i = 0; i < predefinedReviewers.length; i++) {
    const designer = await prisma.designer.create({
      data: {
        id: uuidv4(),
        name: predefinedReviewers[i],
        location: "Alexandria",
        yearsExperience: i + 1,
        gender: "Female",
        address: `${i + 1} Alexandrian St, Alexandria`,
        about: "Passionate about fashion design.",
        workingDays: 5, // Add workingDays property
        ordersFinished: 0, // Add ordersFinished property
        rating: 0, // Add rating property
        categories: {
          connect: seededCategories.map(cat => ({ id: cat.id }))
        }
      }
    });

    // Seed services for each designer
    for (const service of serviceDetails) {
      await prisma.service.create({
        data: {
          id: uuidv4(),
          designerId: designer.id,
          title: service.title,
          description: service.description,
          price: service.price
        }
      });
    }

    // Seed team members for each designer
    await prisma.teamMember.create({
      data: {
        id: uuidv4(),
        designerId: designer.id,
        name: teamMemberNames[i % teamMemberNames.length],
        role: teamMemberRoles[i % teamMemberRoles.length],
        avatarUrl: `http://example.com/avatar/${uuidv4()}.png`
      }
    });

    // Seed reviews for each designer
    await prisma.review.create({
      data: {
        id: uuidv4(),
        designerId: designer.id,
        customerName: predefinedReviewers[i],
        rating: 5,
        comment: reviewTexts[i % reviewTexts.length],
        postedOn: new Date()
      }
    });
  }
}

seedDatabase()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });