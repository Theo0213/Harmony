import { useEffect, useState } from "react";

import { UserPlayerTrack } from "@types";
import dynamic from "next/dynamic";
import { selectUsers } from "@utils";
import { useMainStore } from "../../src/store/store";
import { useSocket } from "@components/providers/socket-provider";

const MapComponent = dynamic(() => import("@components/map/map"), {
  ssr: false,
});

const Map = () => {
  const { socket } = useSocket();
  const [users, setUsers] = useState<UserPlayerTrack[]>([]);
  const user = useMainStore((state) => state.user);

  useEffect(() => {
    if (!socket) return;

    const handleWorldUpdate = (...args: UserPlayerTrack[]) => {
      if (users && args) {
        // Créer un nouveau tableau avec la référence modifiée
        let listeSocketUser = [...args];
        const listUsers = users.map((user) => {
          const updatedUser = args.find(
            (updatedElement) => updatedElement.id === user.id
          );
          if (updatedUser) {
            const indexRemove = listeSocketUser.indexOf(updatedUser);
            listeSocketUser.splice(indexRemove, 1);
            return updatedUser;
          } else {
            return user;
          }
        });
        if (listeSocketUser.length > 0) {
          listeSocketUser.map((newUser) => {
            if (newUser.id != user.id) listUsers.push(newUser);
          });
        }
        setUsers(listUsers);
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
        if (user?.id) {
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
};
export default Map;
