import { PrismaClient, Prisma } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

// Define the filters interface
interface DesignerFilters {
  location?: string;
  minRating?: number;
  gender?: 'Male' | 'Female';
  yearsOfExperience?: number;
  openNow?: boolean;
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: keyof Prisma.DesignerProfileOrderByWithRelationInput;
  sortOrder?: 'asc' | 'desc';
}

interface WorkingHour {
  start: {
    display: string;
    compare: string;
  };
  end: {
    display: string;
    compare: string;
  };
}

type WorkingHours = { [key: string]: WorkingHour };

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const isOpenNow = (workingDays: WorkingHours): { open: boolean; openUntil?: string } => {
  const currentDay = new Date().getDay().toString(); // Convert to string to match JSON keys
  const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:mm format

  const todayWorkingHours = workingDays?.[currentDay];
  if (!todayWorkingHours || todayWorkingHours.start.compare === "") return { open: false };

  if (currentTime >= todayWorkingHours.start.compare && currentTime <= todayWorkingHours.end.compare) {
    return { open: true, openUntil: todayWorkingHours.end.display };
  }

  return { open: false };
};

const formatWorkingDays = (workingDays: WorkingHours): string[] => {
  return Object.entries(workingDays).map(([day, hours]) => {
    const dayName = daysOfWeek[parseInt(day)];
    if (hours.start.display === "Closed") {
      return `${dayName} Closed`;
    } else {
      return `${dayName} ${hours.start.display} - ${hours.end.display}`;
    }
  });
};

// Function to get all designers with updated logic
export const readAllDesigners = async (filters: DesignerFilters) => {
  const {
    location,
    minRating,
    gender,
    yearsOfExperience,
    openNow,
    name,
    page = 1,
    limit = 10,
    sortBy = 'baseAccountId',
    sortOrder = 'asc'
  } = filters;
  const offset = (page - 1) * limit;

  // Construct query conditions
  const queryConditions: Prisma.DesignerProfileWhereInput = {
    ...(location && { location: { contains: location } }),
    ...(yearsOfExperience && { yearsExperience: { gte: yearsOfExperience } }),
    ...(minRating && { reviews: { some: { rating: { gte: minRating } } } }),
  };

  // Add baseAccount conditions only if necessary
  if (name || gender) {
    queryConditions.baseAccount = {
      ...(name && { OR: [{ firstName: { contains: name } }, { lastName: { contains: name } }] }),
      ...(gender && { gender: { equals: gender } })
    };
  }



  try {
    // Add pagination, sorting, and selection to the query
    const designers = await prisma.designerProfile.findMany({
      where: queryConditions,
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
        location: true,
        workingDays: true,
        reviews: {
          select: {
            rating: true
          }
        },
        baseAccount: {
          select: {
            avatarUrl: true,
            gender: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    const filteredDesigners = designers.map(designer => {
      const workingDays: WorkingHours = JSON.parse(designer.workingDays as unknown as string);
      const { open, openUntil } = isOpenNow(workingDays);

      return {
        baseAccountId: designer.baseAccountId,
        ordersFinished: designer.ordersFinished,
        location: designer.location,
        yearsExperience: designer.yearsExperience,
        rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0,
        avatarUrl: designer.baseAccount.avatarUrl,
        gender: designer.baseAccount.gender,
        name: `${designer.baseAccount.firstName} ${designer.baseAccount.lastName}`,
        openNow: open,
        openUntil: open ? openUntil : null
      };
    });

    const openFilteredDesigners = openNow !== undefined
      ? filteredDesigners.filter(designer => designer.openNow === openNow)
      : filteredDesigners;

    const totalFilteredCount = await prisma.designerProfile.count({
      where: queryConditions
    });

    const totalPages = Math.ceil(totalFilteredCount / limit);

    return {
      designers: openFilteredDesigners.length ? openFilteredDesigners : null,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        entry_counts: totalFilteredCount,
        next_page: page < totalPages ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null
      }
    };
  } catch (error) {
    console.error("Error reading designers:", error);
    throw new Error("Failed to read designers");
  } finally {
    await prisma.$disconnect();
  }
};

// Function to find a specific designer by unique attribute
export const findDesignerBy = async (data: Prisma.DesignerProfileWhereUniqueInput) => {
  try {
    const designer = await prisma.designerProfile.findUnique({
      where: data,
      select: {
        baseAccountId: true,
        ordersFinished: true,
        latitude: true,
        longtitude: true,
        address: true,
        yearsExperience: true,
        about: true,
        workingDays: true,
        baseAccount: {
          select: {
            avatarUrl: true,
            gender: true,
            firstName: true,
            lastName: true
          }
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            postedOn: true,
            avatarUrl: true,
            user: {
              select: {
                baseAccountId: true // Assuming you want the user ID, add other fields if needed
              }
            }
          }
        },
        services: {
          select: {
            id:true ,
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
            id:true,
            url: true
          }
        }
      }
    });

    if (designer) {
      const workingDays: WorkingHours = JSON.parse(designer.workingDays as unknown as string);
      const { open, openUntil } = isOpenNow(workingDays);
      return {
        ...designer,
        avatarUrl: designer.baseAccount.avatarUrl,
        gender: designer.baseAccount.gender,
        name: `${designer.baseAccount.firstName} ${designer.baseAccount.lastName}`,
        openNow: open,
        openUntil: open ? openUntil : null,
        workingDays: formatWorkingDays(workingDays), // Format working days for readability
        rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0
      };
    }

    return designer;
  } catch (error) {
    console.error("Error finding designer:", error);
    throw new Error("Failed to find designer");
  } finally {
    await prisma.$disconnect();
  }
};

// Validation schema using Joi
const designerFilterSchema = Joi.object({
  location: Joi.string().optional(),
  minRating: Joi.number().min(1).max(5).optional(),
  gender: Joi.string().valid('Male', 'Female').optional(),
  yearsOfExperience: Joi.number().integer().min(0).optional(),
  openNow: Joi.boolean().optional(),
  name: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional()
});

export const validateFilters = (filters: DesignerFilters) => {
  return designerFilterSchema.validate(filters);
};

type designerProfileDetails = {
  about: string,
  address: string,
  avatarURL: string,
  latitude: number,
  longtitude: number,
  location: string,
  ordersFinished: number,
  yearsOfExperience: number
}

export async function addDesigner (email: string, firstName: string, lastName: string, password: string, designerDetails: designerProfileDetails)
{
  const user = await prisma.designerProfile.create({
      data: {
          baseAccount: {
              create: {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  password: password,
                  emailActivated: false,
              }
          },
          about: designerDetails.about,
          address: designerDetails.address,
          avatarUrl: designerDetails.avatarURL,
          latitude: designerDetails.latitude,
          longtitude: designerDetails.longtitude,
          location: designerDetails.location,
          ordersFinished: designerDetails.ordersFinished,
          yearsExperience: designerDetails.yearsOfExperience,
          workingDays: ""
      },
      select: {
          baseAccount: true,
      }
  });

  return user;
}

export async function getDesignerBaseAccountByEmail(email: string)
{
  try
  {
    const result = await prisma.designerProfile.findFirst({
      where: {
        baseAccount: {
          email: email
        }
      },
      select: {
        baseAccount: true,
      }
    });

    return result;
  }
  catch (error) {
    return false;
  }
}

export async function getDesignerSubscriptionTier(designerId: string) : Promise<"PREMIUM" | "STANDARD" | undefined>
{
  const result = await prisma.premiumSubscription.findFirst({
    where: {
      designerId: designerId
    },
    select: {
      subscriptionType: true
    }
  });
  
  return result?.subscriptionType?? undefined;
}

export const updateDesignerBy = async (uniqueData : Prisma.DesignerProfileWhereUniqueInput, data : Prisma.DesignerProfileUpdateInput) => {
  const designer = await prisma.designerProfile.update({
    where : uniqueData,
    data : {...data}
  })
  return designer 
}