import './StatusPill.css';

type StatusPillProps = {
    place: string;
    note: string;
};

export function StatusPill({ place, note }: StatusPillProps) {
    return (
        <p className="status-pill">
            <span className="status-pill__dot" aria-hidden="true" />
            <span className="status-pill__lines">
                <span className="status-pill__place">{place}</span>
                <span className="status-pill__note">{note}</span>
            </span>
        </p>
    );
}
