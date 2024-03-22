import React from 'react'

const BarreRecherche = ({value , setValue}) => {
    const handleChange = e =>{
        setValue(e.target.value)
    }
    
    return (
            <div className="flex justify-center items-center h-full w-full mx-16">
                <input
                type="text"
                placeholder="Rechercher..."
                className="p-2 border border-gray-500 rounded-lg w-3/5"
                onChange={handleChange}
                value={value}
                />
            </div>
      );
    };

export default BarreRecherche
