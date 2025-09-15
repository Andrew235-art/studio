import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <Image
            src="/logo.png"
            alt="Stamerck Enterprise Logo"
            width={40}
            height={40}
            className={cn("h-10 w-10", className)}
        />
    );
}
