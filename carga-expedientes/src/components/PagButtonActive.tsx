interface PagButtonActiveProps {
    children?: React.ReactNode;
}

export default function PagButtonActive({ children }: PagButtonActiveProps) {

    return (
        <button className="text-black font-bold bg-white pl-2 pr-2 rounded-4xl">
            {children}
        </button>
    );
}