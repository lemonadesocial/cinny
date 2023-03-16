import * as React from 'react';
import PropTypes from 'prop-types';

import initMatrix from '../../src/client/initMatrix';
import { loginWithToken } from './action/auth';
import { initHotkeys } from '../../src/client/event/hotkeys';
import { initRoomListListener } from '../../src/client/event/roomList';
import { isAuthenticated } from '../../src/client/state/auth';
import { useSelectedTab } from '../../src/app/hooks/useSelectedTab';

export interface CinnyStateContextType {
  loading?: boolean,
  selectedTab?: string,
}

export const CinnyStateContext = React.createContext({});

export function CinnyStateProvider(props) {
  const { matrixToken } = props;
  const [loading, changeLoading] = React.useState(true);
  const [matrixLoggedIn, setMatrixLoggedIn] = React.useState(isAuthenticated());
  const [selectedTab] = useSelectedTab();

  React.useEffect(() => {
    if (!matrixToken || matrixLoggedIn) return;

    (async () => {
      try {
        await loginWithToken(process.env.MATRIX_BASE_URL, matrixToken);
        setMatrixLoggedIn(isAuthenticated());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matrixToken, matrixLoggedIn]);

  React.useEffect(() => {
    if (!matrixLoggedIn) return;

    initMatrix.once('init_loading_finished', () => {
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);
    });
    initMatrix.init();
  }, [matrixLoggedIn])

  const values: CinnyStateContextType = React.useMemo(() => ({ 
    loading,
    selectedTab,
  }), [loading, selectedTab])

  return <CinnyStateContext.Provider {...props} value={values}/>;
}

CinnyStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  matrixToken: PropTypes.string,
};
