import * as React from 'react';

import initMatrix from '../../src/client/initMatrix';
import { initHotkeys } from '../../src/client/event/hotkeys';
import { initRoomListListener } from '../../src/client/event/roomList';
import { useSelectedTab } from '../../src/app/hooks/useSelectedTab';

export interface CinnyStateContextType {
  loading?: boolean,
  selectedTab?: string,
}

export const CinnyStateContext = React.createContext({});

export function CinnyStateProvider(props) {
  const [loading, changeLoading] = React.useState(true);
  const [selectedTab] = useSelectedTab();

  React.useEffect(() => {
    initMatrix.once('init_loading_finished', () => {
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);
    });
    initMatrix.init();
  }, []);

  const values: CinnyStateContextType = React.useMemo(() => ({ 
    loading,
    selectedTab,
  }), [loading, selectedTab])

  return <CinnyStateContext.Provider {...props} value={values}/>;
}
