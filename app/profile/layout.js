import Sidebar from "../components/sidebar";

export default function UserLayout({ children }) {
  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-width px-5">
          <h1 className="text-bold text-2xl">User Dashboard</h1>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-width px-5">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="border border-lightgray bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                {children}
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
