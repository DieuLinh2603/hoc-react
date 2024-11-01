import {useSearchParams} from "react-router-dom"
import {Tag} from "antd"
import { useEffect, useState } from "react";
import { getAllJob } from "../../services/jobService";
import SearchList from "./SearchList";
function Search()
{
    //Trả về các cặp key-value trên URL (với path của routes chỉ có mỗi tên trang chính k có /:)
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState();
    // console.log(searchParams);

    //sử dụng get để lấy ra giá trị của key đc truyền vào (trên URL)
    const citySearch = searchParams.get("city") || "";
    // console.log(citySearch);
    const keywordSearch = searchParams.get("keyword") || "";
    // console.log(keywordSearch);
    
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllJob();
            if(result)
            {
                //filter để lọc qua từng item thỏa mãn đk nào đó
                //và trả về 1 kết quả
                const newData = result.filter((item) => {
                    //includes là 1 hàm js để check xem trong mảng đó có chứa từ khóa truyền vào k(citySearch) => Nếu có trả về true
                    const city = citySearch ? (item.city?.includes(citySearch)) : true;
                    const keyword = keywordSearch ? (item.tags?.includes(keywordSearch)) : true;
                    const status = item.status;
                    
                    //cả 3 true thì mới trả về data
                    return city && keyword && status;
                })
                setData(newData.reverse());
            }
        }
        fetchApi();
    },[])

    
    
    return(
        <>
            <strong>Kết quả cần tìm</strong>
            {citySearch && <Tag>{citySearch}</Tag>}
            {keywordSearch && <Tag>{keywordSearch}</Tag>}
            {data && 
            (<SearchList dulieu={data}/>)}

        </>
    )
}

export default Search;