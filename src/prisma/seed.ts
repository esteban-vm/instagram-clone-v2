import { hashSync } from 'bcryptjs'
import { subDays, subHours, subMinutes } from 'date-fns'
import { MOCK_USERS } from '@/lib/constants'
import { prisma } from '@/prisma'

async function cleanDataBase() {
  await prisma.comment.deleteMany({})
  await prisma.like.deleteMany({})
  await prisma.photo.deleteMany({})
  await prisma.follow.deleteMany({})
  await prisma.user.deleteMany({})
}

async function insertInitialData() {
  await prisma.user.createMany({
    data: MOCK_USERS.map((user) => {
      return {
        ...user,
        password: hashSync(user.password),
      }
    }),
  })
}

async function insertAdditionalData() {
  const user1 = await prisma.user.findUniqueOrThrow({ where: { email: MOCK_USERS[0].email, active: true } })
  const user2 = await prisma.user.findUniqueOrThrow({ where: { email: MOCK_USERS[1].email, active: true } })
  const user3 = await prisma.user.findUniqueOrThrow({ where: { email: MOCK_USERS[2].email, active: true } })
  const user4 = await prisma.user.findUniqueOrThrow({ where: { email: MOCK_USERS[3].email, active: true } })
  const user5 = await prisma.user.findUniqueOrThrow({ where: { email: MOCK_USERS[4].email, active: true } })

  await prisma.follow.createMany({
    data: [
      { followerId: user1.id, followingId: user2.id },
      { followerId: user1.id, followingId: user3.id },
      { followerId: user1.id, followingId: user4.id },
    ],
  })

  const [photo1, photo2, photo3, , photo5, , photo7] = await prisma.photo.createManyAndReturn({
    data: [
      {
        image: '/images/photos/photo1.webp',
        caption: 'Test caption 1',
        ownerId: user1.id,
        createdAt: subHours(new Date(), 2),
      },
      {
        image: '/images/photos/photo2.webp',
        caption: 'Test caption 2',
        ownerId: user1.id,
        createdAt: subHours(new Date(), 3),
      },
      {
        image: '/images/photos/photo3.webp',
        caption: 'Test caption 3',
        ownerId: user1.id,
        createdAt: subDays(new Date(), 2),
      },
      {
        image: '/images/photos/photo4.webp',
        caption: 'Test caption 4',
        ownerId: user2.id,
      },
      {
        image: '/images/photos/photo5.webp',
        caption: 'Test caption 5',
        ownerId: user2.id,
      },
      {
        image: '/images/photos/photo6.webp',
        caption: 'Test caption 6',
        ownerId: user3.id,
        createdAt: subDays(new Date(), 1),
      },
      {
        image: '/images/photos/photo7.webp',
        caption: 'Test caption 7',
        ownerId: user3.id,
      },
      {
        image: '/images/photos/photo8.webp',
        caption: 'Test caption 8',
        ownerId: user4.id,
      },
      {
        image: '/images/photos/photo9.webp',
        caption: 'Test caption 9',
        ownerId: user4.id,
        createdAt: subMinutes(new Date(), 50),
      },
      {
        image: '/images/photos/photo10.webp',
        caption: 'Test caption 10',
        ownerId: user5.id,
      },
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
      { authorId: user3.id, photoId: photo7.id, content: 'Test comment 8' },
      { authorId: user5.id, photoId: photo7.id, content: 'Test comment 9' },
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
