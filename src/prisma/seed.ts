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
  const user1 = await prisma.user.findUniqueOrThrow({ where: { email: users[0].email, active: true } })
  const user2 = await prisma.user.findUniqueOrThrow({ where: { email: users[1].email, active: true } })
  const user3 = await prisma.user.findUniqueOrThrow({ where: { email: users[2].email, active: true } })

  // await prisma.follows.create({ data: { followerId: user1.id, followingId: user2.id } })

  await prisma.user.update({
    where: { id: user1.id },
    data: {
      followers: {
        createMany: { data: [{ followingId: user2.id }, { followingId: user3.id }] },
      },
    },
  })

  const [photo1, photo2, photo3] = await prisma.photo.createManyAndReturn({
    data: [
      { image: '/images/photos/1.jpg', caption: 'Test caption 1', ownerId: user1.id },
      { image: '/images/photos/2.jpg', caption: 'Test caption 2', ownerId: user1.id },
      { image: '/images/photos/3.jpg', caption: 'Test caption 3', ownerId: user1.id },
      { image: '/images/photos/4.jpg', caption: 'Test caption 4', ownerId: user2.id },
      { image: '/images/photos/5.jpg', caption: 'Test caption 5', ownerId: user2.id },
    ],
  })

  await prisma.comment.createMany({
    data: [
      { authorId: user2.id, photoId: photo1.id, content: 'Test comment 1' },
      { authorId: user2.id, photoId: photo2.id, content: 'Test comment 2' },
      { authorId: user3.id, photoId: photo3.id, content: 'Test comment 3' },
    ],
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
