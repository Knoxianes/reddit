'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ className, title }: { className: string, title: string }) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending} className={className}>
            {title}
        </button>
    )
}
