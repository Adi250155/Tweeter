
import Sidebar from "../../components/common/Sidebar";

function HomePage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="min-w-0 flex-1 border-r border-base-content/20">
        <header className="border-b border-base-content/20 p-4">
          <h1 className="text-xl font-bold">Home</h1>
        </header>

        <div className="p-4">
          <p className="text-base-content/70">
            Welcome to your X clone!
          </p>
        </div>
      </main>

      <aside className="hidden w-80 p-4 lg:block">
        <div className="rounded-2xl bg-base-200 p-4">
          <h2 className="text-lg font-bold">What's happening</h2>
          <p className="mt-2 text-sm text-base-content/70">
            Trends will appear here.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default HomePage;
