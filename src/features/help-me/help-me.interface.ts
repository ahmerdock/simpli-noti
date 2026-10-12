export type HelpMeProductDetails = {
  id: string;
  displayPrice: string;
};

export type UseHelpMeReturn = {
  isAvailable: boolean;
  isProductsLoading: boolean;
  productsById: Record<string, HelpMeProductDetails | undefined>;
  purchasingProductId: string | null;
  purchase: (productId: string) => Promise<void>;
};
