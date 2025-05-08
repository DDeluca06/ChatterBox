import { PrismaClient, Platform } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create social connections for the test user
  const platforms = Object.values(Platform);
  const socialConnections = await Promise.all(
    platforms.map(async (platform) => {
      return prisma.socialConnection.upsert({
        where: {
          userId_platform: {
            userId: user.id,
            platform,
          },
        },
        update: {
          username: faker.internet.userName(),
          accessToken: faker.string.alphanumeric(32),
          refreshToken: faker.string.alphanumeric(32),
          tokenExpiresAt: faker.date.future(),
          metadata: {
            profilePicture: faker.image.avatar(),
            bio: faker.lorem.sentence(),
            lastSync: faker.date.recent(),
          },
          isConnected: true,
        },
        create: {
          userId: user.id,
          platform,
          username: faker.internet.userName(),
          accessToken: faker.string.alphanumeric(32),
          refreshToken: faker.string.alphanumeric(32),
          tokenExpiresAt: faker.date.future(),
          metadata: {
            profilePicture: faker.image.avatar(),
            bio: faker.lorem.sentence(),
            lastSync: faker.date.recent(),
          },
          isConnected: true,
        },
      });
    })
  );

  console.log('Database has been seeded. 🌱');
  console.log('Test user created:', user.email);
  console.log('Social connections created:', socialConnections.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 