import { getAccount, selectUser } from "@utils";
import { signIn, useSession } from "next-auth/react";

import { toast } from 'sonner'
import { useEffect } from "react";
import { useMainStore } from "../src/store/store";

export default function Login() {
  const token = useMainStore((state) => state.token);
  const userStore = useMainStore((state) => state.user);
  const setStoreUser = useMainStore((state) => state.setUser);
  const setStoreToken = useMainStore((state) => state.setToken);
  const { data, status } = useSession();

  useEffect(() => {
    const account = async () => {
      if (data?.user && !userStore?.id) {
        try {
          await getAccount(data).then((res) => {
            setStoreToken({tokenId : res?.access_token});
            const getUser = async (userId) => {
                try {
                  await selectUser(userId).then((value) => {
                    toast.success(`Hello ${value?.name}`)
                    setStoreUser({
                      id: value?.id,
                      pseudo: value?.name,
                      email: value?.email,
                      latitude: value?.latitude,
                      longitude: value?.longitude,
                    });
                  });
                } catch (error) {
                  console.error("Erreur lors de la récupération du compte : ", error);
                }
            };
            getUser(res.userId);            
          });
        } catch (error) {
          console.error("Erreur lors da récupération du compte : ", error);
        }
      }
    };
    account();
  }, [data]);
  
  useEffect(() => {
    if (status === "unauthenticated" || token?.expired) {
      if (token?.expired) toast.loading(`Reconnect...`)
      handleSignIn();
      setStoreToken({...token, expired:false})
    }
  }, [status, token?.expired]);

  const handleSignIn = async () => {
    try {
      await signIn("spotify");
      
      // Gérer d'autres étapes après la connexion réussie si nécessaire
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
}
