import PopupUserActions from "./PopupUserActions";
import UserInfo from "./UserInfo";

export default function UserNavSection() {
    return (
        <>
            <div className="flex gap-1 items-center">
                <PopupUserActions />
            </div>
        </>
    );
}
