import AccountStats from "./AccountStats";
import PersonalInformation from "./PersonalInformation";
import QuickActions from "./QuickActions";
import UserResumen from "./UserResumen";
import YourImpact from "./YourImpact";
import UserQuote from "./UserQuote";
import ToastMessage from "../ToastMessage";

export default function ProfileContent() {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-5 max-h-full items-start gap-6 pb-6 px-6 pt-6 md:p-6 ">
            <ToastMessage />
            <UserResumen />
            <YourImpact />
            <PersonalInformation />
            <QuickActions />
            <AccountStats />
            <UserQuote />
        </div>
    );
}
