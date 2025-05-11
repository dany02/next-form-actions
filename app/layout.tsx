import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	subsets: ["latin"],
	style: ["normal"],
	weight: ["300","400","500","600"],
});

const notoSansKR = Noto_Sans_KR({
	variable: "--font-noto-sans-kr",
	subsets: ["latin"],
	style: ["normal"],
	weight: ["300","400","500","600"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | Tweet Jungle",
        default: "Tweet Jungle",
    },
    description: "Explore the chaos, fun, and trends of the tweet jungle!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${notoSans.variable} ${notoSansKR.variable}`}>
            
                <body
                    className={`${notoSans.variable} ${notoSansKR.variable} max-w-screen-sm mx-auto min-h-screen bg-white text-black dark:bg-[#1d232a] dark:text-black`}
                >
					<ThemeProvider attribute="data-theme">
						{children}
					</ThemeProvider>
                </body>
            
        </html>
    );
}
