// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react'

// const Pagination=(props)=>{
//     const pageNumbers=[]
//     const {expensesPerPage,totalExpenses,paginate}=props
//     for(let i=1;i<=Math.ceil(totalExpenses/expensesPerPage);i++){
//         pageNumbers.push(i)
//     }
//     return(
//         <nav>
//             <ul className='pagination'>
//                 {pageNumbers.map((number)=>{
//                     return <li key={number} className='page-item'>
//                         <a href='#' onClick={()=>{
//                             console.log('clicked page',number)
//                              paginate(number) }} className='page-link'>
//                             {number}
//                         </a>
//                     </li>
//                 })}
//             </ul>
//         </nav>
//     )
// }

// export default Pagination
