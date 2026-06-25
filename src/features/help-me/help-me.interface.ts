export type HelpMeProductDetails = {
  id: string;
  displayPrice: string;
};

export type UseHelpMeReturn = {
  isAvailable: boolean;
  isProductsLoading: boolean;
  productsById: Record<string, HelpMeProductDetails | undefined>;
  purchasingProductId: string | null;
  error: string | null;
  successProductId: string | null;
  purchase: (productId: string) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
};
