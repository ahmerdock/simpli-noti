import { Image, TouchableOpacity, Text, View } from "react-native";
import { Linking } from "react-native";
import Card from "@/components/card";
import { settingsStyles } from "../../settings.styles";
import { IContactLinkProps } from "./contact-link.interface";

const ContactLink = (props: IContactLinkProps) => {
  const { label, sub, icon, url } = props;

  const handlePress = () => Linking.openURL(url);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card>
        <View style={settingsStyles.iconWrap}>
          <Image source={icon} style={{ width: 20, height: 20 }} />
        </View>
        <View style={settingsStyles.textWrap}>
          <Text style={settingsStyles.label}>{label}</Text>
          <Text style={settingsStyles.sub}>{sub}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ContactLink;
