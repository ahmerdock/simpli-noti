import { ErrorCode } from "expo-iap";
import Toast from "react-native-toast-message";
import { HELP_ME_PRODUCTS, HELP_ME_SKU_SET } from "./help-me.data";

export const isHelpMeProductId = (productId: string): boolean =>
  HELP_ME_SKU_SET.has(productId);

export const showSuccess = (productId: string) => {
  const tier = HELP_ME_PRODUCTS.find((product) => product.id === productId);
  Toast.show({
    type: "success",
    text1: tier?.successMessage ?? "Thank you for your support!",
  });
};

export const showError = (message: string) => {
  Toast.show({ type: "error", text1: message });
};

export const isUserCancelledError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "code" in error) {
    return error.code === ErrorCode.UserCancelled;
  }

  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return typeof error.message === "string"
      ? error.message
      : "An unexpected error occurred";
  }

  return "An unexpected error occurred";
};
