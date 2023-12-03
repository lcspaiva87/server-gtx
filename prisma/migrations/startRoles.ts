import { prisma } from '../../src/lib/prisma'

async function seedDatabase() {
  await prisma.$transaction([
    prisma.user.create({
      data: {
        idUser: '1',
        name: 'admin',
        password:
          '$2a$10$L/Dd.OZz1b2BGARuo2cfW.2Xveny.1iMUa6IR3bS7nLEPU2PIytrm',
        email: 'admin@gmail.com',
        username: 'admin',
        status: 'ACTIVE',
        descricaoUser: 'super user',
      },
    }),
    prisma.role.create({
      data: {
        idRole: '1',
        name: 'admin',
        description: 'has all application permissions',
      },
    }),
    prisma.role.create({
      data: {
        idRole: '2',
        name: 'support',
        description: 'allows you to create edit or access some platform routes',
      },
    }),
    prisma.role.create({
      data: {
        idRole: '3',
        name: 'supervisor',
        description:
          'May have expanded permissions compared to regular users, often including the ability to manage users within a certain context, approve requests, and access reports or additional information.',
      },
    }),
    prisma.role.create({
      data: {
        idRole: '4',
        name: 'analyst',
        description:
          'This role often involves access to data and analysis tools, with permissions to manipulate and interpret information for decision making.',
      },
    }),
    prisma.permission.create({
      data: {
        idPermission: '0',
        name: 'zeroconstraint',
        description: 'permission to create new functionality',
      },
    }),
    prisma.permission.create({
      data: {
        idPermission: '1',
        name: 'create',
        description: 'permission to create new functionality',
      },
    }),
    prisma.permission.create({
      data: {
        idPermission: '2',
        name: 'update',
        description: 'permission to update the functionality',
      },
    }),
    prisma.permission.create({
      data: {
        idPermission: '3',
        name: 'delete',
        description: 'permission to delete',
      },
    }),
    prisma.permission.create({
      data: {
        idPermission: '4',
        name: 'view',
        description:
          'permission to view the data but not permission to edit or delete.',
      },
    }),
    prisma.usersPermissions.createMany({
      data: {
        IdUser: '1',
        idRole: '1',
        idPermission: '0',
      },
    }),
  ])
}

seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
