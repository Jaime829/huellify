import HeadSeccionActivitiesForm from "./HeadSeccionActivitiesForm";

export default function FormularioEnergia() {
    return (
        <form className="py-4" action="" method="post">
            <HeadSeccionActivitiesForm
                number={2}
                title={"Detalles de la actividad"}
                description={
                    "Ingresa la información especifica según el tipo de actividad."
                }
            />
        </form>
    );
}
