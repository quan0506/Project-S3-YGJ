import { useState, useEffect } from 'react';
import "./paging.css"
import { Pagination } from 'antd';

const Paging = (props) => {
    const [pageSize, setPageSize] = useState(props.pageSize || 10);
    const [pageCount, setPageCount] = useState(props.pageCount || 1);

    const handlePageClick = (page, pageSize) => {
        props.changePage(page);
        setPageSize(pageSize);
        setPageCount(props.pageCount);
    };

    useEffect(() => {
        setPageSize(props.pageSize);
        setPageCount(props.pageCount);
    }, [props.pageSize, props.pageCount]);

    return (
      <Pagination
        current={props.pageIndex}
        pageSize={pageSize}
        total={pageCount * pageSize}
        onChange={handlePageClick}
      />
    );
};

export default Paging;

