"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import css from "./page.module.css";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const fallBackTimer = setTimeout(() => router.back(), 4000);
    return () => clearTimeout(fallBackTimer);
  }, [router]);

  return (
    <div className="center">
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}