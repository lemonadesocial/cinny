import * as React from 'react';
import { Room } from 'matrix-js-sdk';

import initMatrix from '../../src/client/initMatrix';
import { createDM, join } from '../../src/client/action/room';
import { hasDMWith } from '../../src/util/matrixUtil';
import { selectRoom } from '../../src/client/action/navigation';

export interface CinnyActionContextType {
  openDM(userId: string): Promise<string>,
  getRoom(roomId: string): Promise<Room | null>,
  joinRoom(roomId: string): Promise<string>,
}

export const CinnyActionContext = React.createContext<CinnyActionContextType>({
  openDM: async () => '',
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

    return '';
  };

  async function getRoom(roomId: string) {
    if (!initMatrix.matrixClient) return null;

    const myRoom = initMatrix.matrixClient.getRoom(roomId);
    if (myRoom === null) return null;

    return myRoom;
  }

  async function joinRoom(roomId: string, isDM = true) {
    const result = await join(roomId, isDM);
    return result;
  }

  const values: CinnyActionContextType = React.useMemo(() => ({ 
    openDM,
    getRoom,
    joinRoom,
  }), []);

  return <CinnyActionContext.Provider {...props} value={values}/>;
}
