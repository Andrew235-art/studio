import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/logo.png"
                alt="Stamerck Enterprise Logo"
                width={384}
                height={96}
                className="h-auto w-full"
                priority
            />
        </div>
    );
}
