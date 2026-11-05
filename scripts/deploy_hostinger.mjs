import { MCPServer } from '/Users/shutter_katha/.npm/_npx/4f48705995aa9bbd/node_modules/@hostinger/mcp/src/core/runtime.js';
import tools from '/Users/shutter_katha/.npm/_npx/4f48705995aa9bbd/node_modules/@hostinger/mcp/src/core/tools/all.js';

async function deploy() {
  console.log('Initializing MCPServer with Hostinger tools...');
  const server = new MCPServer({ name: 'deployer', version: '1.0.0', tools, instructions: '' });

  console.log('Triggering hosting deploy for cdermanepal.com...');
  const result = await server.handleHostingDeploy({
    domain: 'cdermanepal.com',
    path: '/Users/shutter_katha/Downloads/Old/c-derma'
  });
  console.log('Deploy result:', JSON.stringify(result, null, 2));

  const uuid = result?.buildUuid || result?.build?.uuid || result?.uuid;
  if (uuid) {
    console.log('Build triggered with UUID:', uuid);
    console.log('Polling build status until completed...');
    let done = false;
    let attempts = 0;
    while (!done && attempts < 60) {
      attempts++;
      await new Promise(r => setTimeout(r, 4000));
      try {
        const status = await server.handleHostingGetDeployment({
          domain: 'cdermanepal.com',
          buildUuid: uuid
        });
        const state = status?.build?.state || status?.state || status?.status;
        console.log(`[Attempt ${attempts}] Build state: ${state}`);
        if (state === 'completed' || state === 'failed') {
          done = true;
          console.log('Final deployment status:', JSON.stringify(status, null, 2));
          if (state === 'failed') {
            process.exit(1);
          }
        }
      } catch (pollErr) {
        console.log(`[Attempt ${attempts}] Polling notice:`, pollErr.message);
      }
    }
  }
}

deploy().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});

