import Header from "./components/Header";
import Popular from "./components/Popular";
import TryOscarLink from "./components/TryOscarLink";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="recommendations">
                <Popular />
            </div>
            <TryOscarLink/>
      </main>
    </div>
  );
}
