export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <div className="flex h-screen flex-col">
            <div className="flex-grow p-6 md:overflow-y-auto md:p-8">
                <div className="mb-8 flex justify-end">
                    <div className="text-sm text-slate-400">Dashboard</div>
                </div>
                {children}
            </div>
        </div>
    );
}