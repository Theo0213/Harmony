import Login from "@components/login";
import Map from "@components/map";
import Redirect from "@components/redirect";
import { useMainStore } from "../src/store/store";

export default function Home() {

  const user = useMainStore((state) => state.user);
  const track = useMainStore((state) => state.track);
  
  return (
    <>
      <Login />
      {user?.id && track?.songId && <Map />}
      {!track?.songId &&<Redirect/>}
    </>
  );
}
