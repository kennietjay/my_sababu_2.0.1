import React from "react";
import styles from "./Table.module.css"; // Import the CSS module

const Table = ({ columns, data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <td key={colIndex} data-label={column.header}>
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
