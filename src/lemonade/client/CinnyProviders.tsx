import { CinnyActionProvider } from "./ActionContext";
import { CinnyStateProvider } from "./StateContext";

export function CinnyProviders(props: any) {
  return (
    <CinnyStateProvider {...props}>
      <CinnyActionProvider />
    </CinnyStateProvider>
  );
}

export default CinnyProviders;
