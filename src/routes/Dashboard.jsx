import OrdersPanel from "../components/employee/OrdersPanel";
import MenuManagementPanel from "../components/employee/MenuManagementPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Employee Dashboard
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <OrdersPanel />
          </div>
          <div className="lg:w-1/2">
            <MenuManagementPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
