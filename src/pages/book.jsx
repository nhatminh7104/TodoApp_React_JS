import { useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { fetchAllBooksAPI } from "../services/api.service";


const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [total, setTotal] = useState(0);

    useEffect(() => { loadBook(); }, [current]);

    const loadBook = async () => {
        const response = await fetchAllBooksAPI(current, pageSize);
        if (response.data) {
            setDataBooks(response.data.result);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
            setTotal(response.data.meta.total)
        }
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
                />
            </div>
        </div>
    );
}

export default BookPage;