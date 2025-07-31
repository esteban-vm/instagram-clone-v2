import type { Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { prisma } from '@/prisma'

const users = [
  { email: 'user1@example.com', name: 'Daniel', password: 'Abcd123*', avatar: '/images/avatars/male1.webp' },
  { email: 'user2@example.com', name: 'Ana', password: 'Abcd123*', avatar: '/images/avatars/female1.webp' },
  { email: 'user3@example.com', name: 'Clara', password: 'Abcd123*', avatar: '/images/avatars/female2.webp' },
  { email: 'user4@example.com', name: 'Sergio', password: 'Abcd123*', avatar: '/images/avatars/male2.webp' },
  { email: 'user5@example.com', name: 'Helena', password: 'Abcd123*', avatar: '/images/avatars/female3.webp' },
  { email: 'user6@example.com', name: 'Fernando', password: 'Abcd123*', avatar: '/images/avatars/male3.webp' },
  { email: 'user7@example.com', name: 'Antonio', password: 'Abcd123*' },
  { email: 'user8@example.com', name: 'Laura', password: 'Abcd123*', avatar: '/images/avatars/female4.webp' },
  { email: 'user9@example.com', name: 'María', password: 'Abcd123*', avatar: '/images/avatars/female5.webp' },
  { email: 'user10@example.com', name: 'Francisco', password: 'Abcd123*' },
  { email: 'user11@example.com', name: 'Esteban', password: 'Abcd123*' },
  { email: 'user12@example.com', name: 'Aldo', password: 'Abcd123*' },
] as const satisfies Prisma.UserCreateManyInput[]

async function cleanDataBase() {
  await prisma.comment.deleteMany({})
  await prisma.like.deleteMany({})
  await prisma.photo.deleteMany({})
  await prisma.follow.deleteMany({})
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
  const user4 = await prisma.user.findUniqueOrThrow({ where: { email: users[3].email, active: true } })
  const user5 = await prisma.user.findUniqueOrThrow({ where: { email: users[4].email, active: true } })

  // await prisma.user.update({
  //   where: { id: user1.id },
  //   data: {
  //     followers: {
  //       createMany: { data: [{ followingId: user2.id }, { followingId: user3.id }] },
  //     },
  //   },
  // })

  await prisma.follow.createMany({
    data: [
      { followerId: user1.id, followingId: user2.id },
      { followerId: user1.id, followingId: user3.id },
      { followerId: user1.id, followingId: user4.id },
    ],
  })

  const [photo1, photo2, photo3, , photo5, , photo7] = await prisma.photo.createManyAndReturn({
    data: [
      { image: '/images/photos/photo1.webp', caption: 'Test caption 1', ownerId: user1.id },
      { image: '/images/photos/photo2.webp', caption: 'Test caption 2', ownerId: user1.id },
      { image: '/images/photos/photo3.webp', caption: 'Test caption 3', ownerId: user1.id },
      { image: '/images/photos/photo4.webp', caption: 'Test caption 4', ownerId: user2.id },
      { image: '/images/photos/photo5.webp', caption: 'Test caption 5', ownerId: user2.id },
      { image: '/images/photos/photo6.webp', caption: 'Test caption 6', ownerId: user3.id },
      { image: '/images/photos/photo7.webp', caption: 'Test caption 7', ownerId: user3.id },
      { image: '/images/photos/photo8.webp', caption: 'Test caption 8', ownerId: user4.id },
      { image: '/images/photos/photo9.webp', caption: 'Test caption 9', ownerId: user4.id },
      { image: '/images/photos/photo10.webp', caption: 'Test caption 10', ownerId: user5.id },
    ],
  })

  await prisma.comment.createMany({
    data: [
      { authorId: user2.id, photoId: photo1.id, content: 'Test comment 1' },
      { authorId: user2.id, photoId: photo2.id, content: 'Test comment 2' },
      { authorId: user3.id, photoId: photo3.id, content: 'Test comment 3' },
      { authorId: user4.id, photoId: photo3.id, content: 'Test comment 4' },
      { authorId: user5.id, photoId: photo2.id, content: 'Test comment 5' },
      { authorId: user4.id, photoId: photo5.id, content: 'Test comment 6' },
      { authorId: user2.id, photoId: photo7.id, content: 'Test comment 7' },
    ],
  })

  await prisma.like.createMany({
    data: [
      { userId: user1.id, photoId: photo3.id },
      { userId: user3.id, photoId: photo2.id },
      { userId: user2.id, photoId: photo1.id },
      { userId: user5.id, photoId: photo5.id },
      { userId: user3.id, photoId: photo5.id },
      { userId: user4.id, photoId: photo7.id },
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
