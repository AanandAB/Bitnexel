import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleCallback } from '../utils/salesforce';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(searchParams.get('error_description') || 'Authorization failed');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code received');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      try {
        await handleCallback(code);
        setStatus('success');
        setTimeout(() => navigate('/#demo'), 2000);
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Failed to authenticate');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-default">
      <div className="text-center max-w-md px-4">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-h2 font-semibold text-text-primary mb-2">Authenticating...</h2>
            <p className="text-body text-text-secondary">
              Please wait while we connect to Salesforce.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 rounded-full bg-semantic-success/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-semantic-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-h2 font-semibold text-text-primary mb-2">Authentication Successful!</h2>
            <p className="text-body text-text-secondary">
              Redirecting you back to the form...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 rounded-full bg-semantic-error/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-semantic-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-h2 font-semibold text-text-primary mb-2">Authentication Failed</h2>
            <p className="text-body text-text-secondary mb-4">
              {errorMessage}
            </p>
            <p className="text-small text-text-secondary">
              Redirecting to homepage...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
