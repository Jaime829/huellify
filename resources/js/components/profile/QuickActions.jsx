import { Zap } from "lucide-react";

import UpdateQuickAction from "./UpdateQuickAction";
import DeleteQuickAction from "./DeleteQuickAction";

export default function QuickActions() {
    return (
        <div className="col-span-1 lg:col-span-2 lg:col-start-4 lg:row-start-2 rounded-md flex flex-col gap-4 bg-white shadow p-4">
            <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center text-emerald-800">
                    <Zap />
                </div>
                <p className="font-bold">Accesos rápidos</p>
            </div>
            <div className="flex flex-col gap-2 text-gray-500">
                {/* <UpdateQuickAction /> */}
                <DeleteQuickAction />
            </div>
        </div>
    );
}
