import * as React from 'react';
import initMatrix from '../../src/client/initMatrix';

import { initHotkeys } from '../../src/client/event/hotkeys';
import { initRoomListListener } from '../../src/client/event/roomList';
import { selectRoom } from '../../src/client/action/navigation';
import { hasDMWith, hasDevices } from '../../src/util/matrixUtil';
import { useSelectedTab } from '../../src/app/hooks/useSelectedTab';
import * as roomActions from '../../src/client/action/room';

export type CinnyContextValues = {
  loading?: boolean,
  selectedTab?: string,
  openDM?: (userId: string) => void,
}

export const CinnyContext = React.createContext({});

export function CinnyProvider(props) {
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

  const openDM = async (userId: string) => {
    // Check and open if user already have a DM with userId.
    const dmRoomId = hasDMWith(userId);
    if (dmRoomId) {
      selectRoom(dmRoomId);
      return;
    }

    // Create new DM
    try {
      const createResult = await roomActions.createDM(userId, false);
      if (createResult?.room_id) {
        selectRoom(createResult.room_id);
      }
    } catch {
      throw Error('Couldn\'t create direct message room.');
    }
  };

  const values: CinnyContextValues = React.useMemo(() => ({ 
    loading,
    selectedTab,
    openDM,
  }), [loading, selectedTab])

  return <CinnyContext.Provider {...props} value={values}/>;
}
