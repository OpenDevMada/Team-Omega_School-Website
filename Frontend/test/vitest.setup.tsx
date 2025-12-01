import "vitest";

import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { Portal } from "@radix-ui/react-portal";

// @ts-expect-error
Portal.defaultProps = {
  container: document.body,
}

vi.mock('@radix-ui/react-dialog', async () => {
  const actual = await vi.importActual<any>('@radix-ui/react-dialog');
  return {
    ...actual,
    Root: ({ children }: any) => <div>{children}</div>,
    Portal: ({ children }: any) => <div>{children}</div>,
    Content: ({ children }: any) => <div role="dialog">{children}</div>,
  };
});

vi.mock('@radix-ui/react-alert-dialog', async () => {
  const actual = await vi.importActual<any>('@radix-ui/react-alert-dialog');
  return {
    ...actual,
    Root: ({ children }: any) => <div>{children}</div>,
    Portal: ({ children }: any) => <div>{children}</div>,
    Content: ({ children }: any) => <div role="alert-dialog">{children}</div>,
  };
});

vi.mock("@radix-ui/react-alert-dialog", async () => {
  const React = await import("react")

  const MockComponent =
    (name: string) =>
      ({ children, ...props }: any) =>
        React.createElement("div", { "data-testid": name, ...props }, children)

  return {
    Root: MockComponent("AlertDialogRoot"),
    Trigger: MockComponent("AlertDialogTrigger"),
    Content: MockComponent("AlertDialogContent"),
    Action: MockComponent("AlertDialogAction"),
    Cancel: MockComponent("AlertDialogCancel"),
    Portal: ({ children }: any) =>
      React.createElement("div", { "data-testid": "AlertDialogPortal" }, children),
    Overlay: MockComponent("AlertDialogOverlay"),
    Title: MockComponent("AlertDialogTitle"),
    Description: MockComponent("AlertDialogDescription"),
  }
})
