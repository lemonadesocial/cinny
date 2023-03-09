import * as React from 'react';

import { CinnyActionProvider } from "./ActionContext";
import { CinnyStateProvider } from "./StateContext";

export function CinnyProviders(props) {
  return (
    <CinnyActionProvider>
      <CinnyStateProvider {...props} />
    </CinnyActionProvider>
  );
}

export default CinnyProviders;
