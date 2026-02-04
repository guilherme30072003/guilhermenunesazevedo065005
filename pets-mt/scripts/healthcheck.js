#!/usr/bin/env node

/**
 * Health Check Script para o Container Docker
 * Verifica se a aplicação está saudável e pronta para receber requisições
 */

const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 5000,
};

const request = http.request(options, (res) => {
    console.log(`[HEALTH CHECK] Status: ${res.statusCode}`);

    // Considerar 2xx e 3xx como healthy
    if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log('[HEALTH CHECK] ✓ Container is healthy');
        process.exit(0);
    } else {
        console.log('[HEALTH CHECK] ✗ Container is unhealthy');
        process.exit(1);
    }
});

request.on('error', (error) => {
    console.error(`[HEALTH CHECK] ✗ Error: ${error.message}`);
    process.exit(1);
});

request.on('timeout', () => {
    console.error('[HEALTH CHECK] ✗ Health check timeout');
    request.destroy();
    process.exit(1);
});

request.end();
