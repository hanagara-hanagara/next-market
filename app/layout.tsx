import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
