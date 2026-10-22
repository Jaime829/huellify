import EnumeracionSeccion from "./EnumeracionSeccion";

export default function HeadSeccionActivitiesForm({
    number,
    title,
    description,
}) {
    return (
        <div className="flex gap-4">
            <EnumeracionSeccion number={number} />
            <div>
                <p className="text-green-800 font-semibold leading-4">
                    {title}
                </p>
                <small className="text-gray-400 text-[14px]">
                    {description}
                </small>
            </div>
        </div>
    );
}
