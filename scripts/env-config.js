const fs = require('fs');
const targetPath = './src/environments/environment.prod.ts';
const envConfigFile = `
export const environment = {
    production: true,
    apiUrl: '${process.env.apiUrl}',

};
`;
fs.writeFileSync(targetPath, envConfigFile);

