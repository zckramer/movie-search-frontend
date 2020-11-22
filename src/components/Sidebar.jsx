import { useState } from 'react';

const Sidebar = (props) => {
    const [titleList, setTitleList] = useState(props.searchData.map(title=>title));
    
    // console.log(titleList)
    return (
        <div className={"Sidebar"}>
            possible matches:
            {titleList.map((title, index)=><div key={"sidebarSearchItem" + index} movieid={title.id}>{title.title}</div>)}
        </div>
    )
}

export default Sidebar;