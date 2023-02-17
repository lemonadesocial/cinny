import Client from './src/app/templates/client/Client';
import { isAuthenticated } from './src/client/state/auth';
import settings from './src/client/state/settings';
import initMatrix from './src/client/initMatrix';

import { loginWithToken } from './src_lemonade/client/action/auth';

export {
  Client,
  isAuthenticated,
  settings,
  initMatrix,
  loginWithToken,
}
