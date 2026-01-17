"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BookOpen, Github, LogOut, Moon, Settings, Sun } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { Logout } from "@/modules/auth/components/logout";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const NAV_ITEMS = [
    { title: "Dashboard", url: "/dashboard", icon: BookOpen },
    { title: "Repository", url: "/dashboard/repository", icon: Github },
    { title: "Reviews", url: "/dashboard/reviews", icon: BookOpen },
    { title: "Subscription", url: "/dashboard/subscription", icon: BookOpen },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

function UserInfo({
    name,
    email,
    image,
}: {
    name: string;
    email: string;
    image?: string | null;
}) {
    const initials = useMemo(
        () =>
            name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
        [name],
    );

    return (
        <>
            <Avatar>
                <AvatarImage src={image || "/placeholder.svg"} alt={name} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 min-w-0 text-left text-sm">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                    {email}
                </span>
            </div>
        </>
    );
}

export function AppSidebar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const { data: session } = useSession();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted || !session) return null;

    const user = session.user;
    const isActive = (url: string) =>
        pathname === url || pathname.startsWith(`${url}/`);

    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <div className="px-4 py-6">
                    <div className="flex items-center gap-4 rounded-lg bg-sidebar-accent/50 px-3 py-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Github className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide">
                                Connected Account
                            </p>
                            <p className="text-sm font-medium">@{user.name}</p>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/60">
                    Menu
                </p>

                <SidebarMenu className="gap-2">
                    {NAV_ITEMS.map(({ title, url, icon: Icon }) => (
                        <SidebarMenuItem key={title}>
                            <SidebarMenuButton
                                asChild
                                className={`h-11 rounded-lg px-4 transition ${
                                    isActive(url)
                                        ? "bg-sidebar-accent font-semibold"
                                        : "hover:bg-sidebar-accent/60"
                                }`}
                            >
                                <Link
                                    href={url}
                                    className="flex items-center gap-3"
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-sm">{title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t px-3 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="h-12 px-4 rounded-lg gap-3
                                    hover:bg-sidebar-accent transition-colors"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={
                                                user.image || "/placeholder.svg"
                                            }
                                            alt={user.name ?? "User"}
                                        />
                                        <AvatarFallback>
                                            {user.name?.[0]?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 min-w-0 text-left">
                                        <span className="truncate text-sm font-semibold">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs text-sidebar-foreground/60">
                                            {user.email}
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                side="right"
                                sideOffset={8}
                                className="w-56"
                            >
                                {/* Profile */}
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center gap-3"
                                    >
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage
                                                src={
                                                    user.image ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {user.name?.[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 min-w-0 text-left">
                                            <span className="truncate text-sm font-semibold">
                                                {user.name}
                                            </span>
                                            <span className="truncate text-xs text-sidebar-foreground/60">
                                                {user.email}
                                            </span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>

                                {/* Theme Toggle */}
                                <DropdownMenuItem
                                    onClick={() =>
                                        setTheme(
                                            resolvedTheme === "dark"
                                                ? "light"
                                                : "dark",
                                        )
                                    }
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    {resolvedTheme === "dark" ? (
                                        <Sun className="h-4 w-4" />
                                    ) : (
                                        <Moon className="h-4 w-4" />
                                    )}
                                    <span>
                                        {resolvedTheme === "dark"
                                            ? "Light Mode"
                                            : "Dark Mode"}
                                    </span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="text-red-600 cursor-pointer">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    <Logout>Sign Out</Logout>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
