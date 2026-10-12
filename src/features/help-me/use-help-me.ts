import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform } from "react-native";
import {
  getAvailablePurchases as getAvailablePurchasesDirect,
  ErrorCode,
  useIAP,
} from "expo-iap";
import type { Purchase } from "expo-iap";
import { HELP_ME_PRODUCT_IDS } from "./help-me.data";
import type {
  HelpMeProductDetails,
  UseHelpMeReturn,
} from "./help-me.interface";

const HELP_ME_SKUS = Object.values(HELP_ME_PRODUCT_IDS);
const HELP_ME_SKU_SET = new Set<string>(HELP_ME_SKUS);

const isHelpMeProductId = (productId: string): boolean =>
  HELP_ME_SKU_SET.has(productId);

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
  const [error, setError] = useState<string | null>(null);
  const [successProductId, setSuccessProductId] = useState<string | null>(null);

  const purchasingProductIdRef = useRef<string | null>(null);
  const hasConsumedPendingRef = useRef(false);

  const setPurchasingProductIdState = useCallback(
    (productId: string | null) => {
      purchasingProductIdRef.current = productId;
      setPurchasingProductId(productId);
    },
    [],
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
        setSuccessProductId(purchase.productId);
        setError(null);
      } catch (finishError) {
        setError(
          finishError instanceof Error
            ? finishError.message
            : "Failed to complete purchase",
        );
      } finally {
        setPurchasingProductIdState(null);
      }
    },
    onPurchaseError: (purchaseError) => {
      if (isUserCancelledError(purchaseError)) {
        setPurchasingProductIdState(null);
        return;
      }

      setError(getErrorMessage(purchaseError));
      setPurchasingProductIdState(null);
    },
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
          setError(getErrorMessage(loadError));
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
      setError(null);
      setSuccessProductId(null);

      try {
        await requestPurchase({
          request: {
            apple: { sku: productId },
            google: { skus: [productId] },
          },
          type: "in-app",
        });
      } catch (purchaseError) {
        if (isUserCancelledError(purchaseError)) {
          setPurchasingProductIdState(null);
          return;
        }

        setError(getErrorMessage(purchaseError));
        setPurchasingProductIdState(null);
      }
    },
    [
      connected,
      isAvailable,
      isProductsLoading,
      productsById,
      requestPurchase,
      setPurchasingProductIdState,
    ],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessProductId(null);
  }, []);

  return {
    isAvailable,
    isProductsLoading: isAvailable ? isProductsLoading : false,
    productsById: isAvailable ? productsById : {},
    purchasingProductId: isAvailable ? purchasingProductId : null,
    error: isAvailable ? error : null,
    successProductId: isAvailable ? successProductId : null,
    purchase,
    clearError,
    clearSuccess,
  };
}
