import { useAuth } from "../../hooks/useAuth";

export const EmployeeProfile = () => {
  const { data: auth } = useAuth();
  const profile = auth?.user?.profile;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderField = (label, field, value) => (
    <div
      key={field}
      className="flex justify-between items-center py-3 border-b"
    >
      <span className="font-medium text-gray-700">{label}</span>
      <span>{value}</span>
    </div>
  );

  // Define fields array for better maintenance
  const fields = [
    { label: "Position", field: "position", value: profile.position },
    { label: "Rate", field: "rate", value: formatCurrency(profile.rate) },
    { label: "Hire Date", field: "hire_date", value: profile.date_joined },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee Profile</h2>
      </div>
      <div className="space-y-1">
        {fields.map(({ label, field, value }) =>
          renderField(label, field, value)
        )}
      </div>
    </section>
  );
};
