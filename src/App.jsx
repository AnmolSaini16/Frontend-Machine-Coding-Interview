import { SnackBarProvider } from "./components/snackbar/SnackbarProvider";
import Demo from "./Demo";

export default function App() {
  return (
    <SnackBarProvider maxSnack={3}>
      <Demo />
    </SnackBarProvider>
  );
}
