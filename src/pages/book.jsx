import { useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { fetchAllBooksAPI } from "../services/api.service";


const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { loadBook(); }, [current]);

    const loadBook = async () => {
        setIsLoading(true);

        const response = await fetchAllBooksAPI(current, pageSize);

        if (response.data) {
            setDataBooks(response.data.result);
            setTotal(response.data.meta.total)
        }

        setIsLoading(false);
    }

    return (
        <div>
            <div>
                <BookForm loadBook={loadBook} />
                <BookTable
                    dataBooks={dataBooks}
                    loadBook={loadBook}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </div>
        </div>
    );
}

export default BookPage;