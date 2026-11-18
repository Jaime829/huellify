export default function HistoryInfoCard({ icon: Icon, value, description }) {
    return (
        <div className="flex flex-col gap-1 flex-1 p-4 bg-green-300/20 rounded-lg">
            <Icon size={30} color={"#00A63E"} />
            <p className="font-bold text-[24px]">{value}</p>
            <p className="text-[14px] text-gray-600 font-medium">
                {description}
            </p>
        </div>
    );
}
