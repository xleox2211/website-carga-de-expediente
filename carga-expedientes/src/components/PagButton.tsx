interface PagButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function PagButton({ children, onClick }: PagButtonProps) {
    return (
        <button className="hover:bg-blue-500 hover:rounded-4xl transition-all transition-discrete" onClick={onClick}>
            {children}
        </button>
    )
}