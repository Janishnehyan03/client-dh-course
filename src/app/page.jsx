import Courses from "./components/Courses";

export default function Home() {
  return (
    <main className="flex lg:min-h-screen lg:flex-col items-center justify-between lg:p-24">
      <Courses />
    </main>
  );
}
