import * as React from 'react';

import { createDM } from '../../src/client/action/room';
import { hasDMWith } from '../../src/util/matrixUtil';
import { selectRoom } from '../../src/client/action/navigation';

export interface CinnyActionContextType {
  openDM(userId: string): Promise<string>,
}

export const CinnyActionContext = React.createContext<CinnyActionContextType>({
  openDM: async () => '',
});

export function CinnyActionProvider(props) {
  const openDM = async (userId: string) => {
    const dmRoomId = hasDMWith(userId);

    if (dmRoomId) {
      selectRoom(dmRoomId);
      return dmRoomId;
    }

    const createdRoom = await createDM(userId, false);

    if (createdRoom?.room_id) {
      selectRoom(createdRoom.room_id);
      return createdRoom?.room_id;
    }

    return '';
  };

  const values: CinnyActionContextType = React.useMemo(() => ({ 
    openDM,
  }), []);

  return <CinnyActionContext.Provider {...props} value={values}/>;
}
