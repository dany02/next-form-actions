import FixedBottomMenu from "@/components/fixed-botton-menu";
import Header from "@/components/header";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-screen-sm mx-auto min-h-screen pt-5 pb-[72px]">
            <Header />
            {children}
            <FixedBottomMenu />
        </div>
    );
}
