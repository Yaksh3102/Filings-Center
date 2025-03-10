"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDetails } from "@/contexts/DetailsContext";

export default function Dashboard() {
    const router = useRouter();

    const { userDetails } = useDetails;

    useEffect(() => {
        router.replace("/dashboard/profile");
    }, []);

    useEffect(() => {
        if (userDetails) {
            router.push("/");
        }
    }, [userDetails, router]);

    return null;
}
