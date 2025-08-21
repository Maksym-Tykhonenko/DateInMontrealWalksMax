import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  type ReactNode,
  createContext,
  useCallback as useMontCallback,
  useEffect as useMontEffect,
  useMemo as useMontMemo,
  useState as useMontState,
} from 'react';

type MontUserPayload = Record<string, unknown> | null;

interface MontSessionCtx {
  clearSession: () => Promise<void>;
  saveSession: (payload: MontUserPayload) => Promise<void>;
  sessionData: MontUserPayload;
}

export const UserSessionContext = createContext<MontSessionCtx>({
  clearSession: async () => {},
  saveSession: async () => {},
  sessionData: null,
});

type MontProviderProps = { children: ReactNode };

const STORAGE_KEY = 'date_in_montreal_user_profile';

export const DateInContextMontreal: React.FC<MontProviderProps> = ({ children }) => {
  const [sessionData, setSessionData] = useMontState<MontUserPayload>(null);

  // завантаження при першому старті
  useMontEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && isMounted) {
          setSessionData(JSON.parse(raw));
        }
      } catch (err) {
        if (__DEV__) console.warn('DateInMont context load error:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // внутрішня функція для збереження
  const persist = useMontCallback(async (nextData: MontUserPayload) => {
    setSessionData(nextData);
    try {
      if (nextData) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      if (__DEV__) console.warn('DateInMont context save error:', err);
    }
  }, []);

  const saveSession = useMontCallback(
    async (payload: MontUserPayload) => {
      await persist(payload);
    },
    [persist]
  );

  const clearSession = useMontCallback(async () => {
    await persist(null);
  }, [persist]);

  const contextValue = useMontMemo(
    () => ({
      sessionData,
      saveSession,
      clearSession,
    }),
    [sessionData, saveSession, clearSession]
  );

  return (
    <UserSessionContext.Provider value={contextValue}>
      {children}
    </UserSessionContext.Provider>
  );
};
