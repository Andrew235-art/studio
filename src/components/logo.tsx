import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/stamerck-logo-clear.png"
                alt="Stamerck Enterprise Logo - Safety Rides on Angels Wings"
                width={300}
                height={60}
                className="h-auto w-full drop-shadow-md filter object-cover"
                style={{ objectPosition: "center 45%" }}
                priority
            />
        </div>
    );
}
