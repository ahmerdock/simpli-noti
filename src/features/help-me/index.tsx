import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import Toast from "react-native-toast-message";
import { PAGE_TITLES } from "@/constants/routes";
import { ActionCard, actionCardStyles, ShortHeading } from "@/components";
import { TabsLayout } from "@/layouts";
import { HELP_ME_PRODUCTS } from "./help-me.data";
import { helpMeStyles } from "./help-me.styles";
import useHelpMe from "./use-help-me";

export default function HelpMe() {
  const {
    isAvailable,
    isProductsLoading,
    productsById,
    purchasingProductId,
    purchase,
    error,
    successProductId,
    clearError,
    clearSuccess,
  } = useHelpMe();

  useEffect(() => {
    if (!successProductId) {
      return;
    }

    const tier = HELP_ME_PRODUCTS.find(
      (product) => product.id === successProductId,
    );
    Toast.show({
      type: "success",
      text1: tier?.successMessage ?? "Thank you for your support!",
    });
    clearSuccess();
  }, [successProductId, clearSuccess]);

  useEffect(() => {
    if (!error) {
      return;
    }

    Toast.show({
      type: "error",
      text1: error,
    });
    clearError();
  }, [error, clearError]);

  return (
    <TabsLayout titleProps={{ title: PAGE_TITLES.HELP_ME }}>
      <ShortHeading heading="SUPPORT THE APP" />

      {!isAvailable && (
        <Text style={helpMeStyles.unavailable}>
          In-app tips are available on Android.
        </Text>
      )}

      {HELP_ME_PRODUCTS.map((tier) => {
        const isPurchasing = purchasingProductId === tier.id;
        const displayPrice = productsById[tier.id]?.displayPrice;

        return (
          <ActionCard
            key={tier.id}
            label={tier.label}
            description={tier.description}
            icon={tier.icon}
            disabled={
              !isAvailable ||
              isProductsLoading ||
              !productsById[tier.id] ||
              isPurchasing
            }
            onPress={() => purchase(tier.id)}
            trailing={
              isPurchasing ? (
                <ActivityIndicator size="small" />
              ) : displayPrice ? (
                <Text style={actionCardStyles.trailingText}>
                  {displayPrice}
                </Text>
              ) : null
            }
          />
        );
      })}
    </TabsLayout>
  );
}
