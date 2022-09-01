import {Routes, Route} from "react-router-dom"
import Home from '../pages/Home';
import WriteTodo from '../pages/WriteTodo';
import DetailTodo from '../pages/DetailTodo';



const Router = () => {
    return (
        <Routes>
            <Route path ="/" exact element={<Home/>}/>
            <Route path ="/writetodo" exact element={<WriteTodo/>}/>
            <Route path ="/detailtodo/:id" exact element={<DetailTodo/>}/>
            <Route path ="*" element={<div>잘못된 페이지입니다.</div>}/>
        </Routes>
    )
}

export default Router;