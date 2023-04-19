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
  inviteDirects?: Set<string>,
}

export const CinnyStateContext = React.createContext({});

export function CinnyStateProvider(props) {
  const { matrixToken } = props;
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [loading, changeLoading] = React.useState(true);
  const [matrixLoggedIn, setMatrixLoggedIn] = React.useState(isAuthenticated());
  const [inviteDirects, setInviteDirects] = React.useState(new Set<string>());
  const [selectedTab] = useSelectedTab();

  React.useEffect(() => {
    if (!matrixToken || matrixLoggedIn) return;

    (async () => {
      await loginWithToken(process.env.MATRIX_BASE_URL, matrixToken);
      setMatrixLoggedIn(isAuthenticated());
    })();
  }, [matrixToken, matrixLoggedIn]);

  React.useEffect(() => {
    if (!matrixLoggedIn || !pageLoaded) return;

    initMatrix.once('init_loading_finished', () => {
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);

      if (initMatrix.roomList?.inviteDirects) setInviteDirects(initMatrix.roomList.inviteDirects);
    });
    initMatrix.init();
  }, [matrixLoggedIn, pageLoaded])

  React.useEffect(() => {
      console.log('document.readyState', document.readyState);
    const onPageLoad = () => {
      if (pageLoaded) return;
      setPageLoaded(true);
    }

    window.addEventListener('load', onPageLoad);

    return window.removeEventListener('load', onPageLoad);
  }, []);
  console.log('pageLoaded', pageLoaded);

  const values: CinnyStateContextType = React.useMemo(() => ({ 
    loading,
    selectedTab,
    inviteDirects,
  }), [loading, selectedTab, inviteDirects]);

  return <CinnyStateContext.Provider {...props} value={values}/>;
}

CinnyStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  matrixToken: PropTypes.string,
};
