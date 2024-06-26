"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CircleUser, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Home } from "lucide-react";

const subjects: { id: number; link: string; name: string; linkName: string }[] =
  [
    { id: 1, link: "/thu-vien/toan", name: "Toán", linkName: "toan" },
    { id: 2, link: "/thu-vien/ly", name: "Lý", linkName: "ly" },
    { id: 3, link: "/thu-vien/hoa", name: "Hóa", linkName: "hoa" },
    { id: 4, link: "/thu-vien/tin", name: "Tin", linkName: "tin" },
    { id: 5, link: "/thu-vien/anh", name: "Anh", linkName: "anh" },
    { id: 6, link: "/thu-vien/van", name: "Văn", linkName: "van" },
    { id: 7, link: "/thu-vien/su", name: "Sử", linkName: "su" },
    { id: 8, link: "/thu-vien/dia", name: "Địa", linkName: "dia" },
    { id: 9, link: "/thu-vien/sinh", name: "Sinh", linkName: "sinh" },
  ];

const navItems: { id: number; link: string; name: string; linkName: string }[] =
  [
    {
      id: 1,
      link: "/dashboard",
      name: "Trang chính",
      linkName: "dashboard",
    },
    { id: 2, link: "/thu-vien", name: "Thư viện", linkName: "thu-vien" },
    { id: 3, link: "/bai-tap", name: "Bài tập", linkName: "bai-tap" },
  ];

const IsActive = (path: string) => {
  const pathnames = usePathname().split("/");
  for (let i = 0; i < pathnames.length; ++i) {
    if (pathnames[i] === path) return true;
  }
  return false;
};

export default function NavbarAuth({ imageLink }: { imageLink: string }) {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Home className="h-6 w-6 mx-6" />
          </Link>
          {navItems.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className={`flex items-center gap-2 text-lg font-semibold md:text-base min-w-[30%] z-10 ${
                  IsActive(item.linkName)
                    ? "hover:text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Home className="h-6 w-6" />
              </Link>
              {navItems.map((item) => {
                return (
                  <Link
                    href={item.link}
                    key={item.id}
                    className={`flex items-center gap-2 text-lg font-semibold md:text-base ${
                      IsActive(item.linkName)
                        ? "hover:text-foreground border-b-2 border-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Separator />
              {IsActive("thu-vien") &&
                subjects.map((item) => {
                  return (
                    <Link
                      href={item.link}
                      key={item.id}
                      className={`flex items-center gap-2 text-lg font-semibold md:text-base ${
                        IsActive(item.linkName)
                          ? "hover:text-foreground border-b-2 border-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
              {/* <Input
                type="search"
                placeholder="Tìm kiếm"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              /> */}
            </div>
          </form>
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={imageLink} />
                  <AvatarFallback>
                    <CircleUser className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <Link href="/api/auth/signout">
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
