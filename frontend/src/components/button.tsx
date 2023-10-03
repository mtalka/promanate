type ButtonProps = {
    type: "button" | "submit" | "reset" | undefined
    onClick?: () => void
    children: React.ReactNode
};

export default function Button({ type, children, onClick }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="border py-1 px-2 rounded"
        >
            {children}
        </button>
    );
}