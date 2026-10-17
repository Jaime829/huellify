import UserResumen from "./UserResumen";

export default function ProfileContent() {
    return (
        <div className="grid grid-cols-3 max-h-full md:grid-cols-5 items-start gap-6 p-4">
            <UserResumen />
        </div>
    );
}
