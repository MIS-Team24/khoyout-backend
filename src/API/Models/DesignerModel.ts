import { prisma } from "../../Database";
import { Prisma } from "@prisma/client";

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
  const { location, minRating, yearsOfExperience, page = 1, limit = 10, sortBy = 'baseAccountId', sortOrder = 'asc' } = filters;
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
      location: true, // Ensure location is selected
      workingDays: true,
      reviews: {
        select: {
          rating: true
        }
      },
      baseAccount: {
        select: {
          avatarUrl: true
        }
      }
    }
  });

  return designers.map(designer => {
    const workingDays: WorkingHours = JSON.parse(designer.workingDays as unknown as string);
    const { open, openUntil } = isOpenNow(workingDays);

    return {
      baseAccountId: designer.baseAccountId,
      ordersFinished: designer.ordersFinished,
      location: designer.location, // Include location instead of address
      yearsExperience: designer.yearsExperience,
      rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0,
      avatarUrl: designer.baseAccount.avatarUrl,
      openNow: open,
      openUntil: open ? openUntil : null
    };
  });
};

// Function to find a specific designer by unique attribute
export const findDesignerBy = async (data: Prisma.DesignerProfileWhereUniqueInput) => {
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
          avatarUrl: true
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

      portfolios: {
        select: {
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
      openNow: open,
      openUntil: open ? openUntil : null,
      workingDays: formatWorkingDays(workingDays), // Format working days for readability
      rating: designer.reviews.length ? designer.reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / designer.reviews.length : 0
    };
  }

  return designer;
};
