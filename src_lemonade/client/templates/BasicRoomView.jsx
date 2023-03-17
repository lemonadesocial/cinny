// This copied from src/app/organisms/room/RoomView.jsx
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import EventEmitter from 'events';

import RoomViewContent from '../../../src/app/organisms/room/RoomViewContent';
import RoomViewFloating from '../../../src/app/organisms/room/RoomViewFloating';
import BasicRoomViewInput from './BasicRoomViewInput';

import '../../../src/app/organisms/room/RoomView.scss';

const viewEvent = new EventEmitter();

function BasicRoomView({ roomTimeline, eventId }) {
  const roomViewRef = useRef(null);

  const { roomId } = roomTimeline;

  return (
    <div className="room-view" ref={roomViewRef} style={{ '--av-small': '0px' }}>
      {/* <RoomViewHeader roomId={roomId} /> */}
      <div className="room-view__content-wrapper">
        <div className="room-view__scrollable">
          <RoomViewContent
            eventId={eventId}
            roomTimeline={roomTimeline}
          />
          <RoomViewFloating
            roomId={roomId}
            roomTimeline={roomTimeline}
          />
        </div>
        <div className="room-view__sticky">
          <BasicRoomViewInput
            roomId={roomId}
            roomTimeline={roomTimeline}
            viewEvent={viewEvent}
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
