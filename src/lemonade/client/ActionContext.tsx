import { useMemo, createContext, useContext } from 'react';
import { Room } from 'matrix-js-sdk';

import { createDM, join, createRoom } from '../../client/action/room';
import { hasDMWith } from '../../util/matrixUtil';
import { selectRoom as selectRoomAction, selectTab } from '../../client/action/navigation';
import { CinnyStateContext } from './StateContext';

export interface CinnyActionContextType {
  openDM(userId: string): Promise<string | null>;
  getRoom(roomId: string): Promise<Room | null>;
  joinRoom(roomId: string): Promise<string>;
  selectTab(tabId: string): void;
  createRoom: (option: { name: string; topic?: string; joinRule?: 'public' | 'private' }) => Promise<{ room_id: string }>;
  selectRoom: (roomId: string, eventId: string) => void;
}

export const CinnyActionContext = createContext<CinnyActionContextType>({
  openDM: async () => null,
  getRoom: async () => null,
  joinRoom: async () => '',
  selectTab: () => null,
  selectRoom: () => null,
  createRoom: async (option) => ({ room_id: '' }),
});

export function CinnyActionProvider(props: any) {
  const { initMatrix } = useContext(CinnyStateContext);
  
  async function openDM(userId: string) {
    const dmRoomId = hasDMWith(userId);

    if (dmRoomId) {
      selectRoomAction(dmRoomId);
      return dmRoomId;
    }

    const createdRoom = await createDM(userId, false);

    if (createdRoom?.room_id) {
      selectRoomAction(createdRoom.room_id);
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

  async function selectRoom(roomId: string) {
    return selectRoomAction(roomId);
  }

  const values = {
    openDM,
    getRoom,
    joinRoom,
    selectTab,
    createRoom,
    selectRoom,
  };

  return <CinnyActionContext.Provider {...props} value={values}/>;
}
