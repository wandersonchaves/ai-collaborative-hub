import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  const passwordHash = await bcrypt.hash("123456", 10);

  // Usuário Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      emailVerified: new Date(),
      image: "https://i.pravatar.cc/150?img=1",
      role: "admin",
      password: passwordHash,
    },
  });

  // Usuário Editor
  const editor = await prisma.user.upsert({
    where: { email: "editor@example.com" },
    update: {},
    create: {
      name: "Editor User",
      email: "editor@example.com",
      emailVerified: new Date(),
      image: "https://i.pravatar.cc/150?img=2",
      role: "editor",
      password: passwordHash,
    },
  });

  // Usuário Viewer
  const viewer = await prisma.user.upsert({
    where: { email: "viewer@example.com" },
    update: {},
    create: {
      name: "Viewer User",
      email: "viewer@example.com",
      emailVerified: new Date(),
      image: "https://i.pravatar.cc/150?img=3",
      role: "viewer",
      password: passwordHash,
    },
  });

  console.log("✅ Seed users created with default password: 123456");

  // Documento de exemplo (criado pelo Admin)
  await prisma.document.create({
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
        create: [
          { userId: admin.id, role: "owner" },
          { userId: editor.id, role: "editor" },
          { userId: viewer.id, role: "viewer" },
        ],
      },
    },
  });

  // Arquivo de exemplo (upload pelo Editor)
  await prisma.file.create({
    data: {
      userId: editor.id,
      name: "exemplo.pdf",
      type: "pdf",
      url: "https://example-bucket.s3.amazonaws.com/exemplo.pdf",
      size: 123456,
    },
  });

  // Chat de exemplo (Admin e IA)
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
