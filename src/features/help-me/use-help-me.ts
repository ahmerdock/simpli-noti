import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  getAvailablePurchases as getAvailablePurchasesDirect,
  ErrorCode,
  useIAP,
} from "expo-iap";
import type { Purchase } from "expo-iap";
import Toast from "react-native-toast-message";
import {
  HELP_ME_PRODUCTS,
  HELP_ME_SKU_SET,
  HELP_ME_SKUS,
} from "./help-me.data";
import type {
  HelpMeProductDetails,
  UseHelpMeReturn,
} from "./help-me.interface";

const isHelpMeProductId = (productId: string): boolean =>
  HELP_ME_SKU_SET.has(productId);

const showSuccess = (productId: string) => {
  const tier = HELP_ME_PRODUCTS.find((product) => product.id === productId);
  Toast.show({
    type: "success",
    text1: tier?.successMessage ?? "Thank you for your support!",
  });
};

const showError = (message: string) => {
  Toast.show({ type: "error", text1: message });
};

const isUserCancelledError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "code" in error) {
    return (error as { code?: string }).code === ErrorCode.UserCancelled;
  }

  return false;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string"
      ? message
      : "An unexpected error occurred";
  }

  return "An unexpected error occurred";
};

export default function useHelpMe(): UseHelpMeReturn {
  const isAvailable = Platform.OS === "android";

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [purchasingProductId, setPurchasingProductId] = useState<string | null>(
    null,
  );

  const purchasingProductIdRef = useRef<string | null>(null);
  const hasConsumedPendingRef = useRef(false);

  const setPurchasingProductIdState = useCallback(
    (productId: string | null) => {
      purchasingProductIdRef.current = productId;
      setPurchasingProductId(productId);
    },
    [],
  );

  const handlePurchaseError = useCallback(
    (purchaseError: unknown) => {
      if (!isUserCancelledError(purchaseError)) {
        showError(getErrorMessage(purchaseError));
      }
      setPurchasingProductIdState(null);
    },
    [setPurchasingProductIdState],
  );

  const {
    connected,
    products,
    fetchProducts,
    requestPurchase,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: async (purchase: Purchase) => {
      if (!isHelpMeProductId(purchase.productId)) {
        return;
      }

      try {
        await finishTransaction({ purchase, isConsumable: true });
        showSuccess(purchase.productId);
      } catch (finishError) {
        showError(
          finishError instanceof Error
            ? finishError.message
            : "Failed to complete purchase",
        );
      } finally {
        setPurchasingProductIdState(null);
      }
    },
    onPurchaseError: handlePurchaseError,
  });

  const productsById = useMemo(() => {
    if (!isAvailable) {
      return {};
    }

    return products.reduce<Record<string, HelpMeProductDetails>>(
      (acc, product) => {
        if (!isHelpMeProductId(product.id)) {
          return acc;
        }

        acc[product.id] = {
          id: product.id,
          displayPrice: product.displayPrice,
        };
        return acc;
      },
      {},
    );
  }, [isAvailable, products]);

  const consumePendingPurchases = useCallback(async () => {
    if (!isAvailable || hasConsumedPendingRef.current) {
      return;
    }

    hasConsumedPendingRef.current = true;

    try {
      const pendingPurchases = await getAvailablePurchasesDirect();

      for (const purchase of pendingPurchases) {
        if (!isHelpMeProductId(purchase.productId)) {
          continue;
        }

        try {
          await finishTransaction({ purchase, isConsumable: true });
        } catch (pendingError) {
          console.warn(
            "[useHelpMe] Failed to consume pending purchase:",
            pendingError,
          );
        }
      }
    } catch (pendingError) {
      console.warn(
        "[useHelpMe] Failed to fetch pending purchases:",
        pendingError,
      );
    }
  }, [finishTransaction, isAvailable]);

  useEffect(() => {
    if (!isAvailable || !connected) {
      return;
    }

    let cancelled = false;

    const loadProducts = async () => {
      setIsProductsLoading(true);

      try {
        await fetchProducts({ skus: HELP_ME_SKUS, type: "in-app" });
        if (!cancelled) {
          await consumePendingPurchases();
        }
      } catch (loadError) {
        if (!cancelled) {
          showError(getErrorMessage(loadError));
        }
      } finally {
        if (!cancelled) {
          setIsProductsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [connected, consumePendingPurchases, fetchProducts, isAvailable]);

  const purchase = useCallback(
    async (productId: string) => {
      if (!isAvailable) {
        return;
      }

      if (!connected || isProductsLoading || purchasingProductIdRef.current) {
        return;
      }

      if (!productsById[productId]) {
        return;
      }

      setPurchasingProductIdState(productId);

      try {
        await requestPurchase({
          request: {
            apple: { sku: productId },
            google: { skus: [productId] },
          },
          type: "in-app",
        });
      } catch (purchaseError) {
        handlePurchaseError(purchaseError);
      }
    },
    [
      connected,
      isAvailable,
      isProductsLoading,
      productsById,
      requestPurchase,
      setPurchasingProductIdState,
      handlePurchaseError,
    ],
  );

  return {
    isAvailable,
    isProductsLoading: isAvailable ? isProductsLoading : false,
    productsById: isAvailable ? productsById : {},
    purchasingProductId: isAvailable ? purchasingProductId : null,
    purchase,
  };
}
