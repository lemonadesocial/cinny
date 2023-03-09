import * as React from 'react';
import initMatrix from '../../src/client/initMatrix';

import { initHotkeys } from '../../src/client/event/hotkeys';
import { initRoomListListener } from '../../src/client/event/roomList';

export const CinnyContext = React.createContext({
  loading: true,
});

export function CinnyProvider(props) {
  const [loading, changeLoading] = React.useState(true);

  React.useEffect(() => {
    initMatrix.once('init_loading_finished', () => {
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);
    });
    initMatrix.init();
  }, []);

  const values = React.useMemo(() => ({ loading }), [loading])

  return <CinnyContext.Provider {...props} value={values}/>;
}
