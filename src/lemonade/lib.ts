import cons from '../client/state/cons';
import BasicRoomView from './client/templates/BasicRoomView';
import { ClientContent } from '../app/templates/client/ClientContent';
import CinnyClient from '../app/templates/client/Client';
import CinnyPanel from '../app/organisms/navigation/Drawer';
import CinnySideBar from '../app/organisms/navigation/SideBar';
import { RoomBaseView as CinnyRoom } from '../app/organisms/room/Room';
import CinnyDialogs from '../app/organisms/pw/Dialogs';
import CinnyReusableContextMenu from '../app/atoms/context-menu/ReusableContextMenu';
import CinnyWindows from '../app/organisms/pw/Windows';
import CinnyEmojiBoardOpener from '../app/organisms/emoji-board/EmojiBoardOpener';
import CinnyProviders from './client/CinnyProviders';
import RoomTimeline from '../client/state/RoomTimeline';
import RoomView from '../app/organisms/room/RoomView';
import { CinnyActionContext } from './client/ActionContext';
import { CinnyStateContext } from './client/StateContext';
import 'folds/dist/style.css';

import { configClass, varsClass } from 'folds/dist/index.js';

export {
  cons,
  BasicRoomView,
  ClientContent,
  CinnyClient,
  CinnyPanel,
  CinnySideBar,
  CinnyRoom,
  CinnyDialogs,
  CinnyReusableContextMenu,
  CinnyWindows,
  CinnyEmojiBoardOpener,
  CinnyActionContext,
  CinnyStateContext,
  CinnyProviders,
  RoomTimeline,
  RoomView,
  configClass,
  varsClass,
};
