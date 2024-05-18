import { prisma } from "../../Database";
import { Prisma, Gender } from "@prisma/client";

const exampleGender: Gender = Gender.Female;

// Define the filters interface
interface DesignerFilters {
  location?: string;
  minRating?: number;
  yearsOfExperience?: number;
  page?: number;
  limit?: number;
  sortBy?: keyof Prisma.DesignerProfileOrderByWithRelationInput;
  sortOrder?: 'asc' | 'desc';
}

// Get all designers with pagination, filtering, and sorting
export const readAllDesigners = async (filters: DesignerFilters) => {
  const { location, minRating, yearsOfExperience, page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc' } = filters;
  const offset = (page - 1) * limit;

  const designers = await prisma.designerProfile.findMany({
    where: {
      address: location ? { contains: location } : undefined,
      yearsExperience: yearsOfExperience ? { gte: yearsOfExperience } : undefined,
      reviews: minRating ? { some: { rating: { gte: minRating } } } : undefined
    },
    skip: offset,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    select: {
      baseAccountId: true,
      ordersFinished: true,
      address: true,
      yearsExperience: true,
      reviews: {
        select: {
          rating: true
        }
      }
    }
  });

  return designers.map(designer => ({
    id: designer.baseAccountId,
    ordersFinished: designer.ordersFinished,
    location: designer.address,
    yearsExperience: designer.yearsExperience,
    rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : null,
  }));
};

// Get a specific designer by unique attribute
export const findDesignerBy = async (data: Prisma.DesignerProfileWhereUniqueInput) => {
  const designer = await prisma.designerProfile.findUnique({
    where: data,
    select: {
      baseAccountId: true,
      ordersFinished: true,
      address: true,
      yearsExperience: true,
      about: true,
      workingDays: true,
      reviews: {
        select: {
          rating: true,
          comment: true,
          postedOn: true,
          user: {
            select: {
              baseAccountId: true // Assuming you want the user ID, add other fields if needed
            }
          }
        }
      },
      services: {
        select: {
          title: true,
          description: true,
          price: true
        }
      },
      teamMembers: {
        select: {
          name: true,
          role: true,
          avatarUrl: true
        }
      },
      categories: {
        select: {
          Category: {
            select: {
              name: true
            }
          }
        }
      },
      portfolios: {
        select: {
          url: true
        }
      }
    }
  });
  return designer;
};
