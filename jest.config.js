import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  verbose: true,
  moduleDirectories: ['node_modules', path.join(__dirname, './src/index.js')],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};

export default config;
