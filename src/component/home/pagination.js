import React, {useEffect, useRef, useState} from 'react';
import useLoadMoreOnScroll from 'reactjs-hooks-pagination';
import sampleData from "../../constants/sampleData";

const Paginate = props => {

  const { page, productCount, changePageTo, type } = props;

  const fetchSize = 20;
  const limit = 1000;
  const ulElement = useRef();
  const [data, setData] = useState([]);
  const {
    start,
    end,
    isFetching,
    doneFetching,
    setIsFetching,
  } = useState();

  useEffect(() => {
    if (start !== end) fetchHandler(start, end);
  }, [start, end]);

  /**
   *
   * @param {Number} start : Index to start fetching from or commonaly called 'Offset'
   * @param {Number} end : Last index
   */
  const fetchHandler = (start, end) => {
    setIsFetching(true);
    setTimeout(() => {
      setData([...data, ...sampleData.customerdata.slice(start, end)]);
      
      setIsFetching(false);
    }, 2000);
  };


  const total = Math.ceil(sampleData.customerdata.length / 5);
    function* range(start, end) {
     for (let i = start; i <= end; i++) {
       yield i;
     }
   }
 
   const pageArray = sampleData.customerdata < 3 ? [...range(1, total > 3 ? 3 : total)]
   : [1, '...', ...range(sampleData.customerdata - 2, sampleData.customerdata +2 ? total : sampleData.customerdata + 2)];
 
   const pageList = pageArray.map((num) => (
       <li
       onClick={num === '...' ? () => changePageTo(sampleData.customerdata - 5) : () => changePageTo(num)}
       ></li>
   ))

  return (
    <div className="list" ref={ulElement} style={{ height: "400px", overflow: "auto" }}>
        {sampleData.customerdata > 1 ? (
        <div
          onClick={() => {changePageTo(sampleData.customerdata > 1 ? sampleData.customerdata - 1 : 1)}}
        >
        {`<<`}
          {/* Previous */}
        </div>
      ) : null}

<ul>
        {pageList}
      </ul>
      {sampleData.customerdata < total ? (
        <div
          onClick={() => {changePageTo(sampleData.customerdata < total ? sampleData.customerdata + 1 : total)}}
        >
        {`>>`}
          {/* Next */}
        </div>
      ) : null}
      </div>
  );
};

export default Paginate;