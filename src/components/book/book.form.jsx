import { Button } from "antd";
import { useState } from "react";
import './book.css';
import CreateBookModal from "./create.book.modal";

const BookForm = (props) => {
    const { loadBook } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="book-form">
            <div className="book-table-header">
                <h2>Book Table</h2>
                <Button size="large"
                    type="primary"
                    onClick={() => { setIsModalOpen(true) }}>
                    Create New Book
                </Button>
            </div>

            <CreateBookModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook}
            />
        </div>
    )
}

export default BookForm;