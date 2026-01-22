"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
    try {
        const h = await headers();
        return await auth.api.getSession({
            headers: Object.fromEntries(h.entries()),
        });
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
};
