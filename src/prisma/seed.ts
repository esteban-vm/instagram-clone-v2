import type { Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { prisma } from '@/prisma'

const users = (<const>[
  { email: 'user1@example.com', name: 'Daniel', password: 'Abcd123*' },
  { email: 'user2@example.com', name: 'Ana', password: 'Abcd123*' },
  { email: 'user3@example.com', name: 'Clara', password: 'Abcd123*' },
  { email: 'user4@example.com', name: 'Sergio', password: 'Abcd123*' },
  { email: 'user5@example.com', name: 'Helena', password: 'Abcd123*' },
]) satisfies Prisma.UserCreateManyInput[]

async function cleanDataBase() {
  await prisma.comment.deleteMany({})
  await prisma.photo.deleteMany({})
  await prisma.follows.deleteMany({})
  await prisma.user.deleteMany({})
}

async function insertInitialData() {
  await prisma.user.createMany({
    data: users.map((user) => {
      return {
        ...user,
        password: hashSync(user.password),
      }
    }),
  })
}

async function insertAdditionalData() {
  const user1 = await prisma.user.findUniqueOrThrow({ where: { email: users[0].email } })
  const user2 = await prisma.user.findUniqueOrThrow({ where: { email: users[1].email } })

  // await prisma.follows.create({ data: { followerId: user1.id, followingId: user2.id } })

  await prisma.user.update({
    where: { id: user1.id },
    data: { followers: { create: { followingId: user2.id } } },
  })
}

void (async function () {
  try {
    console.log('Seeding started')
    await cleanDataBase()
    await insertInitialData()
    await insertAdditionalData()
    console.log('Seeding completed')
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
})()
