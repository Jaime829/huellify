import { IconLeafFilled } from "@tabler/icons-react";

export default function ExploreHabitsHeader() {
    return (
        <div className="relative h-52 w-full flex items-center p-4">
            <img
                className="absolute inset-0 w-full h-full object-cover z-1"
                src="/images/assets/explore-habit-bg.jpeg"
                alt=""
            />
            <div className="absolute z-10 flex gap-2">
                <div className="bg-green-500/15 w-20 h-20  aspect-square rounded-full flex justify-center items-center">
                    <img
                        className="w-[70%] h-[70%]"
                        src="/images/assets/leaf-asset.png"
                        alt="Leaf Asset"
                    />
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <h1 className="text-4xl font-semibold text-emerald-900">
                        Explorar hábitos
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Descubre y adopta hábitos sostenibles para reducir tu
                        huella de carbono.
                    </p>
                </div>
            </div>
        </div>
    );
}
