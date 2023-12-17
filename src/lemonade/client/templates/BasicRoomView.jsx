// This copied from src/app/organisms/room/RoomView.jsx
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import RoomViewContent from '../../../app/organisms/room/RoomViewContent';
import RoomViewFloating from '../../../app/organisms/room/RoomViewFloating';
import { RoomTimeline } from '../../../app/organisms/room/RoomTimeline';
import { RoomInput } from '../../../app/organisms/room/RoomInput';

import '../../../app/organisms/room/RoomView.scss';

function BasicRoomView({ room, eventId }) {
  const roomViewRef = useRef(null);
  const roomInputRef = useRef(null);

  const { roomId } = room;

  return (
    <div className="room-view" ref={roomViewRef}>
      <div className="room-view__content-wrapper">
        <div className="room-view__scrollable">
          <RoomTimeline
            key={roomId}
            room={room}
            eventId={eventId}
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
  );
}

BasicRoomView.defaultProps = {
  eventId: null,
};
BasicRoomView.propTypes = {
  roomTimeline: PropTypes.shape({ roomId: PropTypes.string }).isRequired,
  eventId: PropTypes.string,
};

export default BasicRoomView;
