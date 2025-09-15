import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative h-12 w-48", className)}>
            <Image
                src="/logo.png"
                alt="Stamerck Enterprise Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}
