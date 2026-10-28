export default function IconItemsDashboard({ icon: Icon, colorIcon, bg }) {
    return (
        <div
            className={`${colorIcon} ${bg} w-10 h-10 rounded-full flex items-center justify-center aspect-square shrink-0`}
        >
            <Icon size={20} />
        </div>
    );
}
