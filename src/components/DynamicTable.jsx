import React from "react";
import styles from "./DynamicTable.module.css"; // Import the CSS module
import { titleCase } from "../../utils/titleCase";

const DynamicTable = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <p className={styles.noData}>No data available to display.</p>;
  }

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.map(formatValue).join(", ");
    } else if (typeof value === "object" && value !== null) {
      // Handling the address object
      return Object.values(value).join(", ");
    } else {
      return value.toString();
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className="table-secondary">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>
                {titleCase(key.charAt(0).toUpperCase() + key.slice(1))}
              </th>
            ))}
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx} data-label={Object.keys(data[0])[idx]}>
                  {formatValue(value)}
                </td>
              ))}
              <td className={styles.actionColumn}>
                <button onClick={() => onEdit(item)}>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

//
//

// import React from "react";
// import "./DynamicTable.module.css"; // Assuming the CSS file is named DynamicTable.css

// const DynamicTable = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <p>No data available to display.</p>;
//   }

//   const formatValue = (value) => {
//     if (Array.isArray(value)) {
//       return value.map(formatValue).join(", ");
//     } else if (typeof value === "object" && value !== null) {
//       // Handling the address object
//       return Object.values(value).join(", ");
//     } else {
//       return value.toString();
//     }
//   };

//   return (
//     <div>
//       <table>
//         <thead className="table-secondary">
//           <tr>
//             {Object.keys(data[0]).map((key) => (
//               <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
//             ))}
//             <th>Act</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               {Object.values(item).map((value, idx) => (
//                 <td key={idx}>{formatValue(value)}</td>
//               ))}
//               <td className="action-column">
//                 <i className="fa-solid fa-ellipsis"></i>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DynamicTable;
