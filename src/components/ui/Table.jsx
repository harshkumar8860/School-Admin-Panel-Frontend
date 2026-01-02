import React from 'react'

const Table = ({ columns, data, actions }) => {
    return (
        <div className='overflow-x-auto bg-white rounded shadow'>
            <table className='min-w-full text-sm'>

                <thead className='bg-gray-100 text-left'>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className='px-4 py-3 font-medium'>
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className='px-4 py-3'>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1}
                                className='text-center py-6'>
                                No data found
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={idx} className='border-t'>
                                {columns.map((col) => (
                                    <td key={col.key} className='px-4 py-3'>
                                        {row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className='px-4 py-3 flex gap-2'>
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;