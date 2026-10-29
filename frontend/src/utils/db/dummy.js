
import { IoSearchOutline } from "react-icons/io5";

const trends = [
  {
    category: "Technology · Trending",
    name: "#ReactJS",
    posts: "12.5K posts",
  },
  {
    category: "Trending in India",
    name: "#WebDevelopment",
    posts: "8,420 posts",
  },
  {
    category: "Technology · Trending",
    name: "Tailwind CSS",
    posts: "3,210 posts",
  },
];

const suggestions = [
  { name: "React", username: "@reactjs" },
  { name: "Vite", username: "@vite_js" },
  { name: "Tailwind CSS", username: "@tailwindcss" },
];

function RightPanel() {
  return (
    <aside className="hidden w-80 shrink-0 p-4 xl:block">
      <label className="input flex w-full items-center gap-2 rounded-full">
        <IoSearchOutline className="h-5 w-5 opacity-60" />
        <input type="search" placeholder="Search" />
      </label>

      <section className="mt-4 overflow-hidden rounded-2xl border border-base-content/15">
        <h2 className="p-4 text-xl font-bold">What's happening</h2>

        {trends.map((trend) => (
          <div
            key={trend.name}
            className="cursor-pointer p-4 hover:bg-base-content/5"
          >
            <p className="text-xs text-base-content/60">
              {trend.category}
            </p>
            <p className="font-bold">{trend.name}</p>
            <p className="text-xs text-base-content/60">
              {trend.posts}
            </p>
          </div>
        ))}

        <button className="w-full p-4 text-left text-primary hover:bg-base-content/5">
          Show more
        </button>
      </section>

      <section className="mt-4 overflow-hidden rounded-2xl border border-base-content/15">
        <h2 className="p-4 text-xl font-bold">Who to follow</h2>

        {suggestions.map((account) => (
          <div
            key={account.username}
            className="flex items-center justify-between gap-2 p-4 hover:bg-base-content/5"
          >
            <div className="min-w-0">
              <p className="truncate font-bold">{account.name}</p>
              <p className="truncate text-sm text-base-content/60">
                {account.username}
              </p>
            </div>

            <button className="btn btn-sm rounded-full bg-base-content text-base-100">
              Follow
            </button>
          </div>
        ))}
      </section>
    </aside>
  );
}

export default RightPanel;
