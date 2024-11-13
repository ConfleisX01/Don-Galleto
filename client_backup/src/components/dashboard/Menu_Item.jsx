export default function MenuItem({ icon, navigation, label }) {
    return (
        <li>
            <a
                href={navigation}
                className="group relative flex justify-center rounded px-2 py-4 text-gray-500 hover:bg-blue-100 hover:text-blue-700"
            >
                {
                    icon
                }
                <span
                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                    {label}
                </span>
            </a>
        </li>
    )
}