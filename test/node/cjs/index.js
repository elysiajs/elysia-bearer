if ('Bun' in globalThis) {
  throw new Error('❌ Use Node.js to run this test!');
}

const { bearer } = require('@elysiajs/bearer');

if (typeof bearer !== 'function') {
  throw new Error('❌ CommonJS Node.js failed');
}

console.log('✅ CommonJS Node.js works!');
