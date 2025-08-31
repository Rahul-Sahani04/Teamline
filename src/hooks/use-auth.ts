import { useMutation, useQuery } from '@apollo/client/react';
import { useCallback, useEffect } from 'react';
import { LOGIN_MUTATION, VERIFY_TOKEN, LoginInput, LoginResponse } from '@/lib/graphql/auth';
import { useRouter } from 'next/navigation';

interface VerifyTokenResponse {
  verifyToken: {
    id: string;
    username: string;
    email: string;
    teamId: string;
  };
}

export function useAuth() {
  const router = useRouter();

  const [loginMutation, { loading: isLoggingIn }] = useMutation<
    { login: LoginResponse },
    LoginInput
  >(LOGIN_MUTATION);

  const { data: userData, loading: isVerifying } = useQuery<VerifyTokenResponse>(VERIFY_TOKEN);

  useEffect(() => {
    if (userData && !userData.verifyToken) {
      localStorage.removeItem('auth_token');
      router.push('/login');
    }
  }, [userData, router]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password
        }
      });

      if (data?.login.token) {
        localStorage.setItem('auth_token', data.login.token);
        router.push('/chat');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, [loginMutation, router]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  }, [router]);

  const getToken = useCallback(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  }, []);

  // Verify token on mount
  useEffect(() => {
    const token = getToken();
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    
    if (!token && currentPath !== '/login') {
      router.push('/login');
    }
  }, [getToken, router]);

  return {
    user: userData?.verifyToken,
    isLoggingIn,
    isVerifying,
    login,
    logout,
    getToken,
  };
}