import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/stamerck-logo-new.png"
                alt="Stamerck Enterprise Logo - Safety Rides on Angels Wings"
                width={384}
                height={154}
                className="h-auto w-full drop-shadow-md filter"
                priority
            />
        </div>
    );
}
