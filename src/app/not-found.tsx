import NavBar from "@/components/layout/NavBar";

function notFound() {
  return (
    <div className={` bg-bgLight relative `}>
      <NavBar />
      <main className="md:min-h-[calc(100vh-104px)] min-h-[calc(100vh-80px)] grid font-playfair antialiased">
        Not found
      </main>
    </div>
  );
}

export default notFound;
