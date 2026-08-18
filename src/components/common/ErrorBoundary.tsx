import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Compass, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Kovai Compass Holidays app:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071B33] text-white flex items-center justify-center p-4 font-sans selection:bg-[#BF953F] selection:text-[#071B33]">
          <div className="max-w-md w-full bg-[#0B2545] border border-[#BF953F]/30 rounded-3xl p-8 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-[#BF953F]/20 border border-[#BF953F]/40 rounded-2xl mx-auto flex items-center justify-center text-[#BF953F]">
              <Compass className="w-9 h-9 animate-spin-slow" />
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-2xl font-bold text-white">Kovai Compass Holidays</h1>
              <p className="text-sm text-slate-300">
                We encountered a temporary display issue while loading this page.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-left text-xs text-red-200 font-mono overflow-auto max-h-28">
                <div className="flex items-center gap-1 text-red-400 font-bold mb-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Notice</span>
                </div>
                {this.state.error.message || 'Unknown runtime error'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-gradient-to-r from-[#BF953F] via-[#DFBA5A] to-[#B38728] text-[#071B33] font-bold text-sm py-3 px-5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Site</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm py-3 px-5 rounded-xl transition-colors cursor-pointer"
              >
                Go to Home
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Direct Travel Assistance: +91 98430 00000 / support@kovaicompassholidays.com
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
