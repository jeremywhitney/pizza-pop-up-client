import { EmployeeProfile } from "../components/profile/EmployeeProfile";
import { OrderHistory } from "../components/profile/OrderHistory";
import { PaymentMethods } from "../components/profile/PaymentMethods";
import { UserInformation } from "../components/profile/UserInformation";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { data: auth } = useAuth();
  const isEmployee = auth?.user?.profile?.is_staff;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="space-y-8">
        <UserInformation />
        {isEmployee ? (
          <EmployeeProfile />
        ) : (
          <>
            <PaymentMethods />
            <OrderHistory />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
