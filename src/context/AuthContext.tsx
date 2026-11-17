import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export interface MobileUser {
  id: string;
  name: string;
  email: string;
  role: string;
  businessName: string;
  plan: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
}

interface AuthContextType {
  user: MobileUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (googleData?: { email?: string; name?: string; idToken?: string }) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, businessName: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<MobileUser>) => void;
}

const DEFAULT_USER: MobileUser = {
  id: 'usr_neuroviax_01',
  name: 'Muzammal Nazeer',
  email: 'admin@neuroviax.ai',
  role: 'Super Admin',
  businessName: 'Neuroviax AI Labs',
  plan: 'ENTERPRISE',
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  loginWithGoogle: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => { },
  updateUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MobileUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@neuroviax_access_token');
      const storedUserData = await AsyncStorage.getItem('@neuroviax_user_profile');

      if (storedToken && storedUserData) {
        setUser(JSON.parse(storedUserData));
        setIsAuthenticated(true);
      } else {
        // Leave unauthenticated for Splash / Onboarding / Login flow
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (e) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Allow demo credentials or any valid-looking input
      const matchedUser: MobileUser = {
        ...DEFAULT_USER,
        email: email || DEFAULT_USER.email,
        name: email.split('@')[0].toUpperCase() || 'Admin User',
      };

      await AsyncStorage.setItem('@neuroviax_access_token', 'mock_jwt_token_neuroviax_2026');
      await AsyncStorage.setItem('@neuroviax_user_profile', JSON.stringify(matchedUser));

      setUser(matchedUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleData?: { email?: string; name?: string; idToken?: string }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const email = googleData?.email || 'demo@neuroviax.ai';
      const name = googleData?.name || 'Muzammal Nazeer';
      const idToken = googleData?.idToken;

      try {
        const backendRes = await api.googleLogin({
          email,
          name,
          googleId: `google_${Date.now()}`,
          idToken,
        });

        if (backendRes?.accessToken && backendRes?.user) {
          const googleUser: MobileUser = {
            id: backendRes.user._id || backendRes.user.id || `usr_google_${Date.now()}`,
            name: backendRes.user.name || name,
            email: backendRes.user.email || email,
            role: backendRes.user.isSuperAdmin ? 'Super Admin' : (backendRes.user.role || 'Super Admin'),
            businessName: backendRes.business?.name || 'Neuroviax AI Labs',
            plan: (backendRes.business?.subscriptionPlan?.toUpperCase() || 'ENTERPRISE') as any,
          };

          await AsyncStorage.setItem('@neuroviax_access_token', backendRes.accessToken);
          await AsyncStorage.setItem('@neuroviax_user_profile', JSON.stringify(googleUser));

          setUser(googleUser);
          setIsAuthenticated(true);
          return { success: true };
        }
      } catch (backendErr: any) {
        console.warn('[loginWithGoogle] Backend note:', backendErr.message);
      }

      // Offline / fallback session
      const fallbackUser: MobileUser = {
        id: `usr_google_${Date.now()}`,
        name,
        email,
        role: 'Super Admin',
        businessName: 'Neuroviax AI Labs',
        plan: 'ENTERPRISE',
      };

      await AsyncStorage.setItem('@neuroviax_access_token', 'mock_jwt_token_google_sso_2026');
      await AsyncStorage.setItem('@neuroviax_user_profile', JSON.stringify(fallbackUser));

      setUser(fallbackUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Google SSO authentication failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, businessName: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const newUser: MobileUser = {
        id: `usr_${Date.now()}`,
        name,
        email,
        role: 'Business Owner',
        businessName,
        plan: 'STARTER',
      };

      await AsyncStorage.setItem('@neuroviax_access_token', 'mock_jwt_token_neuroviax_2026');
      await AsyncStorage.setItem('@neuroviax_user_profile', JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@neuroviax_access_token');
      await AsyncStorage.removeItem('@neuroviax_user_profile');
    } catch (e) {
      // ignore
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<MobileUser>) => {
    if (!user) return;
    const updated = { ...user, ...userData };
    setUser(updated);
    AsyncStorage.setItem('@neuroviax_user_profile', JSON.stringify(updated)).catch(() => { });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
