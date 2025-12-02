import {Props} from "./props"

export const AlertDialog = ({ children }: Props) => <div>{children}</div>;

export const AlertDialogTrigger = ({ children }: Props) => (
  <button data-testid="alert-trigger">{children}</button>
);

export const AlertDialogContent = ({ children }: Props) => (
  <div data-testid="alert-content">{children}</div>
);

export const AlertDialogCancel = ({ children }: Props) => (
  <button data-testid="alert-cancel">{children}</button>
);

export const AlertDialogAction = ({ children }: Props) => (
  <button data-testid="alert-action">{children}</button>
);

export const AlertDialogTitle = ({ children }: Props) => <h2>{children}</h2>;
export const AlertDialogDescription = ({ children }: Props) => <p>{children}</p>;
export const AlertDialogHeader = ({ children }: Props) => <div>{children}</div>;
export const AlertDialogFooter = ({ children }: Props) => <div>{children}</div>;