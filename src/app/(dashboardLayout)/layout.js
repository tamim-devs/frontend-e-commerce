import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 bg-[#fffaf0] p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;