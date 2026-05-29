import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";

const Home = () => {
  return (
    <ParentLayout titleProps={{ title: "Home" }}>
      <ErrorAndNoData
        message="No notifications yet"
        description="Tap + to add your first one"
      />
    </ParentLayout>
  );
};

export default Home;
