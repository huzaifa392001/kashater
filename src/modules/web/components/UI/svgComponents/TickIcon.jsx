const TickIcon = ({ colour = 'var(--status-green)', width = "18px" }) => (
    <svg width={width} height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
                d="M12,3 C7.05,3 3,7.05 3,12 C3,16.95 7.05,21 12,21 C16.95,21 21,16.95 21,12 C21,7.05 16.95,3 12,3 L12,3 Z M10.2,16.5 L5.7,12 L6.96,10.74 L10.2,13.98 L17.04,7.14 L18.3,8.4 L10.2,16.5 L10.2,16.5 Z"
                fill={colour}
                fillRule="nonzero"
            />
        </g>
    </svg>
)
export default TickIcon