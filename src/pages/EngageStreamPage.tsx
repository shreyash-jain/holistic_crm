// src/pages/EngageStreamPage.tsx
import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useEngageSession } from '@/hooks/useEngageSession';
import { SessionController } from '@/components/SessionController';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/errorMessage';
import { type SessionDetailsResponse } from '@/types';

export const EngageStreamPage: React.FC = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const location = useLocation();
  
  // Type assertion for location.state
  const state = location.state as { username?: string; initialSessionData?: SessionDetailsResponse } | null;
  const username = state?.username;
  const initialSessionData = state?.initialSessionData;

  if (!inviteCode || !username || !initialSessionData) {
    // If essential data is missing, redirect to join page or show error
    // This might happen if the user directly navigates to this URL without going through JoinPage
    console.warn("EngageStreamPage: Missing inviteCode, username, or initialSessionData. Redirecting.");
    return <Navigate to="/" replace />;
  }

  if (initialSessionData.invite_code !== inviteCode) {
    // Data mismatch, potentially stale state
    console.warn("EngageStreamPage: Invite code mismatch. Redirecting.");
    return <Navigate to={`/?error=session_mismatch&code=${inviteCode}`} replace />;
  }

  const sessionState = useEngageSession({ inviteCode, username, initialSessionData });

  if (sessionState.sseStatus === 'connecting' && !sessionState.sessionData?.session_id) {
    // This covers the brief moment useEngageSession is initializing before first SSE connection attempt.
    // initialSessionData should prevent this usually, but as a fallback.
    return <LoadingSpinner fullScreen text="Preparing your session..." />;
  }
  
  // If useEngageSession itself returns a critical error (e.g. bad initial props)
  // This is different from SSE connection errors handled within SessionController.
  if (sessionState.sseStatus === 'error' && !sessionState.sessionData) {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <ErrorMessage title="Initialization Error" message={sessionState.error || "Could not initialize the session."} className="max-w-lg"/>
        </div>
    );
  }

  return <SessionController sessionState={sessionState} />;
};