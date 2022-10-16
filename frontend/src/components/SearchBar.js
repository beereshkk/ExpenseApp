import React from 'react'

const SearchBar=(props)=>{
    const {updateSearchText}=props
    const handleChange=(e)=>{
        updateSearchText(e.target.value)
    }

    
    return (
        <div style={{width:'300px'}}>
            <input type='text' className='form-control' placeholder='Search by item name or category' onChange={handleChange} />
        </div>
    )
}

export default SearchBar