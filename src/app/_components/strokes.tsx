export const Circle = ({
   className,
}: {
    className?: string;
}) => (
    <svg
        viewBox="0 0 244 52"
        fill="none"
        className={className}
        aria-hidden="true"
    >
        <path
            className="stroke-(--accent)"
            d="M117.31 3.8C51.6512 4.2 1 4.92139 1 33.7483C1 49.5614 27.3792 51.9417 49.1706 50.7288C70.9621 49.5159 191.389 50.7288 197.123 50.7288C213.18 50.7288 243 43.4514 243 28.8967C243 1 120.342 4.57143 98.5504 4.57143"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </svg>
);

export const Underline = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 309 6" fill="none" className={className} aria-hidden="true">
        <path
            className="stroke-(--accent)"
            d="M0.141418 3.97803C7.14142 2.97803 280.641 6.97803 308.641 0.978027"
            strokeWidth="2"
        />
    </svg>
);