import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import UserButton from "@/components/common/UserButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavBar() {
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">Resume-Craft</span>
        </Link>
        <div className="flex items-centre gap-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
