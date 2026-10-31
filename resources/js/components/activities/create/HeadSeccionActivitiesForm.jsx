import EnumeracionSeccion from "./EnumeracionSeccion";

export default function HeadSeccionActivitiesForm({
    number,
    title,
    description = null,
}) {
    return (
        <div className="flex items-center gap-4">
            <EnumeracionSeccion number={number} />
            <div>
                <p className="text-green-800 font-semibold leading-4">
                    {title}
                </p>
                {description && (
                    <small className="text-gray-400 text-[14px]">
                        {description}
                    </small>
                )}
            </div>
        </div>
    );
}
