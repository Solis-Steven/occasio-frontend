import { Task } from "./Task";

export function Tasks() {
    return(
        <section className="bg-white rounded-lg shadow-lg p-6
        mt-6 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
        </section>
    );
}