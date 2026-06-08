import { execSync } from 'child_process';
import os from 'os';

function getLanIp() {
  const nets = os.networkInterfaces();

  for (const name of Object.keys(nets)) {
    if (!/wi-?fi|wlan|wireless/i.test(name)) continue;
    for (const net of nets[name] ?? []) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        !net.address.startsWith('127.') &&
        !net.address.startsWith('169.254.')
      ) {
        return net.address;
      }
    }
  }

  return null;
}

const mode = process.argv[2] ?? 'lan';
const ip = getLanIp();
const env = { ...process.env };

if (ip) {
  env.REACT_NATIVE_PACKAGER_HOSTNAME = ip;
  console.log(`Rede local detectada: ${ip}`);
} else {
  console.log('IP da rede não detectado. Use: npm run start:tunnel');
}

if (mode === 'tunnel') {
  execSync('npx expo start --tunnel', { stdio: 'inherit', env });
} else {
  execSync('npx expo start --lan', { stdio: 'inherit', env });
}
