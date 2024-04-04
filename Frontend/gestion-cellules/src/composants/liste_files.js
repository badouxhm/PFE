import React from 'react';

const liste_file = ({ files }) => {
  
  return (
    <div className="flex items-center justify-center relative rounded-md">
  <div className="container mx-auto flex-col">
    <div className="flex">
      <table className=" items-center justify-center flex-col w-3/5  border-collapse m-10 mx-auto rounded-lg shadow-md overflow-hidden">
        <thead className="bg-red-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase">Nom du fichier</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase">Date d'ajout</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase">Date de modification</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {
          files ? (
            files.map((file, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-center">{file.nom}</td>
                <td className="px-6 py-4 text-center">{file.date_ajout}</td>
                <td className="px-6 py-4 text-center">{file.date_modification}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-3 text-center">Pas de fichiers</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default liste_file;
