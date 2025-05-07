import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

console.log('DATABASE_HOST:', process.env.DATABASE_HOST);

export const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    server: process.env.DATABASE_HOST, 
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    options: {
        encrypt: true, // Azure exige SSL
        trustServerCertificate: true // Em desenvolvimento
    }
};

    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();
    
    poolConnect
      .then(() => console.log('✅ Conectado com sucesso ao banco Azure SQL!'))
      .catch(err => console.error('❌ Erro de conexão:', err));
    
    // Exporta o pool e o sql
    export { pool, sql };