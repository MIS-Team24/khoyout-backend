import { PrismaClient, Prisma } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

interface DesignerFilters {
  location?: string;
  minRating?: number;
  gender?: 'Male' | 'Female';
  yearsOfExperience?: number;
  openNow?: boolean;
  name?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: 'mostBooked' | 'highestReviews' | 'highestRated' | keyof Prisma.DesignerProfileOrderByWithRelationInput;
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
  const currentDay = new Date().getDay().toString();
  const currentTime = new Date().toTimeString().slice(0, 5);

  const todayWorkingHours = workingDays?.[currentDay];

  if (!todayWorkingHours || !todayWorkingHours.start?.compare) return { open: false };

  if (currentTime >= todayWorkingHours.start.compare && currentTime <= todayWorkingHours.end.compare) {
    return { open: true, openUntil: todayWorkingHours.end.display };
  }

  return { open: false };
};

const formatWorkingDays = (workingDays: WorkingHours): { day: string, hours: string }[] => {
  return Object.entries(workingDays).map(([day, hours]) => {
    const dayName = daysOfWeek[parseInt(day)];
    const displayHours = hours?.start?.display === "Closed" ? "Closed" : `${hours?.start?.display ?? "N/A"} - ${hours?.end?.display ?? "N/A"}`;
    return { day: dayName, hours: displayHours };
  });
};

const parseWorkingDays = (workingDaysStr: string): WorkingHours => {
  let workingDays: WorkingHours = {};
  try {
    if (workingDaysStr) {
      workingDays = JSON.parse(workingDaysStr as unknown as string);
    }
  } catch (e) {
    console.error("Error parsing workingDays JSON:", e);
  }
  return workingDays;
};

export const readAllDesigners = async (filters: DesignerFilters) => {
  const {
    location,
    minRating,
    gender,
    yearsOfExperience,
    openNow,
    name,
    category,
    page = 1,
    limit = 10,
    sortBy = 'baseAccountId'
  } = filters;
  const offset = (page - 1) * limit;

  const queryConditions: Prisma.DesignerProfileWhereInput = {
    ...(location && { address: { contains: location, mode: 'insensitive' } }),
    ...(yearsOfExperience !== undefined && yearsOfExperience > 0 && { yearsExperience: { equals: yearsOfExperience } }),
    ...(category && { categories: { some: { Category: { name: { equals: category } } } } })
  };

  if (name || gender) {
    queryConditions.baseAccount = {
      ...(name && {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
          { AND: [
            { firstName: { contains: name.split(' ')[0], mode: 'insensitive' } },
            { lastName: { contains: name.split(' ')[1], mode: 'insensitive' } }
          ]}
        ]
      }),
      ...(gender && { gender: { equals: gender } })
    };
  }

  try {
    const designers = await prisma.designerProfile.findMany({
      where: queryConditions,
      skip: offset,
      take: limit,
      select: {
        baseAccountId: true,
        ordersFinished: true,
        address: true,
        yearsExperience: true,
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
        },
        categories: {
          select: {
            Category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const filteredDesigners = designers.filter(designer => {
      const rating = designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0;
      return minRating ? rating >= minRating : true;
    });

    const sortedDesigners = filteredDesigners.map(designer => {
      let workingDays: WorkingHours = parseWorkingDays(designer.workingDays as unknown as string);

      const { open, openUntil } = isOpenNow(workingDays);

      const rating = designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0;
      const reviewCount = designer.reviews.length;

      const addressParts = designer.address.split(', ');
      const provisionCityAddress = `${addressParts[addressParts.length - 2]}, ${addressParts[addressParts.length - 1]}`;

      return {
        baseAccountId: designer.baseAccountId,
        ordersFinished: designer.ordersFinished,
        address: provisionCityAddress,
        yearsExperience: designer.yearsExperience,
        rating,
        reviewCount,
        avatarUrl: designer.baseAccount.avatarUrl,
        gender: designer.baseAccount.gender,
        name: `${designer.baseAccount.firstName} ${designer.baseAccount.lastName}`,
        openNow: open,
        openUntil: open ? openUntil : null,
      };
    }).sort((a, b) => {
      switch (sortBy) {
        case 'mostBooked':
          return b.ordersFinished - a.ordersFinished;
        case 'highestReviews':
          return b.reviewCount - a.reviewCount;
        case 'highestRated':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    const openFilteredDesigners = openNow !== undefined
      ? sortedDesigners.filter(designer => designer.openNow === openNow)
      : sortedDesigners;

    const totalFilteredCount = await prisma.designerProfile.count({
      where: queryConditions
    });

    const totalPages = Math.ceil(totalFilteredCount / limit);

    return {
      designers: openFilteredDesigners.length ? openFilteredDesigners : [],
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
                baseAccountId: true
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
      let workingDays: WorkingHours = parseWorkingDays(designer.workingDays as unknown as string);

      const { open, openUntil } = isOpenNow(workingDays);

      return {
        baseAccountId: designer.baseAccountId,
        ordersFinished: designer.ordersFinished,
        yearsExperience: designer.yearsExperience,
        about: designer.about,
        workingDays: formatWorkingDays(workingDays),
        rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0,
        baseAccount: {
          avatarUrl: designer.baseAccount.avatarUrl,
          gender: designer.baseAccount.gender,
          name: `${designer.baseAccount.firstName} ${designer.baseAccount.lastName}`
        },
        openNow: open,
        openUntil: open ? openUntil : null,
        locationDetails: {
          latitude: designer.latitude,
          longitude: designer.longtitude,
          address: designer.address,
        },
        reviews: designer.reviews,
        services: designer.services,
        teamMembers: designer.teamMembers,
        categories: designer.categories,
        // portfolios: designer.portfolios,
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

export const findDesignerPortfolioBy = async (data: Prisma.DesignerProfileWhereUniqueInput) => {
  try {
    const designer = await prisma.designerProfile.findUnique({
      where: data,
      select: {
        portfolios: {
          select: {
            url: true
          }
        }
      }
    });

    return designer?.portfolios || [];
  } catch (error) {
    console.error("Error finding designer portfolio:", error);
    throw new Error("Failed to find designer portfolio");
  } finally {
    await prisma.$disconnect();
  }
};

const designerFilterSchema = Joi.object({
  location: Joi.string().optional(),
  minRating: Joi.number().min(1).max(5).optional(),
  gender: Joi.string().valid('Male', 'Female').optional(),
  yearsOfExperience: Joi.number().integer().min(0).optional(),
  openNow: Joi.boolean().optional(),
  name: Joi.string().optional(),
  category: Joi.string().valid('Casual', 'Formal', 'Classic', 'Soiree').optional(),
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

export async function addDesigner(email: string, firstName: string, lastName: string, password: string, designerDetails: designerProfileDetails) {
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

export async function getDesignerBaseAccountByEmail(email: string) {
  try {
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
  } catch (error) {
    return false;
  }
}

export async function getDesignerSubscriptionTier(designerId: string): Promise<"PREMIUM" | "STANDARD" | undefined> {
  const result = await prisma.premiumSubscription.findFirst({
    where: {
      designerId: designerId
    },
    select: {
      subscriptionType: true
    }
  });
  return result?.subscriptionType ?? undefined;
}

export const updateDesignerBy = async (uniqueData : Prisma.DesignerProfileWhereUniqueInput, data : Prisma.DesignerProfileUpdateInput) => {
  const designer = await prisma.designerProfile.update({
    where : uniqueData,
    data : {...data}
  })
  return designer 
}
