const localData = {
    getUser:() : User | null => {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    },
    setUser:(user: User | null) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    },
    getPageSize: () => {
        const data = localStorage.getItem("pageSize");
        return data ? Number(data) : 10; // Default page size is 10
    },
    setPageSize: (size: number) => {
        localStorage.setItem("pageSize", String(size));
    }
}

export default localData;