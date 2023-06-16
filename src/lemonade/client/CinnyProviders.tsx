import { CinnyActionProvider } from "./ActionContext";
import { CinnyStateProvider } from "./StateContext";

export function CinnyProviders(props: any) {
  return (
    <CinnyActionProvider>
      <CinnyStateProvider {...props} />
    </CinnyActionProvider>
  );
}

export default CinnyProviders;
