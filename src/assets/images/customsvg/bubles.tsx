
const Bubles = ({ className }: { className?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 24 24" fill="currentColor"
            className={`icon icon-tabler icons-tabler-filled icon-tabler-message ${className}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
        </svg>
    )
}

export default Bubles