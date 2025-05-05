export const ZapCell = ({
    name,
    index,
    onClick,
    isActive = false,
    className = ""
}: {
    name?: string;
    index: number;
    onClick: () => void;
    isActive?: boolean;
    className?: string;
}) => {
    return (
        <div 
            onClick={onClick} 
            className={`
                border-2 rounded-lg p-4 w-full
                flex justify-between items-center 
                cursor-pointer transition-all
                ${isActive ? 
                    "border-amber-400 bg-amber-50 hover:bg-amber-100" : 
                    "border-gray-200 bg-white hover:bg-gray-50"
                }
                ${className}
            `}
        >
            <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${isActive ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-500"}`}>
                    {index}
                </div>
                <span className={`font-medium ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                    {name || (index === 1 ? "Select Trigger" : "Select Action")}
                </span>
            </div>
            {isActive ? (
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </div>
    );
};