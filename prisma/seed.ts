import { PrismaClient, PlatformType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Map platform types to their display names
const platformNames = {
  [PlatformType.INSTAGRAM]: 'instagram',
  [PlatformType.TWITTER]: 'twitter',
  [PlatformType.FACEBOOK]: 'facebook',
  [PlatformType.LINKEDIN]: 'linkedin',
} as const;

// Platform-specific engagement types
const engagementTypes = {
  [PlatformType.INSTAGRAM]: ['Likes', 'Comments', 'Shares', 'Saves'],
  [PlatformType.TWITTER]: ['Likes', 'Retweets', 'Replies', 'Quotes'],
  [PlatformType.FACEBOOK]: ['Likes', 'Comments', 'Shares', 'Reactions'],
  [PlatformType.LINKEDIN]: ['Likes', 'Comments', 'Shares', 'Saves'],
} as const;

// Platform-specific content types
const contentTypes = {
  [PlatformType.INSTAGRAM]: ['Photos', 'Videos', 'Stories', 'Reels'],
  [PlatformType.TWITTER]: ['Tweets', 'Threads', 'Media', 'Polls'],
  [PlatformType.FACEBOOK]: ['Posts', 'Videos', 'Stories', 'Events'],
  [PlatformType.LINKEDIN]: ['Posts', 'Articles', 'Videos', 'Events'],
} as const;

// Audience age categories
const audienceCategories = ['18-24', '25-34', '35-44', '45+'];

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.org' },
    update: {},
    create: {
      email: 'test@example.org',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create platforms and their stats
  const platforms = Object.values(PlatformType);
  for (const platformType of platforms) {
    const platformName = platformNames[platformType];
    
    // Create platform with all related data
    const platform = await prisma.platform.upsert({
      where: { name: platformName },
      update: {},
      create: {
        name: platformName,
        engagement: {
          create: engagementTypes[platformType].map(type => ({
            type,
            count: faker.number.int({ min: 100, max: 10000 }),
            rate: Number(faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 }))
          }))
        },
        content: {
          create: contentTypes[platformType].map(type => ({
            type,
            value: faker.number.int({ min: 10, max: 100 })
          }))
        },
        audience: {
          create: audienceCategories.map(category => ({
            category,
            percentage: Number(faker.number.float({ min: 5, max: 40, fractionDigits: 1 })),
            change: Number(faker.number.float({ min: -2, max: 5, fractionDigits: 1 }))
          }))
        }
      }
    });

    // Create historical stats data
    const baseFollowers = faker.number.int({ min: 1000, max: 100000 });
    const maxFollowers = baseFollowers * faker.number.float({ min: 1.5, max: 3, fractionDigits: 2 });
    const baseEngagement = Number(faker.number.float({ min: 1, max: 10, fractionDigits: 1 }));
    let prevPosts = faker.number.int({ min: 50, max: 500 });
    let prevHashtagReach = faker.number.int({ min: 5000, max: 50000 });
    let prevRetweets = faker.number.int({ min: 100, max: 10000 });
    let prevImpressions = faker.number.int({ min: 10000, max: 100000 });
    let prevPageLikes = faker.number.int({ min: 500, max: 50000 });
    let prevReach = faker.number.int({ min: 5000, max: 50000 });
    let prevContentViews = faker.number.int({ min: 1000, max: 100000 });
    for (let i = 0; i < 90; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (89 - i)); // Start from 90 days ago

      // Followers: logistic growth + noise
      const t = i / 90;
      const logistic = maxFollowers / (1 + Math.exp(-8 * (t - 0.5)));
      const followers = Math.max(0, Math.round(logistic + faker.number.float({ min: -0.03, max: 0.03, fractionDigits: 2 }) * maxFollowers));

      // Engagement rate: sine wave (weekly) + noise
      const engagementRate = Number((baseEngagement + Math.sin(i / 7 * 2 * Math.PI) * 1.5 + faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 2 })).toFixed(1));

      // Impressions/reach: weekly cycles + random spikes
      const weekCycle = 1 + 0.2 * Math.sin(i / 7 * 2 * Math.PI);
      const spike = Math.random() < 0.07 ? faker.number.float({ min: 1.2, max: 2, fractionDigits: 2 }) : 1;
      prevImpressions = Math.round(prevImpressions * (1 + faker.number.float({ min: -0.01, max: 0.03, fractionDigits: 3 })) * weekCycle * spike);
      prevReach = Math.round(prevReach * (1 + faker.number.float({ min: -0.01, max: 0.03, fractionDigits: 3 })) * weekCycle * spike);

      // Other metrics: random walk
      prevPosts = Math.max(10, Math.round(prevPosts * (1 + faker.number.float({ min: -0.02, max: 0.04, fractionDigits: 3 }))));
      prevHashtagReach = Math.max(1000, Math.round(prevHashtagReach * (1 + faker.number.float({ min: -0.03, max: 0.05, fractionDigits: 3 }))));
      prevRetweets = Math.max(10, Math.round(prevRetweets * (1 + faker.number.float({ min: -0.03, max: 0.05, fractionDigits: 3 }))));
      prevPageLikes = Math.max(100, Math.round(prevPageLikes * (1 + faker.number.float({ min: -0.03, max: 0.05, fractionDigits: 3 }))));
      prevContentViews = Math.max(500, Math.round(prevContentViews * (1 + faker.number.float({ min: -0.03, max: 0.05, fractionDigits: 3 }))));

      await prisma.stats.create({
        data: {
          platformId: platform.id,
          date,
          followers,
          engagementRate,
          totalPosts: prevPosts,
          hashtagReach: prevHashtagReach,
          retweets: prevRetweets,
          impressions: prevImpressions,
          pageLikes: prevPageLikes,
          reach: prevReach,
          communityGrowth: Number((faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 }) * (1 + t)).toFixed(1)),
          contentViews: prevContentViews,
          activeJobs: faker.number.int({ min: 0, max: 20 }),
        }
      });
    }

    // Create social connection
    await prisma.socialConnection.upsert({
      where: {
        userId_platform: {
          userId: user.id,
          platform: platformType,
        },
      },
      update: {
        username: faker.internet.username(),
        accessToken: faker.string.alphanumeric(32),
        refreshToken: faker.string.alphanumeric(32),
        tokenExpiresAt: faker.date.future(),
        metadata: JSON.stringify({
          profilePicture: faker.image.avatar(),
          bio: faker.lorem.sentence(),
          lastSync: faker.date.recent(),
        }),
        isConnected: true,
      },
      create: {
        userId: user.id,
        platform: platformType,
        username: faker.internet.username(),
        accessToken: faker.string.alphanumeric(32),
        refreshToken: faker.string.alphanumeric(32),
        tokenExpiresAt: faker.date.future(),
        metadata: JSON.stringify({
          profilePicture: faker.image.avatar(),
          bio: faker.lorem.sentence(),
          lastSync: faker.date.recent(),
        }),
        isConnected: true,
      },
    });
  }

  console.log('Database has been seeded. 🌱');
  console.log('Test user created:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 