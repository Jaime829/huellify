import { IconLeafFilled } from "@tabler/icons-react";

export default function QuoteNav() {
    return (
        <>
            <div className="bg-emerald-100/20 flex flex-col items-center py-2 rounded-md">
                <div className="w-20 h-20">
                    <img
                        className="object-contain"
                        src="/images/assets/asset-plant.webp"
                        alt="Asset Plant"
                    />
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                    <p className="font-semibold text-center text-emerald-900 text-md">
                        Pequeñas acciones,
                        <br />
                        grandes cambios
                    </p>
                    <small className="text-center block text-gray-500">
                        Tu huella importa
                    </small>
                    <IconLeafFilled className="text-emerald-800" />
                </div>
            </div>
        </>
    );
}
