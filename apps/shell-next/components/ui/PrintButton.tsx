'use client';

import { FaPrint } from 'react-icons/fa';

interface PrintButtonProps {
    label: string;
}

export default function PrintButton({ label }: PrintButtonProps) {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 print:hidden"
        >
            <FaPrint />
            <span>{label}</span>
        </button>
    );
}
