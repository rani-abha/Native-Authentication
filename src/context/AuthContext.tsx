import { useRouter, useSegments } from 'expo-router';
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  authToken: string | null;
  savedEmail: string | null;
  updateAuthToken: (newToken: string) => Promise<void>;
  removeAuthToken: () => Promise<void>;
  saveEmail: (email: string) => Promise<void>;
  clearSavedEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] === '(auth)';

    if (!authToken && !isAuthGroup) {
      router.replace('/signIn');
    }
    if (authToken && isAuthGroup) {
      router.replace('/');
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync('authToken');
      const email = await SecureStore.getItemAsync('savedEmail');

      if (res) {
        setAuthToken(res);
      }
      if (email) setSavedEmail(email);
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setAuthToken(null);
  };

  const saveEmail = async (email: string) => {
    await SecureStore.setItemAsync('savedEmail', email);
    setSavedEmail(email);
  };

  const clearSavedEmail = async () => {
    await SecureStore.deleteItemAsync('savedEmail');
    setSavedEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken,savedEmail, updateAuthToken, removeAuthToken,saveEmail,
        clearSavedEmail, }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = ():AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};