export type IHelpMeProductDetails = {
  id: string;
  displayPrice: string;
};

export type IUseHelpMeReturn = {
  isAvailable: boolean;
  isProductsLoading: boolean;
  productsById: Record<string, IHelpMeProductDetails | undefined>;
  purchasingProductId: string | null;
  purchase: (productId: string) => Promise<void>;
};
