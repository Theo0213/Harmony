import { useEffect, useState } from "react";

import { UserPlayerTrack } from "@types";
import dynamic from "next/dynamic";
import { selectUsers } from "../../pages/utils";
import { useMainStore } from "../../src/store/store";
import { useSocket } from "@components/providers/socket-provider";

const MapComponent = dynamic(() => import("@components/map/map"), { ssr: false });

const Map = () => {
  const { socket } = useSocket();
  const [users, setUsers] = useState<UserPlayerTrack[]>([]);
  const user = useMainStore((state) => state.user);

  useEffect(() => {
    if (!socket) return;

    const handleWorldUpdate = (...args: UserPlayerTrack[]) => {
      if (users && args) {
        // Créer un nouveau tableau avec la référence modifiée
        const updatedUsers = users.map((user) => {
          const updatedUser = args.find(
            (updatedElement) => updatedElement.id === user.id
          );

          if (updatedUser) {
            return updatedUser;
          } else {
            return user;
          }
        });

        // todo
        // add new user to users si updatedElement.id not in users.id

        setUsers(updatedUsers);
      }
    };

    socket.on("world", handleWorldUpdate);
    return () => {
      socket.off("world");
    };
  }, [socket, users]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (user) {
          const userList = await selectUsers(user);
          setUsers(userList);
        }
      } catch (error) {
        console.error("Erreur lors du select de l'utilisateur : ", error);
      }
    };
    getUsers();
  }, []);

  return <MapComponent users={users} />;
}
export default Map;
