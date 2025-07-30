import React, { useState } from 'react';
import { notification, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DetailBookDrawer from './detail.book.drawer';
import UpdateBookModal from './update.book.modal';
import { deleteBookAPI } from '../../services/api.service';

const BookTable = (props) => {
    const {
        dataBooks, loadBook,
        current, setCurrent,
        pageSize, setPageSize,
        isLoading, setIsLoading,
        total
    } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const onChange = async (pagination) => {
        if (pagination && pagination.current)
            if (+pagination.current !== +current)
                setCurrent(+pagination.current);
    };

    const handleDeleteBtn = async (id) => {
        const response = await deleteBookAPI(id);

        if (response.data) {
            await loadBook();

            notification.success({
                message: "Delete User",
                description: "Delete User Successfully!"
            })
        } else {
            notification.error({
                message: "Delete User",
                description: JSON.stringify(response.message)
            })
        }
    }

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => {
                return (
                    index + 1 + ((current - 1) * pageSize)
                )
            },
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        setIsDetailOpen(true);
                        setDataDetail(record)
                    }}>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => {
                const formattedPrice = new Intl.NumberFormat('vi-VN', {
                    style: "currency",
                    currency: "VND",
                }).format(record.price);

                return (
                    <p>{formattedPrice}</p>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => {
                const formattedQuantity = new Intl.NumberFormat('us-EN').format(record.quantity);

                return (
                    <p>{formattedQuantity}</p>
                )
            }
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            width: 220,
            render: (_, record) => (
                <>
                    <button className='edit-btn'
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}>

                        <EditOutlined /> Edit
                    </button>

                    <Popconfirm
                        className='delete-btn'
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleDeleteBtn(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'>

                        <DeleteOutlined /> Delete
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className='book-table'>
            <Table
                columns={columns} dataSource={dataBooks} rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: false,
                        total: total,
                    }
                }
                onChange={onChange}
                loading={isLoading}
            />

            <DetailBookDrawer
                loadBook={loadBook}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail} />

            <UpdateBookModal
                loadBook={loadBook}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )
}

export default BookTable;