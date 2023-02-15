import cons from '../../../src/client/state/cons';
import { createTemporaryClient, updateLocalStore } from '../../../src/client/action/auth';

async function loginWithToken(baseUrl, token) {
  const client = createTemporaryClient(baseUrl);

  const res = await client.login('org.matrix.login.jwt', {
    token,
    initial_device_display_name: cons.DEVICE_DISPLAY_NAME,
  });

  const myBaseUrl = res?.well_known?.['m.homeserver']?.base_url || client.baseUrl;
  updateLocalStore(res.access_token, res.device_id, res.user_id, myBaseUrl);
}

export {
  loginWithToken,
};
