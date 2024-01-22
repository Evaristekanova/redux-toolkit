export const getTodos = async () => {
    try {
        const res = await fetch('/api/todo');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error; // Rethrow the error to propagate it
    }
}
