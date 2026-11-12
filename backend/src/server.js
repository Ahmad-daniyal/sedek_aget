import { app } from './app.js';
import { config } from './config/env.js';
import { prisma } from './config/prisma.js';

async function shutdown(signal) {
  process.stdout.write(`Menerima ${signal}, menutup server...\n`);
  await prisma.$disconnect();
  process.exit(0);
}

async function start() {
  try {
    await prisma.$connect();
    app.listen(config.port, () => {
      process.stdout.write(`sedek_aget API berjalan di http://localhost:${config.port}\n`);
    });
  } catch (error) {
    process.stderr.write(`Gagal menjalankan server: ${error.message}\n`);
    process.exit(1);
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
