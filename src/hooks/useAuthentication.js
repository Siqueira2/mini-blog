import db from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  // memory leak
  function checkIfisCancelled() {
    if (cancelled) return;
  }

  const createUser = async (data) => {
    checkIfisCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("weak-password")) {
        systemErrorMessage = "A senha deve ter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    createUser,
    error,
    loading,
    auth,
  };
};
