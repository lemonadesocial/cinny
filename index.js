import Client from './src/app/templates/client/Client';
import { isAuthenticated } from './src/client/state/auth';
import settings from './src/client/state/settings';
import navigation from './src/client/state/navigation';
import cons from './src/client/state/cons';
import initMatrix from './src/client/initMatrix';

import { loginWithToken } from './src_lemonade/client/action/auth';

export {
  Client,
  isAuthenticated,
  settings,
  navigation,
  cons,
  initMatrix,
  loginWithToken,
}
