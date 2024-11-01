import { useEffect, useState } from "react"
import { getAllTag } from "../../../services/tagService"
import { Button, Pagination, Tag } from "antd"
import { Link } from "react-router-dom";
function SkillList() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllTag();
            setTags(result);
        }
        fetchApi();
    }, [])

    console.log(tags);

    return (
        <>
            {tags.length > 0 && (
                tags.map((item) => (
                    <>
                        <Link to={`/search?keyword=${item.value || ""}`} key={item.key}>
                            <Tag color="blue">
                                {item.value}
                            </Tag>
                        </Link>
                    </>
                ))
            )}
        </>
    )
}
export default SkillList;