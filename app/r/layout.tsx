import { Navbar } from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:px-6">
      <Navbar/>
      {children}
    </div>
  );
}
