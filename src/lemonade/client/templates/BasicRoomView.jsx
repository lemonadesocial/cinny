// This copied from src/app/organisms/room/RoomView.jsx
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Room } from 'matrix-js-sdk/src/models/room';

import { RoomTimeline } from '../../../app/organisms/room/RoomTimeline';
import { RoomViewTyping } from '../../../app/organisms/room/RoomViewTyping';
import { RoomInput } from '../../../app/organisms/room/RoomInput';
import { useEditor } from '../../../app/components/editor';
import { PowerLevelsContextProvider, usePowerLevels } from '../../../app/hooks/usePowerLevels';

import '../../../app/organisms/room/RoomView.scss';

function BasicRoomView({ room }) {
  const roomViewRef = useRef(null);
  const roomInputRef = useRef(null);
  const editor = useEditor();
  const powerLevelAPI = usePowerLevels(room);

  const { roomId } = room;

  return (
    <PowerLevelsContextProvider value={powerLevelAPI}>
      <div className="room-view" ref={roomViewRef}>
        <div className="room-view__content-wrapper">
          <div className="room-view__scrollable">
            <RoomTimeline
              key={roomId}
              room={room}
              roomInputRef={roomInputRef}
              editor={editor}
            />
            <RoomViewTyping room={room} />
          </div>
          <div className="room-view__sticky">
            <RoomInput
              room={room}
              editor={editor}
              roomId={roomId}
              roomViewRef={roomViewRef}
              ref={roomInputRef}
            />
          </div>
        </div>
      </div>
    </PowerLevelsContextProvider>
  );
}

BasicRoomView.propTypes = {
  room: Room.isRequired,
};

export default BasicRoomView;
