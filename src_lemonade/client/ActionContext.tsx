import * as React from 'react';

import { createDM } from '../../src/client/action/room';
import { hasDMWith } from '../../src/util/matrixUtil';
import { selectRoom } from '../../src/client/action/navigation';

export interface CinnyActionContextType {
  openDM?: (userId: string) => void,
}

export const CinnyActionContext = React.createContext({});

export function CinnyActionProvider(props) {
  const openDM = async (userId: string) => {
    const dmRoomId = hasDMWith(userId);

    if (dmRoomId) {
      selectRoom(dmRoomId);
      return;
    }

    const createdRoom = await createDM(userId, false);

    if (createdRoom?.room_id) {
      selectRoom(createdRoom.room_id);
    }
  };

  const values: CinnyActionContextType = React.useMemo(() => ({ 
    openDM,
  }), []);

  return <CinnyActionContext.Provider {...props} value={values}/>;
}
