import { useState, useCallback } from 'react';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { API_BASE_URL } from '@/constants/config';

interface AuthResponse {
  token: string;
  nonce: string;
  user: {
    id: string;
    address: string;
  };
}

export const useAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('auth_token');
  });
  const address = useCurrentAddress();

  const getNonce = async (walletAddress: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/auth/nonce?address=${walletAddress}`);
    const data = await response.json();
    return data.nonce;
  };

  const verifySignature = async (signature: string, nonce: string, address: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        nonce,
        address,
      }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    return response.json();
  };

  const authenticate = useCallback(async () => {
    if (!address || isAuthenticating) return false;

    try {
      setIsAuthenticating(true);

      // Get nonce from server
      const nonce = await getNonce(address.toStr());

      // Request signature from wallet
      const message = `Sign this message to authenticate with Gold Miner\nNonce: ${nonce}`;
      const signature = await window.bitcoin.request({
        method: 'personal_sign',
        params: [message, address.toStr()],
      });

      // Verify signature with backend
      const authResponse = await verifySignature(signature, nonce, address.toStr());

      // Store auth token
      localStorage.setItem('auth_token', authResponse.token);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [address, isAuthenticating]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isAuthenticating,
    authenticate,
    logout,
  };
};