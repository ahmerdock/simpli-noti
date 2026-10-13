import { AppState } from "react-native";
import { renderHook } from "@testing-library/react-native";
import { NotificationService } from "@/services";
import { useNotificationStore } from "@/store";
import useNotificationSync from "./use-notification-sync";

jest.mock("@/services", () => ({
  NotificationService: {
    ensureReady: jest.fn(),
    reconcile: jest.fn(),
  },
}));
jest.mock("@/store", () => ({
  useNotificationStore: {
    getState: jest.fn(),
    persist: { hasHydrated: jest.fn(), onFinishHydration: jest.fn() },
  },
}));

const mockService = NotificationService as unknown as {
  ensureReady: jest.Mock;
  reconcile: jest.Mock;
};
const mockStore = useNotificationStore as unknown as {
  getState: jest.Mock;
  persist: { hasHydrated: jest.Mock; onFinishHydration: jest.Mock };
};

const expireNotification = jest.fn();
let notifications: unknown[];
let appStateHandler: (state: string) => void;
let finishHydration: () => void;
const removeAppState = jest.fn();
const removeHydration = jest.fn();

const flush = () => new Promise((resolve) => setImmediate(resolve));

// Each reconcile call returns a promise the test settles by hand.
let pending: (() => void)[];

beforeEach(() => {
  jest.clearAllMocks();
  notifications = [{ id: "a" }];
  pending = [];
  mockStore.getState.mockImplementation(() => ({
    notifications,
    expireNotification,
  }));
  mockStore.persist.hasHydrated.mockReturnValue(true);
  mockStore.persist.onFinishHydration.mockImplementation((fn: () => void) => {
    finishHydration = fn;
    return removeHydration;
  });
  mockService.ensureReady.mockResolvedValue(true);
  mockService.reconcile.mockImplementation(
    () => new Promise<void>((resolve) => pending.push(resolve)),
  );
  jest
    .spyOn(AppState, "addEventListener")
    .mockImplementation((_type, handler) => {
      appStateHandler = handler as (state: string) => void;
      return { remove: removeAppState } as never;
    });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const settleAll = async () => {
  while (pending.length > 0) {
    pending.shift()?.();
    await flush();
  }
};

describe("useNotificationSync", () => {
  it("re-syncs once at start when the store is already loaded", async () => {
    await renderHook(useNotificationSync);
    await flush();

    expect(mockService.reconcile).toHaveBeenCalledTimes(1);
    expect(mockService.reconcile).toHaveBeenCalledWith(
      notifications,
      expireNotification,
    );
    await settleAll();
  });

  it("waits for the store to load before re-syncing, so an empty list never cancels alarms", async () => {
    mockStore.persist.hasHydrated.mockReturnValue(false);
    await renderHook(useNotificationSync);
    await flush();

    expect(mockService.ensureReady).toHaveBeenCalled();
    expect(mockService.reconcile).not.toHaveBeenCalled();

    appStateHandler("active");
    expect(mockService.reconcile).not.toHaveBeenCalled();

    finishHydration();
    expect(mockService.reconcile).toHaveBeenCalledTimes(1);
    await settleAll();
  });

  it("re-syncs again after the permission step and on every return to the foreground", async () => {
    await renderHook(useNotificationSync);
    await flush();
    await settleAll();
    expect(mockService.reconcile).toHaveBeenCalledTimes(2);

    appStateHandler("background");
    expect(mockService.reconcile).toHaveBeenCalledTimes(2);

    appStateHandler("active");
    expect(mockService.reconcile).toHaveBeenCalledTimes(3);
    await settleAll();
  });

  it("never runs two re-syncs at once and queues exactly one more", async () => {
    mockService.ensureReady.mockReturnValue(new Promise(() => undefined));
    await renderHook(useNotificationSync);
    await flush();
    expect(mockService.reconcile).toHaveBeenCalledTimes(1);

    appStateHandler("active");
    appStateHandler("active");
    expect(mockService.reconcile).toHaveBeenCalledTimes(1);

    pending.shift()?.();
    await flush();
    expect(mockService.reconcile).toHaveBeenCalledTimes(2);
    await settleAll();
    expect(mockService.reconcile).toHaveBeenCalledTimes(2);
  });

  it("re-syncs again from fresh data when the store changed during a run", async () => {
    mockService.ensureReady.mockReturnValue(new Promise(() => undefined));
    await renderHook(useNotificationSync);
    await flush();
    const first = mockService.reconcile.mock.calls[0][0];

    notifications = [];
    pending.shift()?.();
    await flush();

    expect(mockService.reconcile).toHaveBeenCalledTimes(2);
    expect(mockService.reconcile.mock.calls[1][0]).toEqual([]);
    expect(mockService.reconcile.mock.calls[1][0]).not.toBe(first);
    await settleAll();
  });

  it("keeps going after a failed re-sync", async () => {
    mockService.ensureReady.mockReturnValue(new Promise(() => undefined));
    mockService.reconcile.mockRejectedValueOnce(new Error("native"));
    await renderHook(useNotificationSync);
    await flush();

    appStateHandler("active");
    expect(mockService.reconcile).toHaveBeenCalledTimes(2);
    await settleAll();
  });

  it("stops listening and does not queue more work after unmount", async () => {
    mockStore.persist.hasHydrated.mockReturnValue(false);
    const { unmount } = await renderHook(useNotificationSync);
    await flush();

    await unmount();

    expect(removeAppState).toHaveBeenCalledTimes(1);
    expect(removeHydration).toHaveBeenCalledTimes(1);
  });

  it("does not queue a rerun once unmounted mid-run", async () => {
    mockService.ensureReady.mockReturnValue(new Promise(() => undefined));
    const { unmount } = await renderHook(useNotificationSync);
    await flush();

    appStateHandler("active");
    await unmount();
    pending.shift()?.();
    await flush();

    expect(mockService.reconcile).toHaveBeenCalledTimes(1);
  });
});
