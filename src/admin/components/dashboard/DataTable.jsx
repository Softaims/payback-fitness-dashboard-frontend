import PropTypes from "prop-types";

/**
 * DataTable Component
 * Reusable table for displaying data with custom columns
 *
 * @param {Array} columns - Column definitions: [{key: string, label: string, render?: function}]
 * @param {Array} data - Array of data objects
 * @param {React.Component} emptyState - Component to show when no data
 * @param {string} emptyMessage - Message to show when no data (if no emptyState)
 * @param {boolean} loading - Loading state
 * @param {function} onRowClick - Callback when row is clicked
 * @param {string} className - Additional CSS classes
 */
const DataTable = ({
  columns = [],
  data = [],
  emptyState,
  emptyMessage = "No data available",
  loading = false,
  onRowClick,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4BEEA2]/20 border-t-[#4BEEA2] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#FFFFFF]/50 text-sm">Loading data...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    if (emptyState) {
      return emptyState;
    }

    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[#FFFFFF]/50">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#FFFFFF]/10">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left text-[#FFFFFF]/50 text-sm font-medium pb-3 px-2 first:pl-0 last:pr-0 ${
                  column.headerClassName || ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                border-b border-[#FFFFFF]/5 last:border-0
                transition-colors duration-150
                ${onRowClick ? "cursor-pointer hover:bg-[#FFFFFF]/5" : ""}
              `}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`py-4 px-2 first:pl-0 last:pr-0 ${
                    column.cellClassName || ""
                  }`}
                >
                  {/* If custom render function provided, use it */}
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      headerClassName: PropTypes.string,
      cellClassName: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  emptyState: PropTypes.node,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
};

export default DataTable;
