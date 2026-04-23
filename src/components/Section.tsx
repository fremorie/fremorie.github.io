type Props = {
    title: string;
}

export default function Section({title}: Props) {
    return (
        <section className="section">
            <h1>{title}</h1>
        </section>
    )
}