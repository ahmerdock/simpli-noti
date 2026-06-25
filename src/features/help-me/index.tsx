import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Toast } from "toastify-react-native";
import { PAGE_TITLES } from "@/constants/routes";
import ShortHeading from "@/components/short-heading";
import ActionCard, { actionCardStyles } from "@/components/action-card";
import { ParentLayout } from "@/layouts";
import { HELP_ME_PRODUCTS } from "./help-me.data";
import { helpMeStyles } from "./help-me.styles";
import useHelpMe from "./use-help-me";

const HelpMe = () => {
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
    Toast.success(tier?.successMessage ?? "Thank you for your support!");
    clearSuccess();
  }, [successProductId, clearSuccess]);

  useEffect(() => {
    if (!error) {
      return;
    }

    Toast.error(error);
    clearError();
  }, [error, clearError]);

  return (
    <ParentLayout titleProps={{ title: PAGE_TITLES.HELP_ME }}>
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
    </ParentLayout>
  );
};

export default HelpMe;
