import Prisma from "@prisma/client";

// PrismaClient is not available when testing
const { PrismaClient } = Prisma || {};
const prisma = PrismaClient ? new PrismaClient() : {};

export const Tenant = prisma.tenant;
export const Inventory = prisma.inventory;
export const Language = prisma.language;
export const UserSettings = prisma.userSettings;
export const Role = prisma.role;
export const UserBranchMap = prisma.userBranchMap;
export const Branch = prisma.branch;
export const Users = prisma.users;
export const CountryAndState = prisma.countryAndState;
export const Password = prisma.password;
export const Product = prisma.product;
export const Organisation = prisma.organisation;
export const UnitOfMeasure = prisma.unitOfMeasure;
export const Warehouse = prisma.warehouse;
