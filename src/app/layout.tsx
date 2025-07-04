import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'Graphing and Analysis Tool for Complex Functions',
    description: 'Graphing and Analysis Tool for Complex Functions',
    keywords: ['Graphing Calculator', 'Complex Functions', '4D', 'Naman Arora'],
    authors: [
        {
            name: 'Naman Arora',
            url: 'https://namanarora.xyz'
        }
    ]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
