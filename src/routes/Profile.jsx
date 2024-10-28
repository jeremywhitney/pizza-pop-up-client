import { OrderHistory } from "../components/profile/OrderHistory";
import { PaymentMethods } from "../components/profile/PaymentMethods";
import { UserInformation } from "../components/profile/UserInformation";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="space-y-8">
        <UserInformation />
        <PaymentMethods />
        <OrderHistory />
      </div>
    </div>
  );
};

export default Profile;
