import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  // Usuário Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      emailVerified: new Date(),
      image: "https://i.pravatar.cc/150?img=1",
    },
  });

  // Documento de exemplo
  const document = await prisma.document.create({
    data: {
      title: "Documento Demo",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Este é um documento colaborativo de exemplo 🚀",
              },
            ],
          },
        ],
      },
      ownerId: admin.id,
      versions: {
        create: {
          content: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Versão inicial do documento demo." },
                ],
              },
            ],
          },
        },
      },
      editors: {
        create: {
          userId: admin.id,
          role: "owner",
        },
      },
    },
  });

  // Arquivo de exemplo
  const file = await prisma.file.create({
    data: {
      userId: admin.id,
      name: "exemplo.pdf",
      type: "pdf",
      url: "https://example-bucket.s3.amazonaws.com/exemplo.pdf",
      size: 123456,
    },
  });

  // Chat de exemplo (usuário conversando com IA)
  await prisma.chatMessage.createMany({
    data: [
      {
        userId: admin.id,
        role: "user",
        content: "Olá, IA! Pode me ajudar?",
      },
      {
        role: "assistant",
        content: "Claro! Estou aqui para te ajudar. 😊",
      },
      {
        userId: admin.id,
        role: "user",
        content: "Explique rapidamente o que é Clean Architecture.",
      },
      {
        role: "assistant",
        content:
          "Clean Architecture é um conjunto de princípios para organizar o código separando regras de negócio, casos de uso e infraestrutura, facilitando manutenção e testes.",
      },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
