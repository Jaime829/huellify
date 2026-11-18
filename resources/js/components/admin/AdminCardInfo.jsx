export default function AdminCardInfo({
    icon: Icon,
    title = null,
    mainText,
    description,
}) {
    return (
        <div className="bg-white flex-1 min-w-0 shadow p-4 flex gap-2 border rounded-lg">
            <div className="h-16 w-16 rounded-full p-1 flex items-center justify-center bg-green-500/20 text-emerald-800 aspect-square">
                <Icon size={35} />
            </div>
            <div className="flex flex-col justify-between min-w-0 break-words">
                {title && <p className="text-[14px] font-semibold">{title}</p>}
                <p className="text-[28px] font-bold">{mainText}</p>
                <small className="text-gray-500 font-medium text-[12px]">
                    {description}
                </small>
            </div>
        </div>
    );
}
