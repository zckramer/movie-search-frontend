import { useState } from 'react';

const Sidebar = (props) => {
    const [titleList, setTitleList] = useState(props.searchData.map(title=>title));
    
    // console.log(titleList)
    return (
        <div className={"Sidebar"}>
            {titleList.map((title, index)=><p key={"sidebarSearchItem" + index} movieid={title.id}>{title.title}</p>)}
        </div>
    )
}

export default Sidebar;