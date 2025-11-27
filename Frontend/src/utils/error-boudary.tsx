import { AlertCircle } from "lucide-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-6 border rounded-lg bg-red-50 text-red-700">
          <h2 className="font-semibold text-xl"><AlertCircle size={16} /> Une erreur est survenue</h2>
          <p className="mt-2">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
