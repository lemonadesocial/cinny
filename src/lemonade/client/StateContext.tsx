import * as React from 'react';
import PropTypes from 'prop-types';

import initMatrix, { InitMatrix } from '../../client/initMatrix';
import { loginWithToken } from './action/auth';
import { initHotkeys } from '../../client/event/hotkeys';
import { initRoomListListener } from '../../client/event/roomList';
import { isAuthenticated } from '../../client/state/auth';
import { useSelectedTab } from '../../app/hooks/useSelectedTab';
import settings, { Settings } from '../../client/state/settings';
import navigation, { Navigation } from '../../client/state/navigation';
import { MatrixClientProvider } from '../../app/hooks/useMatrixClient';

export interface CinnyStateContextType {
  loading?: boolean;
  selectedTab?: string;
  inviteDirects?: Set<string>;
  initMatrix: InitMatrix;
  navigation: Navigation;
  settings: Settings;
}

export const CinnyStateContext = React.createContext<CinnyStateContextType>({
  initMatrix,
  navigation,
  settings,
});

export function CinnyStateProvider(props: any) {
  const { matrixToken } = props;
  const [loading, changeLoading] = React.useState(true);
  const [matrixLoggedIn, setMatrixLoggedIn] = React.useState(isAuthenticated());
  const [inviteDirects, setInviteDirects] = React.useState(new Set<string>());
  const [selectedTab] = useSelectedTab();


  React.useEffect(() => {
    if (settings.useSystemTheme) {
      settings.toggleUseSystemTheme();
    }

    settings.setTheme(2); // Dark theme
  }, []);

  React.useEffect(() => {
    if (!matrixToken || matrixLoggedIn) return;

    (async () => {
      await loginWithToken(process.env.MATRIX_BASE_URL, matrixToken);
      setMatrixLoggedIn(isAuthenticated());
    })();
  }, [matrixToken, matrixLoggedIn]);

  React.useEffect(() => {
    if (!matrixLoggedIn) return;

    initMatrix.once('init_loading_finished', () => {
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);

      if (initMatrix.roomList?.inviteDirects) setInviteDirects(initMatrix.roomList.inviteDirects);
    });
    initMatrix.init();
  }, [matrixLoggedIn])

  const values: CinnyStateContextType = React.useMemo(() => ({ 
    loading,
    selectedTab,
    inviteDirects,
    initMatrix,
    navigation,
    settings,
  }), [loading, selectedTab, inviteDirects]);

  return (
    <MatrixClientProvider value={initMatrix.matrixClient || null}>
      <CinnyStateContext.Provider {...props} value={values}/>
    </MatrixClientProvider>
  );
}

CinnyStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  matrixToken: PropTypes.string,
};