import * as React from 'react';
import { Room } from 'matrix-js-sdk';

import initMatrix from '../../src/client/initMatrix';
import { createDM, join } from '../../src/client/action/room';
import { hasDMWith } from '../../src/util/matrixUtil';
import { selectRoom } from '../../src/client/action/navigation';

export interface CinnyActionContextType {
  openDM(userId: string): Promise<string | null>;
  getRoom(roomId: string): Promise<Room | null>;
  joinRoom(roomId: string): Promise<string>;
}

export const CinnyActionContext = React.createContext<CinnyActionContextType>({
  openDM: async () => null,
  getRoom: async () => null,
  joinRoom: async () => '',
});

export function CinnyActionProvider(props) {
  async function openDM(userId: string) {
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

    return null;
  };

  async function getRoom(roomId: string) {
    if (!initMatrix.matrixClient) return null;

    const myRoom = initMatrix.matrixClient.getRoom(roomId);

    return myRoom;
  }

  async function joinRoom(roomId: string, isDM = true) {
    return join(roomId, isDM);
  }

  const values: CinnyActionContextType = React.useMemo(() => ({ 
    openDM,
    getRoom,
    joinRoom,
  }), []);

  return <CinnyActionContext.Provider {...props} value={values}/>;
}
