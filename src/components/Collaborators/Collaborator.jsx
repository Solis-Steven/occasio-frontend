
export function Collaborator() {
    return(
        <article className="flex justify-between border-b mb-4
        p-4">
            <div className="">
                <p>Steven Solis</p>
                <p className="text-sm text-gray-500">stevenso@gmial.com</p>
            </div>

            <button
                type="button"
                className="bg-red-600 px-4 py-3 text-white uppercase
                font-bold text-sm rounded-lg hover:bg-red-700"
            >
                Eliminar
            </button>
        </article>
    );
}