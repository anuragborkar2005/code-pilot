"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSession = async () => {
    const h = await headers();

    return auth.api.getSession({
        headers: Object.fromEntries(h.entries()),
    });
};

export const requireAuth = async () => {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }
};

export const requireUnAuth = async () => {
    const session = await getSession();

    if (session) {
        redirect("/");
    }
};
