
export default function Header() {
    return (
        <header
            className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50 animate-slide-up shadow-sm"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-primary">AI Hub</h1>
                        <p className="text-sm text-muted-foreground font-sans">Discover the perfect AI tools for your needs</p>
                    </div>
                </div>
            </div>
        </header>
    )
}