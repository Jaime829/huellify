import AccountStats from "./AccountStats";
import PersonalInformation from "./PersonalInformation";
import QuickActions from "./QuickActions";
import UserResumen from "./UserResumen";
import YourImpact from "./YourImpact";
import UserQuote from "./UserQuote";

export default function ProfileContent() {
    return (
        <div className="grid grid-cols-3 max-h-full md:grid-cols-5 items-start gap-6 pb-24 px-4 pt-4 md:p-4 ">
            <UserResumen />
            <YourImpact />
            <PersonalInformation />
            <QuickActions />
            <AccountStats />
            <UserQuote />
        </div>
    );
}
