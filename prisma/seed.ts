import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'post1' },
    update: {},
    create: {
      title: 'post1',
      body: 'post1',
      description: 'this is post 1',
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'post2' },
    update: {},
    create: {
      title: 'post2',
      body: 'post2',
      description: 'this is post 2',
      published: false,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
