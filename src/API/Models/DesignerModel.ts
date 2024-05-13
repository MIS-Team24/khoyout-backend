import { prisma  } from "../../Database";
// import { Prisma  } from "@prisma/client";
import { Prisma, Gender } from "@prisma/client";

const exampleGender: Gender = Gender.Female;


//get all designers
interface DesignerFilters {
    location?: string;
    minRating?: number;
    yearsOfExperience?: number;
    gender?: Gender;
    page?: number;
    limit?: number;
    sortBy?: keyof Prisma.DesignerSelect;
    sortOrder?: 'asc' | 'desc';
  }
  
  // Get all designers with pagination, filtering, and sorting
  export const readAllDesigners = async (filters: DesignerFilters) => {
    const { location, minRating, yearsOfExperience, gender, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = filters;
    const offset = (page - 1) * limit;
    
    const designers = await prisma.designer.findMany({
      where: {
        location: location || undefined,
        rating: minRating ? { gte: minRating } : undefined,
        yearsExperience: yearsOfExperience ? { gte: yearsOfExperience } : undefined,
        gender: gender || undefined
      },
      skip: offset,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        rating: true,
        ordersFinished: true,
        location: true,
        yearsExperience: true
      }
    });
    return designers;
  };
//



// Get a specific designer by unique attribute
export const findDesignerBy = async (data: Prisma.DesignerWhereUniqueInput) => {
    const designer = await prisma.designer.findUnique({
      where: data,
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        rating: true,
        location: true,
        yearsExperience: true,
        about: true,
        workingDays: true,
        ordersFinished: true,
        ratingCount: true,
        reviews: {
          select: {
            customerName: true,
            rating: true,
            comment: true,
            postedOn: true
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
            name: true
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
//